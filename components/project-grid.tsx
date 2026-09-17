import Link from "next/link";
import { HomeMedia } from "@/components/home-media";
import { homeTiles, type HomeTile } from "@/content/home";

function Tile({ tile, order }: { tile: HomeTile; order: number }) {
  const inner = (
    <>
      <HomeMedia tile={tile} />
      {tile.label ? <span className="tile-label">{tile.label}</span> : null}
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
