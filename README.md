# Boardwalk Labs — Website

Vite + React source for the Boardwalk Labs marketing site.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run lint
```

## Deployment (CI/CD)

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which:

1. Runs `npm ci` + `npm run build` on a clean Ubuntu runner.
2. SSHes into the VPS using an ed25519 deploy key.
3. `rsync`s `dist/` into `/opt/boardwalkbags/public.new/`, backs up the current `public/`, then atomically swaps the staging dir into place.
4. Runs `docker compose build <service>` + `docker compose up -d --no-deps <service>` so the container picks up the new static files.
5. Polls the live site until it returns `200`.

Manual redeploy: **Actions → Deploy to VPS → Run workflow**.

### Required repo secrets

| Name               | Example                  | Required |
| ------------------ | ------------------------ | -------- |
| `SSH_HOST`         | `66.23.231.181`          | yes      |
| `SSH_USER`         | `root`                   | yes      |
| `SSH_PRIVATE_KEY`  | full ed25519 private key | yes      |
| `SSH_PORT`         | `22`                     | optional |
| `REMOTE_DIR`       | `/opt/boardwalkbags`     | optional |
| `SITE_URL`         | `https://boardwalklabs.pro/` | optional |
| `COMPOSE_SERVICE`  | `cado-search`            | optional |

The deploy key's **public** half must be present in `/root/.ssh/authorized_keys` on the VPS. Rotate by generating a new keypair, updating `authorized_keys`, and updating the `SSH_PRIVATE_KEY` secret.

### Rollback

Each deploy stores a tarball at `/opt/boardwalkbags/backups/public-before-ci-<UTC timestamp>.tgz`. To roll back:

```bash
ssh root@66.23.231.181
cd /opt/boardwalkbags
tar -xzf backups/public-before-ci-<timestamp>.tgz   # restores public/
docker compose build cado-search
docker compose up -d --no-deps cado-search
```
