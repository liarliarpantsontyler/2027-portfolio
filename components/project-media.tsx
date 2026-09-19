"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/content/projects";
import { OatsOverview } from "@/components/oats-overview";

export function ProjectMedia({ item, first }: { item: ProjectImage; first: boolean }) {
  const mediaRef = useRef<HTMLDivElement>(null);
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
    const root = mediaRef.current;
    if (!video || !root || reduceMotion || item.kind !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            video.muted = true;
            void video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [item.kind, item.src, reduceMotion]);

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
  const deviceAspect = `${item.width} / ${item.height}`;

  const video = looping ? (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      width={item.width}
      height={item.height}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={item.alt}
    />
  ) : (
    <video
      ref={videoRef}
      width={item.width}
      height={item.height}
      poster={item.poster}
      controls
      muted
      playsInline
      preload="metadata"
      aria-label={item.alt}
    >
      <source src={item.src} type="video/mp4" />
    </video>
  );

  return (
    <div
      ref={item.kind === "video" ? mediaRef : undefined}
      className={`story-media ${item.treatment}${item.inset ? " inset" : ""}${item.wash ? " wash" : ""}`}
    >
      {item.kind === "video" ? (
        framed ? (
          <div className="device-frame" style={{ aspectRatio: deviceAspect }}>
            {video}
          </div>
        ) : (
          video
        )
      ) : (
        <img
          src={item.src}
          srcSet={
            item.src2x ? `${item.src} 1x, ${item.src2x} 2x` : undefined
          }
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
