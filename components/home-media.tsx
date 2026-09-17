"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeTile } from "@/content/home";

export function HomeMedia({ tile }: { tile: HomeTile }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || tile.kind !== "video") return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [reduceMotion, tile.kind, tile.src]);

  if (tile.kind === "video" && !reduceMotion) {
    return (
      <video
        ref={videoRef}
        src={tile.src}
        poster={tile.poster}
        width={tile.width}
        height={tile.height}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
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
      loading={tile.id === "teladoc-screens" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
