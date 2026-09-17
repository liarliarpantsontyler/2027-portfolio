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

Production build:

```bash
npm run build
```

The build writes a static site to `out/`. Netlify publish directory is already set in `netlify.toml`.

## Add or update a project

1. Drop images or posters in `public/work/`. Prefer WebP for stills and H.264 MP4 for motion.
2. Add or edit an object in `content/projects.ts`.
3. If it should appear on the homepage, add a tile in `content/home.ts`.

`content/site.ts` holds name, bio, experience, and links.

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
