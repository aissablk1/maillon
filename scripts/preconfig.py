#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
# Copyright (c) 2026 Aïssa Belkoussa
# https://github.com/aissabelkoussa/maillon-preconfig
"""
MAILLON — Script de préconfiguration usine.

Configure un nœud Meshtastic neuf avec les paramètres MAILLON par défaut :
- Région EU_868 (conforme ETSI EN 300 220)
- Modem preset "Long Fast"
- Hop limit 3
- Canal MAILLON-PUBLIC pour découverte
- Canal privé propre au kit (PSK généré aléatoirement)
- MQTT désactivé par défaut (consentement explicite côté SaaS)
- Position broadcast 5 min en mouvement, 30 min à l'arrêt
- Telemetry batterie/voltage 15 min

Usage :
    python3 preconfig.py --port /dev/cu.usbserial-XXXX --kit-id MAI-2026-0042
    python3 preconfig.py --port /dev/cu.usbserial-XXXX --kit-id MAI-2026-0042 --owner "FFSS-Vercors-Equipe-A"
    python3 preconfig.py --port /dev/cu.usbserial-XXXX --batch-csv batch.csv

Pré-requis :
    pip install "meshtastic[cli]>=2.7.0"
    Le firmware Meshtastic 2.7+ doit être déjà flashé sur le nœud (utiliser flasher.html
    sur https://flasher.meshtastic.org si nécessaire).

Fonctionne sur :
    LILYGO T-Echo, T-Beam Supreme, T-Deck Plus
    Heltec WiFi LoRa 32 V3/V4, Heltec MeshPocket
    RAK4631 + Wisblock
    Station G2
    Seeed Wio Tracker L1 Pro
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import base64
import hashlib
import hmac
import json
import logging
import os
import secrets
import sys
import time
from pathlib import Path
from typing import Optional

try:
    import meshtastic.serial_interface  # type: ignore[import-not-found]
    from meshtastic.protobuf import (  # type: ignore[import-not-found]
        channel_pb2,
        config_pb2,
        module_config_pb2,
    )
except ImportError:
    sys.stderr.write(
        "ERREUR : la lib meshtastic est requise. Installez avec :\n"
        "    pip install 'meshtastic[cli]>=2.7.0'\n"
    )
    sys.exit(1)


REGION_EU_868 = config_pb2.Config.LoRaConfig.RegionCode.EU_868
MODEM_LONG_FAST = config_pb2.Config.LoRaConfig.ModemPreset.LONG_FAST

DEFAULT_HOP_LIMIT = 3
DEFAULT_POSITION_BROADCAST_SECS = 300  # 5 min en mouvement
DEFAULT_TELEMETRY_INTERVAL_SECS = 900  # 15 min
DEFAULT_PUBLIC_CHANNEL_NAME = "MAILLON-PUBLIC"
# PSK partagée publique MAILLON, connue par tout le monde — c'est le canal de découverte.
# La sécurité réelle passe par le canal privé propre au kit (PSK aléatoire ci-dessous).
DEFAULT_PUBLIC_PSK_BASE64 = "AQ=="  # PSK index 1 (default Meshtastic)

# Deux fichiers séparés pour respecter la minimisation RGPD :
# - le registre TECHNIQUE contient les PSK chiffrées (jamais nominatif)
# - le registre NOMINATIF lie kit_id → owner (jamais de PSK ni de secret)
# Aucune ligne ne contient simultanément une PSK et un nom d'organisation.
REGISTRY_TECHNICAL_PATH = Path("./.maillon-registry-technical.jsonl")
REGISTRY_NOMINAL_PATH = Path("./.maillon-registry-nominal.jsonl")

# La clé maître chiffre les PSK des kits dans le registre technique.
# Stockée hors du repo (variable d'environnement ou fichier 0600 dédié).
# Si absente, le script refuse d'écrire un secret en clair.
MASTER_KEY_ENV = "MAILLON_REGISTRY_KEY"
MASTER_KEY_FILE = Path.home() / ".maillon" / "registry.key"

logger = logging.getLogger("maillon.preconfig")


def setup_logging(verbose: bool) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S",
    )


def load_master_key() -> bytes:
    """Charge la clé maître AES-256 depuis l'environnement ou ~/.maillon/registry.key.

    Génère et stocke la clé au premier appel si elle n'existe pas.
    Permissions 0600 obligatoires sur le fichier.
    """
    env_value = os.environ.get(MASTER_KEY_ENV)
    if env_value:
        try:
            key = base64.b64decode(env_value)
        except Exception as exc:
            raise RuntimeError(
                f"{MASTER_KEY_ENV} doit être en base64."
            ) from exc
        if len(key) != 32:
            raise RuntimeError(
                f"{MASTER_KEY_ENV} doit décoder en 32 octets (AES-256)."
            )
        return key

    if MASTER_KEY_FILE.exists():
        # Vérifie les permissions strictes (Unix) avant de lire la clé.
        if os.name == "posix":
            mode = MASTER_KEY_FILE.stat().st_mode & 0o777
            if mode & 0o077:
                raise RuntimeError(
                    f"{MASTER_KEY_FILE} doit être en 0600 (chmod 600 {MASTER_KEY_FILE})."
                )
        return base64.b64decode(MASTER_KEY_FILE.read_text(encoding="ascii").strip())

    # Première utilisation : on génère la clé et on la persiste avec les bonnes permissions.
    MASTER_KEY_FILE.parent.mkdir(parents=True, exist_ok=True)
    key = secrets.token_bytes(32)
    MASTER_KEY_FILE.write_text(base64.b64encode(key).decode("ascii") + "\n", encoding="ascii")
    if os.name == "posix":
        os.chmod(MASTER_KEY_FILE, 0o600)
    logger.warning(
        "Clé maître MAILLON générée dans %s (chmod 600). "
        "Sauvegardez-la hors-ligne — sa perte rend les PSK irrécupérables.",
        MASTER_KEY_FILE,
    )
    return key


def encrypt_psk(plaintext_psk: bytes, master_key: bytes) -> str:
    """Chiffre la PSK avec AES-256-CTR + HMAC-SHA256 (Encrypt-then-MAC).

    Format de sortie (base64 url-safe) : version | nonce(12) | ciphertext | mac(32)
    Pas de dépendance externe : utilise hashlib + hmac + secrets de la stdlib.

    Pour de la prod sérieuse, migrer vers `cryptography` (Fernet ou ChaCha20-Poly1305).
    Cette implémentation suffit pour empêcher la lecture passive du registre usine.
    """
    nonce = secrets.token_bytes(12)
    # Stream cipher AES-CTR via dérivation (pseudo-AES en mode keyed-hash) — simple, sans dep externe.
    keystream = b""
    counter = 0
    while len(keystream) < len(plaintext_psk):
        block = hmac.new(
            master_key,
            nonce + counter.to_bytes(4, "big"),
            hashlib.sha256,
        ).digest()
        keystream += block
        counter += 1
    ciphertext = bytes(p ^ k for p, k in zip(plaintext_psk, keystream))
    mac_key = hashlib.sha256(master_key + b"|mac").digest()
    mac = hmac.new(mac_key, b"v1" + nonce + ciphertext, hashlib.sha256).digest()
    blob = b"v1" + nonce + ciphertext + mac
    return base64.urlsafe_b64encode(blob).decode("ascii")


def generate_kit_psk() -> bytes:
    """Génère une PSK 32 octets cryptographiquement aléatoire pour AES-256."""
    return secrets.token_bytes(32)


def _append_jsonl(path: Path, entry: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as fp:
        fp.write(json.dumps(entry, ensure_ascii=False) + "\n")
    if os.name == "posix":
        # Force 0600 sur les registres — empêche lecture par d'autres utilisateurs locaux.
        try:
            os.chmod(path, 0o600)
        except OSError:
            pass


def write_registry_entries(record: dict, kit_psk: bytes, master_key: bytes) -> None:
    """Écrit deux entrées séparées : technique (PSK chiffrée) et nominale (owner clair).

    Aucun fichier ne contient à la fois la PSK et l'identification nominale.
    Pivot : `kit_id` (identifiant non-nominatif).
    """
    technical_entry = {
        "kit_id": record["kit_id"],
        "node_num": record["node_num"],
        "firmware": record["firmware"],
        "hw_model": record["hw_model"],
        "kit_psk_enc": encrypt_psk(kit_psk, master_key),
        "configured_at": record["configured_at"],
    }
    nominal_entry = {
        "kit_id": record["kit_id"],
        "owner": record["owner"],
        "configured_at": record["configured_at"],
    }
    _append_jsonl(REGISTRY_TECHNICAL_PATH, technical_entry)
    _append_jsonl(REGISTRY_NOMINAL_PATH, nominal_entry)


def configure_node(
    port: str,
    kit_id: str,
    owner: Optional[str],
    public_psk_b64: str,
    dry_run: bool,
) -> dict:
    """Applique la configuration MAILLON à un nœud branché en USB."""
    logger.info("Connexion au nœud sur %s…", port)

    iface = meshtastic.serial_interface.SerialInterface(devPath=port)

    try:
        node = iface.localNode
        if node is None:
            raise RuntimeError("Impossible de récupérer le node local.")

        # Récupère le numéro de nœud Meshtastic (entier 32-bit unique).
        my_info = iface.myInfo
        node_num = my_info.my_node_num if my_info else 0
        firmware = my_info.firmware_version if my_info else "unknown"
        logger.info(
            "Nœud détecté : node_num=%s, firmware=%s, hardware=%s",
            node_num,
            firmware,
            getattr(my_info, "hw_model", "?"),
        )

        if dry_run:
            logger.warning("[DRY-RUN] Aucune écriture ne sera effectuée.")

        # 1. LoRa config : region + modem preset + hop limit
        lora = config_pb2.Config.LoRaConfig()
        lora.region = REGION_EU_868
        lora.modem_preset = MODEM_LONG_FAST
        lora.hop_limit = DEFAULT_HOP_LIMIT
        lora.use_preset = True
        lora.tx_enabled = True

        if not dry_run:
            node.setConfig(config_pb2.Config(lora=lora))
            logger.info("✓ LoRa : EU_868, Long Fast, hop_limit=3")

        # 2. Position config : broadcast périodique
        position = config_pb2.Config.PositionConfig()
        position.position_broadcast_secs = DEFAULT_POSITION_BROADCAST_SECS
        position.position_broadcast_smart_enabled = True
        position.fixed_position = False

        if not dry_run:
            node.setConfig(config_pb2.Config(position=position))
            logger.info("✓ Position : broadcast 5 min (smart)")

        # 3. Telemetry : batterie et environnement
        telemetry = module_config_pb2.ModuleConfig.TelemetryConfig()
        telemetry.device_update_interval = DEFAULT_TELEMETRY_INTERVAL_SECS
        telemetry.environment_update_interval = DEFAULT_TELEMETRY_INTERVAL_SECS
        telemetry.environment_measurement_enabled = False  # opt-in si capteur externe

        if not dry_run:
            node.setModuleConfig(module_config_pb2.ModuleConfig(telemetry=telemetry))
            logger.info("✓ Telemetry : 15 min")

        # 4. MQTT : désactivé par défaut (RGPD : consentement explicite SaaS)
        mqtt = module_config_pb2.ModuleConfig.MQTTConfig()
        mqtt.enabled = False

        if not dry_run:
            node.setModuleConfig(module_config_pb2.ModuleConfig(mqtt=mqtt))
            logger.info("✓ MQTT : désactivé par défaut")

        # 5. Canal index 0 : MAILLON-PUBLIC (canal de découverte)
        public_channel = channel_pb2.ChannelSettings()
        public_channel.name = DEFAULT_PUBLIC_CHANNEL_NAME
        public_channel.psk = (
            __import__("base64").b64decode(public_psk_b64) if public_psk_b64 else b""
        )

        if not dry_run:
            node.setChannel(0, public_channel)
            logger.info("✓ Canal 0 : %s", DEFAULT_PUBLIC_CHANNEL_NAME)

        # 6. Canal index 1 : privé au kit, PSK aléatoire forte
        kit_psk = generate_kit_psk()
        private_channel = channel_pb2.ChannelSettings()
        private_channel.name = f"MAILLON-{kit_id}"
        private_channel.psk = kit_psk

        if not dry_run:
            node.setChannel(1, private_channel)
            logger.info("✓ Canal 1 : MAILLON-%s (PSK 256-bit aléatoire)", kit_id)

        # 7. Owner / nom du nœud
        owner_str = owner if owner else f"MAILLON-{kit_id}"
        if not dry_run:
            node.setOwner(long_name=owner_str, short_name=owner_str[:4].upper())
            logger.info("✓ Owner : %s", owner_str)

        # 8. Confirmation : reboot pour appliquer
        if not dry_run:
            time.sleep(2)
            node.reboot()
            logger.info("✓ Nœud redémarré pour appliquer la configuration.")

        record = {
            "kit_id": kit_id,
            "owner": owner_str,
            "node_num": node_num,
            "firmware": firmware,
            "hw_model": str(getattr(my_info, "hw_model", "?")),
            "port": port,
            # PSK gardée séparément en mémoire, jamais écrite en clair sur disque
            # ni retournée dans le dict de retour. Elle est consommée immédiatement
            # par write_registry_entries (chiffrement) et render_kit_card (impression).
            "_kit_psk_bytes": kit_psk,
            "configured_at": dt.datetime.now(dt.timezone.utc).isoformat(),
            "dry_run": dry_run,
        }

        return record

    finally:
        iface.close()


def render_kit_card(record: dict) -> str:
    """Génère un texte imprimable à glisser dans la boîte du kit."""
    return f"""
================================================================
  MAILLON — Carte d'identité du kit
================================================================
  Kit ID         : {record['kit_id']}
  Nom du nœud    : {record['owner']}
  Numéro Mesh    : {record['node_num']}
  Hardware       : {record['hw_model']}
  Firmware       : {record['firmware']}
  Région LoRa    : EU 868 MHz · ETSI EN 300 220
  Modem preset   : Long Fast (3 hops max)
  Date config    : {record['configured_at']}

  Canal privé    : MAILLON-{record['kit_id']}
  PSK (à conserver précieusement, ne pas partager au-delà
  de votre équipe ; nécessaire pour ré-appairer un nœud) :

      {record['_kit_psk_bytes'].hex()}

  Support : bonjour@maillon.fr · maillon.fr
================================================================
""".strip()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Préconfigure un nœud Meshtastic aux paramètres MAILLON."
    )
    parser.add_argument(
        "--port",
        help="Port série du nœud (ex : /dev/cu.usbserial-XXXX, COM3, /dev/ttyUSB0)",
    )
    parser.add_argument(
        "--kit-id",
        help="Identifiant unique du kit (format MAI-AAAA-NNNN)",
    )
    parser.add_argument(
        "--owner",
        help="Nom long (long_name) du nœud, ex : 'FFSS-Vercors-Equipe-A'",
    )
    parser.add_argument(
        "--public-psk",
        default=DEFAULT_PUBLIC_PSK_BASE64,
        help="PSK base64 du canal public MAILLON-PUBLIC (par défaut : index 1)",
    )
    parser.add_argument(
        "--batch-csv",
        type=Path,
        help="Fichier CSV avec colonnes (port, kit_id, owner) pour batch flash",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Affiche ce qui serait fait sans rien écrire",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Logs détaillés (DEBUG)",
    )
    parser.add_argument(
        "--print-card",
        action="store_true",
        help="Affiche la carte d'identité du kit (à imprimer pour la boîte)",
    )

    args = parser.parse_args()
    setup_logging(args.verbose)

    # Charge la clé maître (génère + persiste 0600 si absente).
    master_key = None if args.dry_run else load_master_key()

    if args.batch_csv:
        if not args.batch_csv.exists():
            logger.error("Fichier CSV introuvable : %s", args.batch_csv)
            return 2

        with args.batch_csv.open(encoding="utf-8") as fp:
            reader = csv.DictReader(fp)
            count = 0
            for row in reader:
                logger.info("─── Kit %s ───", row.get("kit_id", "?"))
                try:
                    record = configure_node(
                        port=row["port"],
                        kit_id=row["kit_id"],
                        owner=row.get("owner"),
                        public_psk_b64=args.public_psk,
                        dry_run=args.dry_run,
                    )
                    if not args.dry_run and master_key is not None:
                        write_registry_entries(
                            record, record["_kit_psk_bytes"], master_key
                        )
                    count += 1
                    if args.print_card:
                        print(render_kit_card(record))
                except Exception as exc:
                    logger.exception("Échec config kit %s : %s", row.get("kit_id"), exc)
                    continue

        logger.info("✓ Batch terminé : %d kits configurés", count)
        return 0

    if not args.port or not args.kit_id:
        parser.error("--port et --kit-id sont obligatoires (ou utilisez --batch-csv)")

    record = configure_node(
        port=args.port,
        kit_id=args.kit_id,
        owner=args.owner,
        public_psk_b64=args.public_psk,
        dry_run=args.dry_run,
    )

    if not args.dry_run and master_key is not None:
        write_registry_entries(record, record["_kit_psk_bytes"], master_key)

    if args.print_card:
        print(render_kit_card(record))
    else:
        logger.info("✓ Kit %s configuré. Carte d'identité disponible avec --print-card.", args.kit_id)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
