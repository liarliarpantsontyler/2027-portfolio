import Link from "next/link";
import { HomeMedia } from "@/components/home-media";
import { homeTiles, type HomeTile } from "@/content/home";

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

function Tile({ tile, order }: { tile: HomeTile; order: number }) {
  const inner = (
    <>
      <span className="work-tile-media">
        <HomeMedia tile={tile} />
      </span>
      {tile.label ? <TileLabel name={tile.label} /> : null}
    </>
  );

  const style = { ["--order" as string]: order };

  if (!tile.href) {
    return (
      <div className="work-tile" style={style}>
        {inner}
      </div>
    );
  }

  return (
    <Link className="work-tile" href={tile.href} aria-label={tile.label || tile.alt} style={style}>
      {inner}
    </Link>
  );
}

export function ProjectGrid() {
  const left = homeTiles.filter((tile) => tile.column === "left");
  const right = homeTiles.filter((tile) => tile.column === "right");

  return (
    <>
      <div className="work-column">
        {left.map((tile, index) => (
          <Tile key={tile.id} tile={tile} order={index * 2} />
        ))}
      </div>
      <div className="work-column work-column-right">
        {right.map((tile, index) => (
          <Tile key={tile.id} tile={tile} order={index * 2 + 1} />
        ))}
      </div>
    </>
  );
}
