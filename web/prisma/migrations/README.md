# Migrations Prisma — MAILLON

Prisma gère le schéma relationnel. Les **hypertables Timescale**, **RLS** et la
politique GiST/PostGIS ne sont pas natifs : on les applique en SQL brut juste
après chaque `prisma migrate deploy`.

## Première mise en service

```bash
# 1. Créer la base et activer les extensions
psql "$DATABASE_URL" -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"
psql "$DATABASE_URL" -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql "$DATABASE_URL" -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

# 2. Appliquer les migrations Prisma
pnpm prisma migrate deploy

# 3. Convertir les tables temps série en hypertables
psql "$DATABASE_URL" <<'SQL'
SELECT create_hypertable('positions',  'ts', if_not_exists => TRUE, chunk_time_interval => INTERVAL '7 days');
SELECT create_hypertable('telemetry',  'ts', if_not_exists => TRUE, chunk_time_interval => INTERVAL '7 days');
SELECT create_hypertable('audit_log',  'ts', if_not_exists => TRUE, chunk_time_interval => INTERVAL '30 days');

-- Compression auto au-delà de 14 jours (économise jusqu'à 95 % du stockage).
ALTER TABLE positions  SET (timescaledb.compress, timescaledb.compress_segmentby = 'org_id, node_id');
ALTER TABLE telemetry  SET (timescaledb.compress, timescaledb.compress_segmentby = 'org_id, node_id, key');
SELECT add_compression_policy('positions',  INTERVAL '14 days');
SELECT add_compression_policy('telemetry',  INTERVAL '14 days');

-- Rétention par défaut (à ajuster par plan tarifaire) : 24 mois.
SELECT add_retention_policy('positions', INTERVAL '24 months');
SELECT add_retention_policy('telemetry', INTERVAL '24 months');
SELECT add_retention_policy('audit_log', INTERVAL '36 months');
SQL

# 4. Activer Row Level Security
psql "$DATABASE_URL" <<'SQL'
ALTER TABLE nodes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry  ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE geofences  ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log  ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_nodes      ON nodes      USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_positions  ON positions  USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_telemetry  ON telemetry  USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_messages   ON messages   USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_alerts     ON alerts     USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_geofences  ON geofences  USING (org_id = current_setting('app.current_org_id', true));
CREATE POLICY tenant_isolation_audit      ON audit_log  USING (org_id = current_setting('app.current_org_id', true));
SQL
```

## À chaque nouvelle migration

Si une nouvelle table contient des données par tenant : ajouter le `ENABLE
ROW LEVEL SECURITY` + policy correspondante. Si c'est une nouvelle table de
métriques temps : `create_hypertable` + politique de compression/rétention.

## Bonnes pratiques

- **Jamais** désactiver RLS sans audit (incident_response obligatoire).
- Le rôle applicatif doit être un rôle non-superuser (RLS est ignorée pour
  superuser/owner). Voir `web/lib/db.ts` (à créer ultérieurement) pour
  l'injection de `app.current_org_id` au début de chaque transaction.
- Les hypertables ne supportent pas les `UPDATE` larges sans contrainte sur
  `ts` : préférer `INSERT ON CONFLICT` côté ingestion.
- Avant un changement destructif, dump : `pg_dump -Fc -f backup.dump "$DATABASE_URL"`.
