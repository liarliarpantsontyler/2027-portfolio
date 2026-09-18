"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeMedia } from "@/components/home-media";
import { homeTiles, type HomeTile } from "@/content/home";

const STORAGE_KEY = "home-grid-cols";

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
      <span className={`work-tile-media${tile.wash ? " wash" : ""}${tile.lined ? " lined" : ""}`}>
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

function ColumnsIcon({ count }: { count: 2 | 3 }) {
  const bars = count === 2 ? [5, 13] : [3.5, 10, 16.5];
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      {bars.map((x) => (
        <rect key={x} x={x} y="4" width="5.5" height="16" rx="1" fill="currentColor" />
      ))}
    </svg>
  );
}

function splitTiles(count: 2 | 3) {
  if (count === 2) {
    return [
      homeTiles.filter((tile) => tile.column === "left"),
      homeTiles.filter((tile) => tile.column === "right"),
    ];
  }

  return [1, 2, 3].map((lane) => homeTiles.filter((tile) => tile.column3 === lane));
}

export function ProjectGrid() {
  const [cols, setCols] = useState<2 | 3>(2);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "3") setCols(3);
  }, []);

  const setLayout = (next: 2 | 3) => {
    setCols(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  };

  return (
    <>
      <div className={`work-grid cols-${cols}`}>
        {splitTiles(cols).map((column, columnIndex) => (
          <div className="work-column" key={columnIndex}>
            {column.map((tile) => (
              <Tile
                key={tile.id}
                tile={tile}
                order={homeTiles.findIndex((item) => item.id === tile.id)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="grid-switch" role="group" aria-label="Project layout">
        <button
          type="button"
          aria-pressed={cols === 2}
          aria-label="Two columns"
          onClick={() => setLayout(2)}
        >
          <ColumnsIcon count={2} />
        </button>
        <button
          type="button"
          aria-pressed={cols === 3}
          aria-label="Three columns"
          onClick={() => setLayout(3)}
        >
          <ColumnsIcon count={3} />
        </button>
      </div>
    </>
  );
}
