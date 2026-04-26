# MAILLON — Scripts internes

Scripts utilitaires pour les opérations MAILLON (préconfiguration usine, exports, maintenance).

---

## `preconfig.py` — Préconfiguration usine d'un nœud Meshtastic

Configure un nœud Meshtastic neuf aux paramètres MAILLON par défaut. Génère également une carte d'identité du kit à glisser dans la boîte.

### Pré-requis

```bash
# Python 3.10+
python3 --version

# Installer la lib Meshtastic CLI officielle
pip install "meshtastic[cli]>=2.7.0"

# (Mac) Lister les ports série disponibles
ls /dev/cu.* | grep -i usb

# (Linux) Identifier le périphérique
ls /dev/ttyUSB* /dev/ttyACM*

# (Windows) Voir les ports COM dans le Gestionnaire de périphériques
```

Le firmware Meshtastic ≥ 2.7.0 doit déjà être flashé sur le nœud. Utilisez [flasher.meshtastic.org](https://flasher.meshtastic.org) si nécessaire.

### Cas d'usage simples

**Configuration d'un kit unitaire** :

```bash
python3 preconfig.py \
    --port /dev/cu.usbserial-A50285BI \
    --kit-id MAI-2026-0042 \
    --owner "FFSS-Vercors-Equipe-A" \
    --print-card
```

Sortie typique :

```
[12:34:51] Connexion au nœud sur /dev/cu.usbserial-A50285BI…
[12:34:53] Nœud détecté : node_num=1234567890, firmware=2.7.22, hardware=TBEAM_S3
[12:34:53] ✓ LoRa : EU_868, Long Fast, hop_limit=3
[12:34:54] ✓ Position : broadcast 5 min (smart)
[12:34:54] ✓ Telemetry : 15 min
[12:34:55] ✓ MQTT : désactivé par défaut
[12:34:55] ✓ Canal 0 : MAILLON-PUBLIC
[12:34:56] ✓ Canal 1 : MAILLON-MAI-2026-0042 (PSK 256-bit aléatoire)
[12:34:57] ✓ Owner : FFSS-Vercors-Equipe-A
[12:34:59] ✓ Nœud redémarré pour appliquer la configuration.
```

Et la carte d'identité imprimable :

```
================================================================
  MAILLON — Carte d'identité du kit
================================================================
  Kit ID         : MAI-2026-0042
  Nom du nœud    : FFSS-Vercors-Equipe-A
  Numéro Mesh    : 1234567890
  Hardware       : TBEAM_S3
  ...
  PSK : a3f4d8c2...
================================================================
```

### Mode batch (chaîne de production)

Préparez un CSV `batch.csv` :

```csv
port,kit_id,owner
/dev/cu.usbserial-A1,MAI-2026-0001,Decouverte-001-A
/dev/cu.usbserial-A2,MAI-2026-0001,Decouverte-001-B
/dev/cu.usbserial-A3,MAI-2026-0002,Pro-002-A
```

Puis lancez :

```bash
python3 preconfig.py --batch-csv batch.csv --print-card
```

### Mode dry-run (test)

Simule sans rien écrire sur le nœud :

```bash
python3 preconfig.py --port /dev/cu.usbserial-XXXX --kit-id TEST-0001 --dry-run --verbose
```

### Registre

Toutes les configurations sont journalisées dans `.maillon-preconfig-registry.jsonl` (append-only). Format JSON Lines :

```json
{"kit_id":"MAI-2026-0042","owner":"FFSS-Vercors-Equipe-A","node_num":1234567890,"firmware":"2.7.22","hw_model":"TBEAM_S3","kit_psk_hex":"a3f4...","configured_at":"2026-06-15T12:34:59+00:00","dry_run":false}
```

Ce fichier est :
- **Append-only** : ne jamais modifier ou supprimer manuellement
- **Sensible** : contient les PSK des canaux privés des kits → à protéger comme un secret
- **Sauvegardé** : à inclure dans les backups chiffrés MAILLON
- **Source de vérité** pour la traçabilité usine et le service après-vente

---

## TODO scripts

- [ ] `flash.sh` — wrapper esptool/uf2 pour flasher le firmware avant `preconfig.py`
- [ ] `verify.py` — checks post-config (LoRa actif, GPS lock, telemetry OK)
- [ ] `export-registry.py` — export du registre vers Postgres / Notion
- [ ] `qr-card.py` — génère un QR code dans la carte d'identité (lien direct app)
- [ ] `bulk-update.py` — déploie une mise à jour firmware sur un parc client (avec consentement)
