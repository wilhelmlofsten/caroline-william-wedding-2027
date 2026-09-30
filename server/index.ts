import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Database from "better-sqlite3";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT) || 3001;
// Comma-separated list of allowed browser origins for the RSVP endpoint.
// e.g. ALLOWED_ORIGINS="https://wilhelmlofsten.github.io"
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
// Optional token to guard the read endpoint that lists submissions.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "";

const DB_PATH = process.env.DATABASE_PATH || resolve(__dirname, "../data/rsvps.db");
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS wedding_rsvps (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL,
    attending     INTEGER NOT NULL,
    guest_count   INTEGER NOT NULL,
    plus_one_name TEXT,
    dietary_notes TEXT,
    message       TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertRsvp = db.prepare(`
  INSERT INTO wedding_rsvps (name, email, attending, guest_count, plus_one_name, dietary_notes, message)
  VALUES (@name, @email, @attending, @guest_count, @plus_one_name, @dietary_notes, @message)
`);

const rsvpSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    attending: z.boolean(),
    guest_count: z.number().int().min(0).max(10),
    plus_one_name: z.string().trim().max(120),
    dietary_notes: z.string().trim().max(1000),
    message: z.string().trim().max(2000),
    website: z.string().max(0), // honeypot: must be empty
  })
  .refine((data) => (data.attending ? data.guest_count >= 1 : data.guest_count === 0), {
    message: "Ange ett giltigt antal gäster.",
    path: ["guest_count"],
  });

const app = express();
// When deployed behind a reverse proxy/load balancer, set TRUST_PROXY (e.g. "1")
// so per-IP rate limiting sees the real client IP from X-Forwarded-For.
if (process.env.TRUST_PROXY) app.set("trust proxy", Number(process.env.TRUST_PROXY) || 1);
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : true,
    methods: ["GET", "POST"],
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Anti-spam: throttle RSVP submissions per IP (in addition to the honeypot
// field and strict validation). Defaults to 5 submissions / 15 min / IP.
const rsvpLimiter = rateLimit({
  windowMs: Number(process.env.RSVP_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RSVP_MAX) || 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "För många försök. Vänta en stund och försök igen." },
});

app.post("/api/rsvp", rsvpLimiter, (req, res) => {
  const parsed = rsvpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Kontrollera dina uppgifter och försök igen." });
  }
  const { website: _website, attending, ...rest } = parsed.data;
  try {
    insertRsvp.run({
      ...rest,
      attending: attending ? 1 : 0,
      plus_one_name: rest.plus_one_name || null,
      dietary_notes: rest.dietary_notes || null,
      message: rest.message || null,
    });
    return res.json({ ok: true, message: "Tack! Vi har tagit emot ditt svar." });
  } catch {
    return res.status(500).json({ ok: false, message: "Något gick fel. Försök gärna igen lite senare." });
  }
});

// Private list of submissions for the couple. Requires ADMIN_TOKEN to be set
// and passed as ?token= or an Authorization: Bearer header.
app.get("/api/rsvp", (req, res) => {
  if (!ADMIN_TOKEN) return res.status(404).json({ ok: false, message: "Not found." });
  const provided = req.query.token ?? req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (provided !== ADMIN_TOKEN) return res.status(401).json({ ok: false, message: "Unauthorized." });
  const rows = db.prepare("SELECT * FROM wedding_rsvps ORDER BY created_at DESC").all();
  return res.json({ ok: true, count: rows.length, rsvps: rows });
});

// Optionally serve the built SPA when running as a single artifact (set
// SERVE_STATIC=true after `npm run build`).
if (process.env.SERVE_STATIC === "true") {
  const distDir = resolve(__dirname, "../dist");
  if (existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get("*", (_req, res) => res.sendFile(resolve(distDir, "index.html")));
  }
}

app.listen(PORT, () => {
  console.log(`RSVP server listening on http://localhost:${PORT}`);
});
