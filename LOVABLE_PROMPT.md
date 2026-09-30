# Lovable Prompt — Caroline & William Wedding Website

> Paste everything below the divider into Lovable. It describes a single-page,
> scroll-down wedding site (SPA) built with **React + TypeScript** on the front
> end and a small **Node + TypeScript** back end for the RSVP form.
>
> **Before you build:** copy the images from this repo's `/media` folder into the
> app's `public/media/` (or `src/assets/`) folder and wire them up as described
> in the *Assets* section. Filenames are listed there.

---

## Project brief

Build an elegant, single-page wedding website for **Caroline Löfsten Oscarsson**
and **William Wexell**. It's a **scroll-down SPA** (one long page, smooth-scroll
navigation, no page reloads). The whole site is in **Swedish**.

The wedding: **"Gotland Bröllop 2027"** — a two-day celebration on the island of
**Gotland, Sweden**, **Friday 6 – Saturday 7 August 2027**.

The tone should feel like the paper save-the-date it's based on: warm, personal,
a little playful, but refined and timeless. Think sunlit Gotland summer, linen,
gold foil, and limestone.

### Tech stack (required)
- **Frontend:** React 18 + TypeScript + Vite.
- **Styling:** Tailwind CSS (with the custom tokens below) — or CSS modules if
  you prefer, but keep the color/font tokens centralized.
- **Backend:** Node + TypeScript (Express) exposing a single `POST /api/rsvp`
  endpoint that validates and stores RSVP submissions (JSON file or SQLite is
  fine for now) and returns a friendly confirmation.
- **Animations:** subtle scroll-reveal (fade/slide up) via Framer Motion or
  IntersectionObserver. Nothing flashy — slow, soft, elegant.
- Fully **responsive** (mobile-first) and accessible.

---

## Design system

### Color palette (from the save-the-date)
Define these as design tokens / Tailwind theme colors:

| Token            | Hex       | Usage                                            |
|------------------|-----------|--------------------------------------------------|
| `ivory`          | `#FFFBF3` | Primary background                               |
| `espresso`       | `#443D3B` | Primary text, dark sections                      |
| `gold`           | `#B59751` | Accents, dividers, hover, section labels         |
| `ink`            | `#000000` | Headlines when extra contrast is needed          |
| `bleu`           | `#00479E` | Sparingly — links / a single deep-blue accent    |
| `white`          | `#FFFFFF` | Cards, contrast text on dark                     |

Default section = `ivory` background with `espresso` text. Use occasional
full-bleed `espresso` sections with `ivory` text and `gold` accents for rhythm.

### Typography
Reference image: `media/font.jpg` (the save-the-date's type). Match this feel:

- **Display / headlines:** a high-contrast Didot-style serif. Use
  **"Didot"** if available, otherwise Google Fonts fallback
  **"Playfair Display"** — large, elegant, letter-spaced for the couple's names.
- **Body:** a classic book serif — **"Plantin"** / **"Bembo"** feel, fallback
  **"EB Garamond"** or **"Cormorant Garamond"**.
- **Labels / small caps accents:** a gothic uppercase face —
  **"Sackers Gothic"** feel, fallback **"Cinzel"** or a letter-spaced uppercase
  sans — for section eyebrows like `PROGRAM`, `PLATS`, `OSA`.
- **UI / sans (buttons, form):** **"Basis Grotesque"** feel, fallback
  **"Montserrat"** or system sans.

Centralize fonts in one place. Uppercase eyebrow labels get generous
letter-spacing (`0.2em`) in `gold`.

### Assets
Put these files in `public/media/`:

- `IMG_1870.png`, `IMG_1879.png`, `IMG_1886.png`, `IMG_1888.png`,
  `IMG_1891.png`, `IMG_1871 (1).jpeg` — couple / Gotland photos for the hero and
  gallery. (Rename `IMG_1871 (1).jpeg` to `IMG_1871.jpeg` to avoid the space.)
- `bold solnedgång.jpg` — a bold sunset shot; use it as the **hero** or a
  full-bleed divider background. (Rename to `sunset.jpg`.)
- `font.jpg` — reference only, do **not** ship it; it shows the target type.

Use the sunset for the hero, and the `IMG_*` photos for the gallery and
section backgrounds. Apply a soft `espresso` overlay on photos behind text for
legibility.

---

## Page structure (top → bottom, one scrolling page)

A slim fixed top nav with the monogram **"C & W"** on the left and smooth-scroll
anchor links on the right (`Hem · Vår historia · Program · Plats · Boende · OSA`).
Nav is transparent over the hero, then gains an `ivory` background on scroll.

1. **Hero**
   - Full-viewport, `bold solnedgång.jpg` (sunset) background with a soft dark
     overlay.
   - Centered: small gold eyebrow `SAVE THE DATE`, then huge Didot names
     **"Caroline & William"**, then **"Gotland · 6–7 Augusti 2027"**.
   - A subtle downward scroll cue.

2. **Välkomna / Intro** (the save-the-date message, verbatim in Swedish)
   > Hej favoritmänniskor! Det har blivit dags. Vi ska göra det officiellt, lova
   > varandra evig trohet och framför allt ställa till med en hej dundrande fest.
   > Det här är bara ett digitalt litet livstecken så att ni kan låsa in datumen
   > i kalendern redan nu. Inbjudan med alla praktiska detaljer, klockslag &
   > OSA-info kommer i höst.
   - Set as elegant centered serif text on `ivory`.

3. **Countdown**
   - A refined countdown to **2027-08-06**, in gold, with Swedish labels
     (`dagar · timmar · minuter · sekunder`).

4. **Vår historia** (Our story)
   - Alternating photo + text rows using the `IMG_*` photos. Placeholder
     Swedish copy the couple can edit later.

5. **Program** (Schedule)
   - Two-day timeline: **Fredag 6 augusti** and **Lördag 7 augusti** with
     placeholder events (welcome drinks, vigsel, middag, fest). Note that exact
     times come in autumn ("Tider och detaljer kommer i höst").

6. **Plats / Gotland** (Venue & travel)
   - Short intro to Gotland + how to get there (färja/flyg till Visby).
   - Embedded map placeholder for the venue.

7. **Boende** (Accommodation)
   - Cards with lodging tips/areas on Gotland. Placeholder content.

8. **Galleri** (Gallery)
   - Responsive masonry/grid of the `IMG_*` photos with a lightbox.

9. **OSA / RSVP**
   - Form posting to `POST /api/rsvp`. Fields: namn, e-post, kommer (ja/nej),
     antal gäster, +1-namn, matpreferenser/allergier, meddelande.
   - Client + server validation; friendly Swedish success + error states.
   - Copy note: full invitation & official RSVP come in autumn — this is an
     early "låt oss veta".

10. **Footer**
    - Monogram **"C & W"**, `Gotland · 6–7 Augusti 2027`, a gold divider, and a
      small "Med kärlek, Caroline & William".

---

## Backend spec

- `POST /api/rsvp` — validate body, persist to `data/rsvps.json` (or SQLite),
  return `{ ok: true, message: "Tack! Vi har tagit emot din anmälan." }`.
- `GET /api/rsvps` — (optional, simple) list submissions for the couple.
- Handle CORS for local dev; keep secrets/config in `.env`.
- Type everything (shared `Rsvp` type between client and server if easy).

---

## Acceptance criteria
- One smooth-scrolling page, Swedish throughout, mobile-first responsive.
- Uses the exact color tokens and the serif/Didot typographic feel above.
- Hero uses the sunset image; gallery/story use the `IMG_*` photos.
- RSVP form works end-to-end against the Node/TS endpoint with validation.
- Clean, well-typed React + TypeScript code with the fonts/colors centralized so
  they're easy to swap.
