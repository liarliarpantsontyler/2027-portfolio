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

## Add a mini project

Mini projects appear as homepage tiles and open in the shared modal instead of getting a full case-study page.

1. Add the cover and modal media to `public/work/` (or `public/home/` for a homepage-specific cover).
2. Add one object to `homeTiles` in `content/home.ts` using `destination.type: "modal"`.
3. Fill in a unique `slug`, short `title` and `description`, and one or more `media` items. Each item needs `src`, dimensions, and useful alt text; videos use `mediaKind: "video"` and may include a `poster`.
4. Assign both `column` and `column3` so the tile has a deliberate position in either homepage layout.
5. Run `npm run build` before publishing.

The modal layout, close behavior, mobile presentation, and shareable `?project=slug` URL all come from the shared component. Do not create another modal component for an individual mini project.

```ts
{
  id: "project-slug",
  src: "/home/project-cover.webp",
  width: 1200,
  height: 900,
  alt: "Description of the homepage cover",
  label: "Project title",
  column: "left",
  column3: 1,
  destination: {
    type: "modal",
    project: {
      slug: "project-slug",
      title: "Project title",
      description: "A short explanation of the work.",
      media: [
        {
          src: "/work/project-detail.webp",
          width: 1600,
          height: 1200,
          alt: "Description of the project detail",
          caption: "Optional caption",
        },
      ],
    },
  },
}
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

This folder is its own repository. It does not touch the Humin repo. To publish:

```bash
git remote add origin git@github.com:liarliarpantsontyler/YOUR-REPO.git
git push -u origin main
```
