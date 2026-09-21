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
    if (!video || reduceMotion || tile.mediaKind !== "video") return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [reduceMotion, tile.mediaKind, tile.src]);

  if (tile.id === "klocky-cover") {
    return (
      <span
        className="klocky-home-cover"
        role="img"
        aria-label={tile.alt}
      >
        {reduceMotion ? (
          <img
            className="klocky-home-signal"
            src={tile.poster}
            width={tile.width}
            height={tile.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <video
            ref={videoRef}
            className="klocky-home-signal"
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
            aria-hidden="true"
          />
        )}
        <span className="klocky-home-phone" aria-hidden="true">
          <span className="klocky-home-screen">
            <img
              src="/home/klocky-collection.webp"
              width="390"
              height="3618"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="klocky-home-camera" />
        </span>
      </span>
    );
  }

  if (tile.id === "oontelligence-cover") {
    return (
      <span className="oontelligence-home-cover" role="img" aria-label={tile.alt}>
        {reduceMotion ? (
          <img
            src={tile.poster}
            width={tile.width}
            height={tile.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
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
            aria-hidden="true"
          />
        )}
      </span>
    );
  }

  if (tile.mediaKind === "video" && !reduceMotion) {
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

  const stillSrc =
    tile.mediaKind === "gif" && !reduceMotion
      ? tile.src
      : tile.poster || tile.src;

  return (
    <img
      src={stillSrc}
      width={tile.width}
      height={tile.height}
      alt={tile.alt}
      loading={tile.id === "teladoc-screens" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
