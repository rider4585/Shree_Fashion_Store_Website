# Shree Fashion Store — Style, UI & Color Guidelines

Version: 1.0 · 2026-09-19 · Live reference: `src/pages/index.astro` + `src/styles/global.css` (this repo is the canonical source of the current look).

This document records every theme/style/UI decision made so far so the **main website build** can follow it.

---

## 1. Brand overview

- **Name:** Shree Fashion Store
- **Tagline:** "Wear It. Rent It. Own It."
- **Eyebrow / hero kicker:** "Where tradition meets fashion"
- **Positioning:** a retail **& rental** fashion house, ethnic and contemporary looks for every occasion, "opening soon".
- **Founder:** `@shravanibugge` (footer credit + instagram.com/shravanibugge)
- **Permanent contact constants (single source of truth — `index.astro` frontmatter):**
  - Instagram: `https://instagram.com/shree_fashionstore31` / handle `@shree_fashionstore31`
  - WhatsApp: `https://wa.me/917030769731` / label `+91 70307 69731`
  - Maps deep link: `https://maps.app.goo.gl/cBdFCyQHZtkj7y9f8`

## 2. Design principles

1. **Dark luxe.** Near-black warm base, rose-gold accents, subtle grain, layered soft shadows, glassy cards with backdrop blur. Never light-mode, never harsh shadows.
2. **Preserve the look.** The current landing page is the approved visual spec. Do not redesign or restyle; extend consistently.
3. **Mobile-first responsive.** Every component must work down to ~360px; use `sm:`/`lg:` upward, and `max-[360px]:` for last-resort narrow-phone tweaks.
4. **Reduced motion is a requirement, not a nicety.** All animation must respect `prefers-reduced-motion: reduce` (see §10).
5. **UI conventions (from the original app spec — apply to new pages):**
   - shadcn/ui components, `new-york`, neutral style, rounded-2xl surfaces.
   - **No nested cards, no drop shadows** — elevation comes from `shadow-layered` borders/glow only.
   - `cursor-pointer` on every clickable.
   - Loading = `loader2` spinner (spinning class), **not** skeletons.
   - Toasts via **sonner** (if a JS UI is ever added).
   - Framer-motion style entrances — ported here to pure CSS, no JS.
   - Type with `Id<"Table">` / `Doc<"Table">` only if a backend (e.g. Convex) is reintroduced; the current site is static.
6. **Performance stance:** no client JS on the landing page; images via Astro `astro:assets` (avif/webp/png); zero-JS motion.

## 3. Color system

All colors are oklch tokens (Tailwind v4 `@theme inline`) in `:root` + `.dark` (site is dark-only; both blocks are identical). Foreground/background are handled by semantic tokens, **not** raw hex, except the brand ramp.

| Token | Value | Role |
|---|---|---|
| `background` | `oklch(0.16 0.008 45)` #0D0B09 (approx) | page base, warm near-black |
| `foreground` | `oklch(0.93 0.012 60)` | primary text, warm ivory |
| `card` / `popover` | `oklch(0.2 0.01 45)` | card surfaces (used at 60% + blur on glass) |
| `primary` | `oklch(0.78 0.09 55)` | brand lotus gold |
| `secondary` | `oklch(0.25 0.012 50)` | icon tile backgrounds |
| `muted` / `secondary` | `oklch(0.25 0.012 50)` | |
| `muted-foreground` | `oklch(0.66 0.02 60)` | secondary/helper text, small labels |
| `accent` | `oklch(0.72 0.1 50)` | rose-gold accent — links, kicker, icons, focus |
| `accent-foreground` | `oklch(0.16 0.01 45)` | text on accent fill |
| `destructive` | `oklch(0.63 0.2 25)` | errors only |
| `border` | `oklch(1 0 0 / 9%)` | hairline borders |
| `input` | `oklch(1 0 0 / 12%)` | form borders/bg |
| `ring` | `oklch(0.72 0.1 50)` | focus rings |
| `sidebar*` | mirror card/muted/accent | sidebar surfaces (if reintroduced) |
| `chart-1..5` | gold + teal + green + amber + brown | data viz only |

### Brand gold ramp (hex, from the lotus logo) — `--brand-gold-1..3`
- `#f5e2d0` (champagne) · `#e3a98b` (rose gold mid) · `#c97e5e` (deep copper)

### Usage rules
- **Gradient text** (`text-goldgrad`): `linear-gradient(100deg, #f5e2d0 5%, #e3a98b 55%, #c97e5e 95%)` with background-clip:text + transparent color. Use for brand-critical words only (hero "Store", "Rent It. Own It."). Do not make entire paragraphs gradient.
- **Ambient glows:** radial blobs of `accent` at 10–20% opacity, `blur-3xl`, positioned top-center and bottom-left (see `index.astro` lines 56–60).
- **Grain overlay:** `.bg-grain` — white dots at 5% alpha, 22px grid, opacity-50 over the page.
- **theme-color / webmanifest:** `#0D0B09` (matches page bg).
- **Contrast rule:** text on dark must be `foreground` / `muted-foreground` / `accent` tokens — never pure white to avoid a washed-out look.

## 4. Typography

Loaded from Google Fonts (`index.astro` head): Fraunces (opsz 9..144, wght 300/400/500/600) + Inter (300/400/500/600/700).

| Utility | Font stack | Use |
|---|---|---|
| `font-sans` (default body) | `Inter, ui-sans-serif, system-ui, -apple-system, sans-serif` | body copy, labels, UI |
| `font-display` | `Fraunces, Georgia, "Times New Roman", serif` (+ `font-optical-sizing: auto`) | kicker, tagline, countdown numerals, section display headings |
| `font-times` | `"Times New Roman", Times, serif` | **Hero brand name only** ("Shree Fashion Store") |

### The hero heading (current decision, 2026-09-19)
- "Shree Fashion Store" renders in **Times New Roman** via `font-times` (a CSS variant of the Fraunces display style).
- **Size ladder (larger than Fraunces because TNR runs small):** `text-6xl` (60px) → `sm:text-7xl` (72px) → `lg:text-8xl` (96px).
- Weight/leading: `font-light`, `leading-[1.05]`, `tracking-tight`.
- The word **"Store"** gets the gradient span: `text-goldgrad font-medium tracking-[0.01em]`.
- Everything else on the page keeps Fraunces (`font-display`). If the main site keeps this heading style, reuse `font-times` + this ladder.

### Type scale / details currently in use
- Kicker/eyebrow: `text-xs font-semibold uppercase tracking-[0.32em] text-accent`.
- Tagline: `font-display text-2xl sm:text-3xl font-light tracking-wide`, with a `text-goldgrad` span inside.
- Supporting copy: `text-base sm:text-lg leading-relaxed text-muted-foreground`.
- Small labels under countdown: `text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground`.
- Footer: `text-xs text-muted-foreground`, link `font-medium text-accent/90 hover:text-accent`.

## 5. Iconography & media

- **Lotus logo:** `src/assets/Shree_Logo_website.png` (crisp, pre-compressed). Rendered via Astro `Picture` (avif→webp→png) with `widths` + `sizes`; **keep `mix-blend-screen`, `w-auto`**, and `alt` text. Header size ~`h-9`, hero ~`h-36 sm:h-48`.
- **Inline SVG icons:** 24px viewBox, `stroke="currentColor"`, `stroke-width="2"`, round caps/joins (Lucide-style). Icon tiles = 44px rounded-xl, `bg-secondary text-accent`, hover fills `bg-accent text-accent-foreground`.
- **Favicon set** (integrated bundle): `public/` — `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180), `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`. Manifest: name "Shree Fashion Store", short_name "Shree Fashion", theme/background `#0D0B09`, display standalone, **relative icon src** (stays correct under any base path / custom domain).

## 6. Surfaces, borders, elevation

- **Radius:** `--radius: 1rem` (rounded-2xl for cards/cells, rounded-xl icon tiles).
- **Borders:** hairline `border border-foreground/8` on cards; strong accents via `hover:border-accent/40`.
- **Glass style (cards/cells):** `bg-card/60 backdrop-blur-sm border-foreground/8 rounded-2xl` + `shadow-layered`.
- **Elevation — the ONLY shadows allowed:**
  - `shadow-layered`: `inset 0 1px 0 rgb(255 255 255/0.04), 0 1px 2px rgb(0 0 0/0.4), 0 12px 32px -12px rgb(0 0 0/0.55)`
  - `shadow-layered-lg`: larger variant for popovers/dialogs.
- **No nested cards. No generic `shadow-md`/`shadow-lg`.** Hard shadows are banned — depth always comes from the layered recipe above.

## 7. Buttons & interactive elements

Current page has no filled CTA button (pill + link cards only). For future CTAs follow shadcn button conventions with these mappings:
- Primary = `bg-primary text-primary-foreground hover:bg-primary/90`.
- Ghost/outline on dark = border `foreground/8`, text `foreground`.
- Focus ring = `ring` color (`oklch(0.72 0.1 50)`), visible keyboard focus on all interactive elements (arrow-only cards keep `rel="noopener noreferrer"` on external links).

## 8. Components (reference patterns)

- **Status pill ("Opening Soon"):** `rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent backdrop-blur-sm`. **Narrow phones ≤360px:** text becomes `sr-only` and a 1.5px `bg-accent` dot is shown (`max-[360px]:` utilities) — this is the approved responsive pattern for the pill.
- **Link card:** 44px icon tile + title (`text-sm font-semibold`) + subtitle (`text-xs text-muted-foreground`) + chevron that nudges right and turns accent on hover; glass surface; `link-card` transform (hover `translateY(-3px)`, active `scale(0.98)`), border → `hover:border-accent/40`. Titles: "Instagram", "WhatsApp", "Find us on the map".
- **Countdown cell:** `min-w-[3.75rem] sm:min-w-[4.5rem] rounded-2xl border border-foreground/8 bg-card/60 px-3 sm:px-4 py-3 sm:py-4 backdrop-blur-sm shadow-layered`, numeral `font-display text-2xl sm:text-3xl font-light leading-none tabular-nums tracking-tight`, label underneath (`text-[10px] ... text-muted-foreground`). Caption below: `text-xs tracking-wide text-muted-foreground`.
- **Footer:** hairline `border-t border-foreground/8`, centered `text-xs`.

## 9. Countdown system (opening date)

- Driven by **one const** `OPENING_DATE` in `index.astro` frontmatter.
- `null` → placeholder dashes per cell + caption **"Launch date to be announced"** (current live state — date unconfirmed).
- Set to an ISO string (e.g. `"2026-12-31T00:00:00"`) → inline `define:vars` script ticks every 1s: days unpadded, hours/mins/secs `padStart(2,"0")`, stops at `0`; **no ticker / static when `prefers-reduced-motion: reduce`**.

## 10. Motion (CSS, zero JS — ported from framer-motion)

- **Entrance `fade-up`:** 0.7s `cubic-bezier(0.22, 1, 0.36, 1)` from `opacity 0, translateY(24px)`. Applied with staggered delays `.delay-0…6` (12ms steps: hero glow 0, kicker 1, h1 1, tagline 2, copy 2, countdown 3, cards 4).
- **`hero-pulse`:** one soft scale+opacity pulse (1.6s ease, 0.6s delay, once) on the lotus glow element.
- **Hover:** link cards lift 3px / tap scale 0.98; icon tile flips to accent fill; chevron slides + tints.
- **Reduced motion:** `fade-up` duration → 0.01ms; `hero-pulse` disabled.

## 11. Meta & SEO (landing page)

- `theme-color` `#0D0B09`; title "Shree Fashion Store — Wear It. Rent It. Own It."
- meta description + og:title/og:description set; `og:type` website. (No og:image yet — add the logo when the main site ships.)

## 12. Technical notes for the main build

- Stack: **Astro 5.x + Tailwind v4** (`@import "tailwindcss"`), no integrations, no client JS on landing.
- Keep `@theme inline` semantic token wiring; add tokens here, not raw values inline.
- Favicon/manifest links must use `{import.meta.env.BASE_URL + "file"}` (plain `{expr}text` in an Astro attribute drops the trailing text — concatenate inside the expression).
- Base path coupling: if a custom domain **CNAME is present** → `base` off (root-relative); otherwise set `base: "/Shree_Fashion_Store_Website"`. Manifest uses relative icon paths, so it survives either mode.

## 13. Decision log (recorded 2026-09-19)

| # | Decision | Status |
|---|---|---|
| 1 | Hero brand name → **Times New Roman** (`font-times`), enlarged ladder text-6xl/7xl/8xl | Applied |
| 2 | Favicon bundle (favicon.io) fully integrated under `public/` + branded webmanifest `#0D0B09` | Applied |
| 3 | Hero entrance load pulse on lotus glow | Applied |
| 4 | "Store" typography lift (gradient, font-medium, tracking [0.01em]) | Applied |
| 5 | Countdown UI driven by `OPENING_DATE` const (null = dashes) | Applied, date TBD |
| 6 | Pill → dot at ≤360px | Applied |
| 7 | Focus-ring enhancement (keyboard-visible) | **Declined** |
| 8 | Maps deep link (opens Maps app) | Applied |

---

_Keep this file updated in the same commit as any change to `src/styles/global.css` or the visual output of `src/pages/index.astro`._