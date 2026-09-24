"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { HomeMedia } from "@/components/home-media";
import type {
  HomeModalTile,
  HomeTile,
  HomeTileLayout,
  HomeTileSize,
} from "@/content/home";

function TileLabel({ name }: { name: string }) {
  return (
    <span className="tile-label">
      <span className="tile-label-copy">
        <span className="tile-label-kicker">View</span>
        <span className="tile-label-name">{name}</span>
      </span>
      <svg
        className="tile-label-arrow"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function isModalTile(tile: HomeTile): tile is HomeModalTile {
  return tile.destination.type === "modal";
}

function tileMediaAspectRatio(tile: HomeTile): `${number} / ${number}` {
  return `${tile.width} / ${tile.height}`;
}

function defaultStageAspect(
  rowSize: HomeTileSize,
  layout: HomeTileLayout,
): `${number} / ${number}` {
  if (layout.stageAspect) return layout.stageAspect;
  if (rowSize === "compact" || rowSize === "solo") return "1 / 1";
  return "4 / 5";
}

function viewportStyle(layout: HomeTileLayout): CSSProperties {
  const viewport = layout.mediaViewport;
  if (!viewport) return {};
  return {
    ["--viewport-ratio" as string]: viewport.aspect,
    ["--viewport-position" as string]: viewport.position ?? "50% 50%",
    ...(viewport.fit ? { ["--viewport-fit" as string]: viewport.fit } : {}),
    ...(viewport.background
      ? { ["--viewport-background" as string]: viewport.background }
      : {}),
  };
}

export function HomeProjectTile({
  tile,
  layout,
  rowSize,
  onOpen,
}: {
  tile: HomeTile;
  layout: HomeTileLayout;
  rowSize: HomeTileSize;
  onOpen: (tile: HomeModalTile) => void;
}) {
  const stageAspect = defaultStageAspect(rowSize, layout);
  const mediaRatio = tileMediaAspectRatio(tile);
  const treatmentClass =
    layout.treatment === "framed" ? "home-tile--framed" : "home-tile--fullBleed";

  const mediaStyle: CSSProperties = {
    ["--stage-ratio" as string]: stageAspect,
    ...(tile.id !== "klocky-cover"
      ? { ["--media-ratio" as string]: mediaRatio }
      : {}),
    ...(layout.mediaScale != null
      ? { ["--media-scale" as string]: String(layout.mediaScale) }
      : {}),
    ...viewportStyle(layout),
    ...(tile.background && layout.treatment === "fullBleed"
      ? { background: tile.background }
      : {}),
  };

  const mediaClasses = [
    "work-tile-media",
    tile.id === "klocky-cover" ? " klocky-tile-media" : "",
    tile.id === "vizzy-cover" ? " vizzy-tile-media" : "",
    tile.id === "retail-bottles-cover" ? " retail-tile-media" : "",
    tile.id === "just-for-fun" ? " just-for-fun-tile-media" : "",
    tile.wash ? " wash" : "",
    layout.treatment === "fullBleed" && tile.fit === "cover" ? " fit-cover" : "",
    layout.mediaViewport ? " has-media-viewport" : "",
    layout.mediaViewport?.fit === "contain" ? " viewport-fit-contain" : "",
    layout.mediaViewport?.fit === "cover" ||
    (layout.mediaViewport && layout.mediaViewport.fit !== "contain")
      ? " viewport-fit-cover"
      : "",
    tile.fit === "cover" && layout.mediaViewport ? " viewport-cover" : "",
  ].join("");

  const inner = (
    <>
      <span className={mediaClasses} style={mediaStyle}>
        <HomeMedia tile={tile} layout={layout} />
      </span>
      {tile.label ? <TileLabel name={tile.label} /> : null}
    </>
  );

  const style = { ["--order" as string]: tile.rank };

  const className = `work-tile ${treatmentClass}`;

  if (isModalTile(tile)) {
    return (
      <button
        className={className}
        type="button"
        aria-label={tile.label || tile.alt}
        style={style}
        onClick={() => onOpen(tile)}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      className={className}
      href={tile.destination.href}
      aria-label={tile.label || tile.alt}
      style={style}
    >
      {inner}
    </Link>
  );
}
