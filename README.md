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

1. **Homepage cover** — `public/home/` (MP4 + WebP poster). Set tile `width` / `height` to the real aspect ratio (e.g. 1920×1080 landscape, 1080×1440 portrait). The grid uses that ratio for the tile shape.
2. **Modal media** — `public/work/<project>/`. Prefer H.264 MP4 for demos and WebP for stills. Export a poster frame for each video.
3. **Copy the template** from `content/mini-project.template.ts` into `homeTiles`. Use a unique `slug` (used in `/?project=slug`).
4. **Grid position** — set both `column` (`"left"` \| `"right"`) and `column3` (`1` \| `2` \| `3`).
5. **Optional link** — `projectUrl` + `projectUrlLabel` (curved arrow, opens in new tab).
6. **Carousel** — two or more `media` items; arrows and dots render on white under the media. Captions on carousel slides are hidden in the modal (use description or single-slide captions if needed).
7. **`npm run build`** before publish.

### Transcode a cover from `.mov`

```bash
ffmpeg -i ~/Downloads/your-demo.mov -an -vf "scale=1920:-2" -c:v libx264 -pix_fmt yuv420p -crf 23 -movflags +faststart public/home/your-project-cover.mp4
ffmpeg -ss 1 -i public/home/your-project-cover.mp4 -frames:v 1 -q:v 2 public/home/your-project-cover-poster.webp
```

### Modal behavior (fixed — match Vizzy)

- ~960×880 modal, media full width on black
- Video slides: `object-fit: contain`, top-aligned
- Image slides in carousel: `object-fit: cover`, top-aligned (full bleed like video)
- Carousel controls on **white**, between media and title
- Close: backdrop click, Escape, or browser back when opened via history

## Case study fields

Each project uses the same shape: headline, intro, outcomes, problem, approach, role, and a gallery. Gallery items can be full-width or `half`, and use `treatment` values:

- `overview` — Oats five-screen composition
- `device` — phone UI on a color field
- `edge` — full-bleed product frame
- `paper` — process / system work
- `photo` — photography
- `composition` — art-directed still

## Git

This folder is its own repository. It does not touch the Humin repo. To publish:

```bash
git remote add origin git@github.com:liarliarpantsontyler/YOUR-REPO.git
git push -u origin main
```
