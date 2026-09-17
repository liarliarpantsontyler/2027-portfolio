"use client";

import { useEffect, useState } from "react";
import type { HomeTile } from "@/content/home";

export function HomeMedia({ tile }: { tile: HomeTile }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (tile.kind === "video" && !reduceMotion) {
    return (
      <video
        src={tile.src}
        poster={tile.poster}
        width={tile.width}
        height={tile.height}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={tile.alt}
      />
    );
  }

  return (
    <img
      src={tile.poster || tile.src}
      width={tile.width}
      height={tile.height}
      alt={tile.alt}
      loading={tile.column === "left" && tile.id === "coco-orb" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
