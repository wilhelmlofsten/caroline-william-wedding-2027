# Caroline & William — Gotland 2027

A single-page, scroll-down wedding website for Caroline & William
(Gotland, 6–7 August 2027), in Swedish.

- **Frontend:** Vite + React 19 + TypeScript SPA (Tailwind v4 design system).
- **Backend:** small Node + Express + TypeScript server with SQLite for RSVP submissions.

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs both the Vite dev server (http://localhost:5173) and the
RSVP API (http://localhost:3001) together. Vite proxies `/api/*` to the API,
so no extra config is needed locally.

Run them separately if you prefer:

```bash
npm run dev:web   # Vite only
npm run dev:api   # RSVP server only (tsx watch)
```

## RSVP data

Submissions are stored in SQLite at `data/rsvps.db` (git-ignored). Set
`ADMIN_TOKEN` to enable a private listing endpoint:

```bash
curl "http://localhost:3001/api/rsvp?token=YOUR_TOKEN"
```

Server env vars (see `.env.example`): `PORT`, `ALLOWED_ORIGINS`,
`ADMIN_TOKEN`, `DATABASE_PATH`.

## Build

```bash
npm run build    # type-checks, then builds the SPA into dist/
npm run preview  # preview the production build
```

## Hosting

The frontend and the RSVP API are hosted separately because GitHub Pages is
static-only and cannot run the Node/SQLite server.

### Frontend → GitHub Pages
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
the correct `/<repo>/` base path and deploys to Pages. Enable Pages
(Settings → Pages → Source: GitHub Actions) and set a repo variable
`VITE_API_BASE_URL` to the deployed API origin.

### RSVP API → any Node host
Run the server anywhere that executes Node (VPS, Render, Railway, Fly.io):

```bash
npm ci
ALLOWED_ORIGINS="https://<user>.github.io" ADMIN_TOKEN="…" npm run server
```

To serve the built SPA and API from one Node process instead, run
`npm run build` and start the server with `SERVE_STATIC=true`.
