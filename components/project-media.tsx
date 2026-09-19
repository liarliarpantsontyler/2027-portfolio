"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/content/projects";
import { OatsOverview } from "@/components/oats-overview";

export function ProjectMedia({ item, first }: { item: ProjectImage; first: boolean }) {
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
    if (!video || reduceMotion || item.kind !== "video" || !item.loop) return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [item.kind, item.loop, item.src, reduceMotion]);

  if (item.treatment === "overview") return <OatsOverview />;

  if (item.placeholder) {
    const ratio = `${item.width} / ${item.height}`;
    return (
      <div
        className={`story-media ${item.treatment} placeholder${item.inset ? " inset" : ""}${item.wash ? " wash" : ""}`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={item.alt}
      >
        <div className="story-placeholder-inner">
          <p className="story-placeholder-kicker">Media placeholder</p>
          {item.placeholderHint ? <p className="story-placeholder-hint">{item.placeholderHint}</p> : null}
          {item.kind === "video" ? (
            <p className="story-placeholder-type">Suggested: screen recording (.mp4)</p>
          ) : (
            <p className="story-placeholder-type">Suggested: screenshot (.webp)</p>
          )}
        </div>
      </div>
    );
  }

  const looping = item.kind === "video" && item.loop && !reduceMotion;
  const framed = item.treatment === "device" && item.kind === "video";

  const video = looping ? (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      width={item.width}
      height={item.height}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-label={item.alt}
    />
  ) : (
    <video
      width={item.width}
      height={item.height}
      poster={item.poster}
      controls
      playsInline
      preload="none"
      aria-label={item.alt}
    >
      <source src={item.src} type="video/mp4" />
    </video>
  );

  return (
    <div
      className={`story-media ${item.treatment}${item.inset ? " inset" : ""}${item.wash ? " wash" : ""}`}
    >
      {item.kind === "video" ? (
        framed ? <div className="device-frame">{video}</div> : video
      ) : (
        <img
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          loading={first ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}
