# 15 — Audit de sécurité MAILLON

> Audit conduit le 25 avril 2026 sur l'arborescence `MAILLON/` (web Next.js, apps mobile iOS/Android, desktop Tauri, script Python `preconfig.py`).
> Phase projet : exploration, pré-MVP. Aucun environnement de production déployé.

---

## 1. Synthèse exécutive

**Niveau de risque global : MOYEN-BAS** au regard du stade (squelette + 2 routes API). Les fondations sont saines : en-têtes HTTP corrects, validation côté serveur par allow-list, secrets non commités, ATS strict iOS, CSP Tauri restrictive, `BLUETOOTH_SCAN neverForLocation`, MQTT désactivé par défaut. Aucune vulnérabilité critique exploitée à distance détectée. Les risques principaux concernent la phase de **mise en production** : absence de rate-limiting, journalisation d'IP sans purge, gestion future des PSK Meshtastic, écriture JSONL non viable en serverless.

**Top 3 à corriger avant production :**

1. **PSK 256-bit en clair dans `.maillon-preconfig-registry.jsonl`** sans chiffrement ni ACL filesystem (`scripts/preconfig.py:73,92-96,210`) — Haute : compromission usine = écoute de tous les canaux privés clients.
2. **Aucun rate-limit ni captcha** sur `/api/preorder` et `/api/contact` (Haute) — pollution des leads, saturation disque, déni de service applicatif.
3. **Pas de Content-Security-Policy** sur le site web (`next.config.ts:12-23`) — surface XSS plus large que nécessaire en production.

---

## 2. Findings OWASP Top 10 2021

### A01 — Broken Access Control

**F-A01-1 · Routes API anonymes sans anti-bot · Moyenne** — `web/app/api/preorder/route.ts:44`, `web/app/api/contact/route.ts:32`. Cohérent avec un formulaire public, mais sans protection (cf. F-A04-1) un attaquant peut polluer le `.jsonl`.
*Remédiation* : Cloudflare Turnstile / hCaptcha vérifié dans un `middleware.ts`.

### A02 — Cryptographic Failures

**F-A02-1 · PSK imprimées en clair sur la « carte d'identité » papier · Moyenne** — `scripts/preconfig.py:223-244` (`render_kit_card`). Carton volé/photographié = canal compromis. *Remédiation* : QR chiffré (clé dérivée du kit ID + PIN client) ou provisioning BLE in-app exclusif.

**F-A02-2 · Registre `.jsonl` stocke les PSK en clair · Haute** — `scripts/preconfig.py:73, 92-96, 210`. Cible de plus haute valeur de toute l'opération MAILLON ; aucun chiffrement, aucune permission filesystem restreinte.
```python
from cryptography.fernet import Fernet
cipher = Fernet(os.environ["MAILLON_REGISTRY_KEY"].encode())
fp.write(cipher.encrypt(json.dumps(entry).encode()).decode() + "\n")
os.chmod(REGISTRY_PATH, 0o600)
```
Documenter la rotation et la garde en KMS (AWS KMS, GCP KMS, Vault) en prod.

**F-A02-3 · Bon point** — `secrets.token_bytes(32)` correctement utilisé (`preconfig.py:87-89`).

### A03 — Injection

**F-A03-1 · Injection de port série via CSV · Basse** — `scripts/preconfig.py:303-309`. `port` issu d'un CSV passé tel quel à `SerialInterface(devPath=port)`. Si CSV malveillant, peut pointer vers `/dev/sda`. *Remédiation* :
```python
ALLOWED_PORTS = re.compile(r"^(/dev/(cu|tty)\.[\w\-\.]+|COM\d+|/dev/ttyUSB\d+|/dev/ttyACM\d+)$")
if not ALLOWED_PORTS.match(port): raise ValueError(...)
```

**F-A03-2 · Bon point** — `VALID_INTERESTS`, `VALID_USAGES`, `SUBJECTS` sont des `Set` immuables vérifiés avant écriture (`preorder/route.ts:13-28`, `contact/route.ts:5-16`). Pas d'injection JSONL au-delà du schéma serveur.

### A04 — Insecure Design

**F-A04-1 · Aucun rate-limiting · Haute** — `web/app/api/{preorder,contact}/route.ts`. Une boucle `curl` peut saturer `.data/*.jsonl`, polluer les leads, consommer toute la RAM/disque serverless. *Remédiation* avec lib éprouvée :
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "10 m") });
const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
const { success } = await ratelimit.limit(`preorder:${ip}`);
if (!success) return NextResponse.json({ error: "Trop de requêtes." }, { status: 429 });
```

**F-A04-2 · Stockage `.data/*.jsonl` non viable serverless · Moyenne** — `web/app/api/preorder/route.ts:36-42`, `contact/route.ts:24-30`. `process.cwd()` n'est ni persistant ni partagé sur Vercel/Netlify. Le commentaire ligne 5 est lucide. *Remédiation* : Supabase / Resend Audiences avant la pré-commande publique.

**F-A04-3 · Bon point** — Limites de longueur cohérentes : `name` 2-200, `message` 10-5000, `email` 320, `organization` 200 (`contact/route.ts:48-68`).

### A05 — Security Misconfiguration

**F-A05-1 · Pas de CSP sur le site · Moyenne** — `web/next.config.ts:12-23`. Les en-têtes posés sont bons (Referrer-Policy, X-CTO, X-Frame-Options DENY, Permissions-Policy) mais aucune CSP, aucun HSTS. *Remédiation* :
```ts
{ key: "Content-Security-Policy", value:
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; " +
  "connect-src 'self' https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
```

**F-A05-2 · CSP Tauri tolère `'unsafe-inline'` sur `style-src` · Basse** — `apps/desktop/src-tauri/tauri.conf.json:31`, `index.html:10`. Acceptable au stade actuel (Tailwind v4 + Google Fonts) ; à durcir en release.

**F-A05-3 · Tauri charge les Google Fonts depuis CDN · Basse** — `apps/desktop/index.html:14-17`. Pour une console opérateur off-grid, embarquer les polices via `@fontsource/*` garantit le fonctionnement sans Internet et supprime la fuite IP utilisateur vers Google.

**F-A05-4 · Bons points** — `poweredByHeader: false`, aucun `dangerouslySetInnerHTML`, aucun `eval`, `.env*` gitignored.

### A06 — Vulnerable and Outdated Components

**F-A06-1 · `meshtastic = "0.1"` early stage · Basse** — `Cargo.toml:32`. Pinner un minor (`0.1.x`) tant que la 1.0 n'est pas sortie ; lancer `cargo audit` en CI.

**F-A06-2 · Compose Compiler 1.5.10 ancien · Basse** — `apps/android/app/build.gradle.kts:60`. Mettre à jour avant publication Play Store (1.5.14+ corrige plusieurs CVE R8).

**F-A06-3 · Meshtastic-Apple suivi sur `branch: "main"` · Moyenne** — `apps/ios-macos/Package.swift:22-25`. Risque supply chain. *Remédiation* : `from: "2.5.0"` (tag).

**F-A06-4 · `npm audit` à exécuter** — Info. Aucun lockfile ; bloquer la CI sur findings High/Critical.

### A07 — Authentication Failures
Aucun système d'auth utilisateur dans le périmètre actuel. À auditer dès intégration Auth.js / Supabase Auth.

### A08 — Software and Data Integrity Failures

**F-A08-1 · Registre sans signature ni hash chaîné · Basse** — `scripts/preconfig.py:92-96`. Le « append-only » est une convention humaine. Ajouter un hash chaîné :
```python
entry["prev_hash"] = compute_last_hash(REGISTRY_PATH)
entry["entry_hash"] = hashlib.sha256(json.dumps(entry, sort_keys=True).encode()).hexdigest()
```

### A09 — Logging and Monitoring Failures

**F-A09-1 · IP/UA loggés sans purge automatisée · Moyenne (RGPD)** — `preorder/route.ts:86-87`, `contact/route.ts:77-78`. La page `/confidentialite` annonce 12 mois mais aucune purge dans le code. *Remédiation* : hash IP + sel à l'écriture, ou Edge Cron de purge.
```ts
const ipHash = crypto.createHash("sha256").update(ip + process.env.IP_SALT!).digest("hex");
```

**F-A09-2 · Pas de monitoring d'erreur · Basse** — `catch` muets ; brancher Sentry avant prod.

### A10 — SSRF
Aucun fetch vers une URL fournie par le client. **Pas de finding.**

---

## 3. Apps mobiles

### iOS / macOS — `apps/ios-macos/`

- **F-IOS-1 · `UIBackgroundModes` BLE central+peripheral · Basse** (`Info.plist:50-54`) — App Review questionne souvent `peripheral`. Le retirer si non utilisé pour broadcast côté téléphone.
- **F-IOS-2 · Bon point** — `NSLocationWhenInUseUsageDescription` mentionne explicitement « jamais transmise sans consentement explicite ».
- **F-IOS-3 · Bon point** — `NSAllowsArbitraryLoads = false` (`Info.plist:57-61`) : aucun HTTP en clair toléré.
- **F-IOS-4 · Pas de Certificate Pinning · Info** — Prévoir `URLSessionDelegate` ou TrustKit dès l'ajout du module SaaS.
- **F-IOS-5 · `nodeId` dérivé du `peripheral.identifier.uuidString` · Info** (`MaillonBluetoothManager.swift:174`) — UUID change à la réinstallation ; remplacer par le `node_num` Meshtastic réel.

### Android — `apps/android/`

- **F-AND-1 · Bon point** — `BLUETOOTH_SCAN neverForLocation` (`AndroidManifest.xml:11-13`).
- **F-AND-2 · `ACCESS_FINE_LOCATION` non scopée · Moyenne (RGPD)** (`AndroidManifest.xml:24`) — demandée pour tous SDK alors que `BLUETOOTH_SCAN neverForLocation` rend ça inutile en API 31+. Ajouter `android:maxSdkVersion="30"` si la position du téléphone n'est pas affichée.
- **F-AND-3 · Bon point** — `allowBackup="false"` + `dataExtractionRules` (`:38-39`). Conforme OWASP MASVS.
- **F-AND-4 · `MainActivity exported="true"` · Basse** (`:50`) — attendu pour le launcher ; ne pas étendre aux activités secondaires sans `intent-filter` strict.
- **F-AND-5 · `INTERNET` anticipée · Info** (`:28`) — déclarée pour le futur MQTT TLS. Ajouter un `network_security_config.xml` avec `cleartextTrafficPermitted="false"` dès activation.

---

## 4. Desktop Tauri — `apps/desktop/`

- **F-TAURI-1 · Bon point** — CSP `connect-src 'self' ipc: https://ipc.localhost` restrictive (`tauri.conf.json:31`).
- **F-TAURI-2 · Pas de `capabilities/*.json` · Moyenne** — Tauri 2 utilise un système de capabilities. Sans déclaration, durcissement non explicite. Créer `src-tauri/capabilities/main.json` : `{ "identifier": "main-capability", "windows": ["main"], "permissions": ["core:default", "shell:allow-open"] }`.
- **F-TAURI-3 · `tauri-plugin-shell` sans scope · Moyenne** (`Cargo.toml:21`, `main.rs:156`) — restreindre via `shell:allow-open` + URL allow-list ou retirer le plugin tant qu'il n'est pas utilisé.
- **F-TAURI-4 · CSP doublonnée HTML + JSON · Info** (`index.html:8-11` vs `tauri.conf.json:31`) — risque de divergence silencieuse, garder une seule source de vérité.
- **F-TAURI-5 · Commandes IPC sans validation paramètres · Basse** (`main.rs:97-114, 118-137`) — ajouter `if text.len() > 256 { return Err(...) }` (Meshtastic limite à 237 octets).
- **F-TAURI-6 · Bon point** — `envPrefix: ["VITE_"...]` (`vite.config.ts:35`) ; aucun `VITE_*` sensible présent.

---

## 5. Script Python `preconfig.py`

Voir aussi F-A02-1, F-A02-2, F-A03-1, F-A08-1.

- **F-PY-1 · `__import__("base64").b64decode(...)` · Basse (style)** (`preconfig.py:174`) — patron suspect, remplacer par `import base64` en haut.
- **F-PY-2 · Pas de gestion d'erreur sur `b64decode` · Basse** — si `--public-psk` mal formé, stack trace remontée à l'opérateur.
- **F-PY-3 · `print(render_kit_card)` envoie la PSK sur stdout · Moyenne** (`:313, 336`) — capturable par CI, log de terminal, screen recording. Rediriger vers fichier `0600` :
```python
out = REGISTRY_PATH.parent / f"card_{record['kit_id']}.txt"
out.write_text(render_kit_card(record)); os.chmod(out, 0o600)
```
- **F-PY-4 · Pas de mode `--no-print-psk` · Info** — pour batch large, ratio bruit/PSK exposées dangereux.
- **F-PY-5 · Dépendance `meshtastic[cli]>=2.7.0` non pinnée · Basse** (`README.md:18`) — créer `requirements.txt` avec `pip install --require-hashes`.

---

## 6. RGPD

| Réf | Constat | Sévérité | Action |
|---|---|---|---|
| RGPD-1 | IP/UA stockés sans purge auto (`preorder/route.ts:86-87`) | Moyenne | Cron 12 mois ou hash IP avec sel |
| RGPD-2 | Pré-commande sans double opt-in vérifié serveur | Basse | Mail confirmation avec token avant insertion finale |
| RGPD-3 | Pas de checkbox consentement explicite (mention texte sous bouton) | Moyenne | `<input type="checkbox" required>` ou consigner « consentement par envoi » |
| RGPD-4 | `/confidentialite` annonce 12 mois mais aucune procédure droit d'accès/effacement automatisée | Moyenne | Endpoint `/api/rgpd/erasure` + mailto DPO |
| RGPD-5 | `kit_psk_hex` lié à un `owner` (FFSS-Vercors-Equipe-A) — couplage clé crypto + identité | Haute | Séparer table `kits` (id technique) et `assignments` (owner ↔ id), retirer owner du registre PSK |
| RGPD-6 | Permissions BLE/Loc iOS/Android avec descriptions claires | OK | Conserver |
| RGPD-7 | MQTT désactivé par défaut (`preconfig.py:163-167`) — privacy by default | OK | Conserver |

---

## 7. Checklist actions prioritaires

### Critique — avant pré-commande publique
| Action | Effort | Réf |
|---|---|---|
| Chiffrer `.maillon-preconfig-registry.jsonl` (Fernet + KMS) + `chmod 0600` | M | F-A02-2 |
| Retirer `owner` du registre PSK ou découpler les tables | M | RGPD-5 |

### Haute — avant lancement marketing
| Action | Effort | Réf |
|---|---|---|
| Rate-limit `/api/preorder` et `/api/contact` (Upstash + Turnstile) | M | F-A04-1 |
| Migrer `.data/*.jsonl` vers Supabase ou Resend Audiences | H | F-A04-2 |
| Ajouter CSP + HSTS dans `next.config.ts` | L | F-A05-1 |
| Pinner Meshtastic-Apple sur tag, pas branche `main` | L | F-A06-3 |

### Moyenne — durcissement avant v1.0
| Action | Effort | Réf |
|---|---|---|
| Hash IP + cron purge 12 mois | M | F-A09-1, RGPD-1 |
| Capabilities Tauri explicites + scope `tauri-plugin-shell` | L | F-TAURI-2/3 |
| Hash chaîné Merkle sur registre `preconfig` | M | F-A08-1 |
| Validation regex `port` série | L | F-A03-1 |
| Retirer `ACCESS_FINE_LOCATION` Android > API 30 si non nécessaire | L | F-AND-2 |
| Mettre à jour Compose Compiler Android | L | F-A06-2 |
| Carte d'identité PSK → QR chiffré ou app-only | M | F-A02-1 |
| Double opt-in email + checkbox consentement RGPD | M | RGPD-2/3 |
| `print(render_kit_card)` → fichier `0600` | L | F-PY-3 |

### Basse — hygiène continue
| Action | Effort | Réf |
|---|---|---|
| `pip install --require-hashes` sur requirements usine | L | F-PY-5 |
| Embarquer Google Fonts en local dans Tauri | L | F-A05-3 |
| `cargo audit` + `npm audit` en CI | L | F-A06-4 |
| Endpoint RGPD self-service (export/effacement) | M | RGPD-4 |
| Sentry sur API routes | L | F-A09-2 |

Effort : L < 1 j · M = 1-3 j · H > 3 j.

---

## 8. Recommandations infrastructure (production)

1. **Secrets vault** — HashiCorp Vault, AWS Secrets Manager ou Doppler pour Stripe/Resend/MQTT et `MAILLON_REGISTRY_KEY` du script `preconfig.py`. Jamais en `.env` sur les postes usine.
2. **WAF Edge** — Cloudflare devant `github.com/aissablk1/maillon` : bot fight + rate-limit applicatif + DDoS L7. Turnstile sur les formulaires.
3. **Supervision** — Sentry (errors), Plausible (analytics privacy-first s; déjà mentionné dans `/confidentialite`), Better Stack ou UptimeRobot pour la dispo.
4. **Backups chiffrés** — `restic` avec backend B2/Wasabi pour le registre `preconfig` + dump Postgres quotidien ; clé séparée. Tests de restauration trimestriels.
5. **Signature de code** — Apple Developer ID pour la console macOS Tauri ; clé EV Code Signing Windows ; `.aab` Play Store ; iOS App Store. Sans signature, alertes Gatekeeper/SmartScreen.
6. **MQTT TLS** — quand le SaaS arrive : MQTTS port 8883, certificats Let's Encrypt, `require_certificate=true` côté broker, ACL par device/user.
7. **Audit annuel** — audit externe (Synacktiv, Quarkslab) ou bug bounty YesWeHack avant déploiement chez clients secours/BTP.
8. **Conformité** — registre des traitements RGPD (CNIL), DPA signés Stripe/Resend/Supabase, désignation DPO (externe possible si < 50 salariés).

---

*Audit produit le 25 avril 2026 — à réviser à chaque ajout de surface (auth SaaS, MQTT, paiement Stripe).*
