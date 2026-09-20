"use client";

import { useEffect, useRef, useState } from "react";

/** Silent showcase media: no network or playback until motion is allowed and nearby. */
export function MotionVideo({
  src, poster, width, height, alt, paused = false,
}: {
  src: string;
  poster?: string;
  width: number;
  height: number;
  alt: string;
  paused?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionAllowed(!preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        preload.disconnect();
      }
    }, { rootMargin: "300px" });
    const playback = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15);
    }, { threshold: [0, 0.15] });
    preload.observe(root.current);
    playback.observe(root.current);
    return () => { preload.disconnect(); playback.disconnect(); };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let cancelled = false;
    if (visible && pageVisible && !paused && motionAllowed) {
      void element.play().catch(() => {
        if (!cancelled) setFailed(true);
      });
    } else {
      element.pause();
    }
    return () => { cancelled = true; element.pause(); };
  }, [visible, pageVisible, paused, motionAllowed, nearby, failed]);

  return (
    <div ref={root} className="motion-video" style={{ aspectRatio: `${width} / ${height}` }}>
      {motionAllowed && nearby && !failed ? (
        <video
          ref={video}
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={alt}
          onError={() => setFailed(true)}
        />
      ) : poster ? (
        <img src={poster} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
      ) : <span role="img" aria-label={alt} />}
    </div>
  );
}
