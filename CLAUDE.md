# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # local dev server at localhost:3000
npm run build        # Next.js production build
npm run opennext:build  # build Cloudflare Worker bundle (uses OpenNext adapter)
npm run deploy       # build + deploy to Cloudflare (runs opennextjs-cloudflare build && deploy)
npm run preview      # build + preview locally via Wrangler
```

There are no test or lint scripts defined. ESLint is available via `npx eslint`.

## Architecture

This is a **Next.js 16 App Router** site deployed as a **Cloudflare Worker** via the OpenNext adapter (`@opennextjs/cloudflare`). The build output is `standalone` (not `export`), required by the adapter.

### Routing

All pages use the App Router under `app/`:

| Route | File |
|-------|------|
| `/` | `app/page.tsx` |
| `/concerts` | `app/concerts/page.tsx` |
| `/concerts/[slug]` | `app/concerts/[slug]/page.tsx` |
| `/members/[semester]` | `app/members/[semester]/page.tsx` |
| `/live` | `app/live/page.tsx` |
| `/tickets` | `app/tickets/page.tsx` |

Dynamic routes use `generateStaticParams()` to pre-render all known slugs at build time.

### Content data layer

All site content is driven by files in `data/`:

- **`data/concerts.ts`** — array of `Concert` objects; the slug becomes the URL, and the order determines display order (newest first).
- **`data/members/<semester>.ts`** — one file per semester, each exporting a typed array. Must be registered manually in `app/members/[semester]/page.tsx` (`semesterData` map, `semesters` array, and import).
- **`data/live.ts`** — concert name, YouTube/Bilibili URLs, and a `schedule` with ISO-8601 start/end times. The `/live` page is a client component that computes `isLiveNow()` against those timestamps.

### Static media

All images, PDFs, and logos live under `public/media/`. Paths are referenced directly as strings in the data files. Convention:

```
public/media/concerts/<slug>/cover.jpg
public/media/concerts/<slug>/photos/01.jpg ...
public/media/concerts/<slug>/booklet/<name>.pdf
public/media/members/<semester>/<name>.jpg
```

### Key components

- `components/Navbar.tsx` — site-wide navigation; edit the `links` array to add/remove nav items.
- `components/Footer.tsx` — social links and contact email.
- `components/HeroSection.tsx` — home page hero.
- `components/BookletViewer.tsx` — renders PDF booklets on the concert detail page (used when `concert.booklet` is set).

### Deployment

Deployed to Cloudflare via `npm run deploy`. The Cloudflare dashboard build command must be `npm run deploy` (not split into separate build/deploy steps — see `CLOUDFLARE_BUILD_SETTINGS.md`). Wrangler config is in `wrangler.jsonc`; the worker name must remain `pennenchord-website`.
