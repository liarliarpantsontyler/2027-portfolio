# Tyler Hunter — portfolio

Personal site for [liarliarpantsontyler.com](https://www.liarliarpantsontyler.com). Editorial homepage, image-forward work grid, concise case studies.

## Stack

- Next.js App Router, static export
- TypeScript
- Custom CSS (no UI kit)
- Netlify (`out/`)

## Local

```bash
npm install
npm run dev
```

If the dev server shows **Cannot find module './NN.js'**, the `.next` cache is stale—usually because `npm run build` ran while `next dev` was still up. Stop dev, then:

```bash
npm run dev:clean
```

Production build (stop the dev server first—`prebuild` will refuse if port 3000 is in use):


```bash
npm run build
```

The build writes a static site to `out/`. Netlify publish directory is already set in `netlify.toml`.

## Add or update a project

1. Drop images or posters in `public/work/`. Prefer WebP for stills and H.264 MP4 for motion.
2. Add or edit an object in `content/projects.ts`.
3. If it should appear on the homepage, add a tile in `content/home.ts`.

`content/site.ts` holds name, bio, experience, and links.

## Full project page layout contract

Use this when adding or editing any `/work/[slug]/` case study (paste into Codex, Claude, Antigravity, etc. if needed).

- Shell: `SiteFrame` → `#main` → `.wrap` → **`.project-header`** (kicker is always the first child).
- Header spacing comes **only** from `.project-header` in `app/globals.css` (`padding: 28px 0 48px`). **Do not** add project-specific top/bottom padding or margin on the header, `.wrap`, or `#main`.
- **`presentation: "visual-first"`** (see Klocky) may use a dedicated story component for the body (e.g. `components/klocky-story.tsx`). Custom layout and styling belong there, in gallery treatments, or theme tokens—not in the header.
- `.klocky-header` is for typography and link color only, not layout offsets. Do not reintroduce per-project header padding classes.
- New visual-first projects: add `presentation: "visual-first"`, a story component, and content in `content/projects.ts`—same header markup as standard pages in `app/work/[slug]/page.tsx`.

## Add a mini project

Mini projects are homepage tiles that open in the **shared modal** (no `/work/[slug]` page). **Reference:** `vizzy-cover` in `content/home.ts`. **Copy-paste starter:** `content/mini-project.template.ts`.

### Template (do not fork the modal)

| Piece | Location |
| --- | --- |
| Tile + modal content | `content/home.ts` → `homeTiles` with `destination.type: "modal"` |
| Modal UI | `components/mini-project-modal.tsx` |
| Layout / carousel styling | `app/globals.css` → `.mini-project-*` |

One modal for all mini projects. Do not add a project-specific modal component.

### Checklist

1. **Homepage cover** — `public/home/` (MP4 + WebP poster, or a still). Set tile `width` / `height` to the real file dimensions. Wide stills use at least a **1:1** tile; do not leave grey letterbox bands—set tile `background` (edge sample from the import script) for UI/flat fields (`vizzy-cover`), or `fit: "cover"` for product photography (`retail-bottles-cover`).
2. **Modal media** — `public/work/<project>/`. Use **`node scripts/import-mini-project-media.mjs`** to copy files in (default: no re-encode). Chat attachments are ~1024px wide; drop full-res files in the repo or pass a disk path to the script.
3. **Copy the template** from `content/mini-project.template.ts` into `homeTiles`. Use a unique `slug` (used in `/?project=slug`). Paste `width`, `height`, and (for **portrait** stills only) `background` from the import script output.
4. **Grid position** — set both `column` (`"left"` \| `"right"`) and `column3` (`1` \| `2` \| `3`).
5. **Optional link** — `projectUrl` + `projectUrlLabel` (curved arrow, opens in new tab).
6. **Carousel** — two or more `media` items; arrows and dots render on white under the media. Captions on carousel slides are hidden in the modal (use description or single-slide captions if needed).
7. **`npm run build`** before publish.

### Media import (do not crush or crop in assets)

- **Copy, don’t recompress:** The script byte-copies by default. Optional `--webp` converts at quality **92** (same bar as Klocky posters). Do not run ad-hoc `cwebp -q 80` on portfolio art.
- **Per-slide metadata:** **Landscape** stills (`width >= height`) default to full-bleed (`cover`); no `background` needed. **Portrait** stills default to `contain` — set `background` from the import script. Override with `fit` when needed. **Videos** always use `contain` + optional `background` (e.g. Oontelligence screen recording).

### Transcode a cover from `.mov`

```bash
ffmpeg -i ~/Downloads/your-demo.mov -an -vf "scale=1920:-2" -c:v libx264 -pix_fmt yuv420p -crf 23 -movflags +faststart public/home/your-project-cover.mp4
ffmpeg -ss 1 -i public/home/your-project-cover.mp4 -frames:v 1 -q:v 2 public/home/your-project-cover-poster.webp
```

### Modal behavior (fixed — match Vizzy)

- ~960×880 modal
- **Landscape stills:** full-bleed (`cover`) on the stage
- **Portrait stills:** `contain` with matched `background` (or auto-sampled edge color if omitted)
- **Videos:** always `contain`; use `background` for screen recordings (Oontelligence unchanged)
- Carousel controls on **white**, between media and title
- Close: backdrop click, Escape, or browser back when opened via history

```bash
# Copy modal stills + print width/height/background for home.ts
node scripts/import-mini-project-media.mjs --out public/work/my-slug ~/Downloads/my-shots/*.jpg
# Optional WebP at q92 (only if you need WebP)
node scripts/import-mini-project-media.mjs --webp --out public/work/my-slug ./incoming/
```

## Case study fields

Each project uses the same shape: headline, intro, outcomes, problem, approach, role, and a gallery. Gallery items can be full-width or `half`, and use `treatment` values:

- `overview` — Oats five-screen composition
- `device` — phone UI on a color field
- `edge` — full-bleed product frame
- `paper` — process / system work
- `photo` — photography
- `composition` — art-directed still

## Git

- **Repo:** [github.com/liarliarpantsontyler/2027-portfolio](https://github.com/liarliarpantsontyler/2027-portfolio)
- **Default branch:** `main` (local). Day-to-day work happens on `main`, not long-lived `cursor/*` branches.
- **Remote:** `origin` → `https://github.com/liarliarpantsontyler/2027-portfolio.git`

This folder is its own repository. It does not touch the Humin repo.

### Publish changes

```bash
git push origin main
```

### One-time: sync `main` on GitHub (after renaming off `cursor/rebuild-personal-portfolio`)

If GitHub still uses the old Cursor default branch, run once (requires `gh auth login`):

```bash
chmod +x scripts/sync-main-to-github.sh
./scripts/sync-main-to-github.sh
```

Then in **Netlify** → **Build & deploy → Branches** → set **Production branch** to `main` and deploy.
