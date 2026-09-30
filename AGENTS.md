# Project notes

Single-page Swedish wedding site for Caroline & William (Gotland, 6–7 Aug 2027).

- **Frontend:** Vite + React 19 + TypeScript SPA. Entry `src/main.tsx` → `src/App.tsx`.
  Design system lives in `src/styles.css` (Tailwind v4 + custom CSS). Only the
  shadcn `Button` is kept under `src/components/ui`.
- **Backend:** `server/index.ts` — Express + better-sqlite3. `POST /api/rsvp`
  validates with zod and writes to SQLite (`data/rsvps.db`). `GET /api/rsvp`
  lists submissions when `ADMIN_TOKEN` is set.
- **Package manager:** npm (no bun). No TanStack Start, Supabase, Drizzle or Nitro.
- **Hosting:** frontend on GitHub Pages (static); RSVP API on a separate Node host.
  The frontend calls the API via `VITE_API_BASE_URL`; in dev Vite proxies `/api`.

Guest RSVP answers include private contact and dietary info — keep the listing
endpoint token-guarded and never expose the SQLite file publicly.
