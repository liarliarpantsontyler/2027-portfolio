"use client";

import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type RefObject,
} from "react";
import type { HomeTile } from "@/content/home";

function homeTileImagePriority(rank: number): Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  "loading" | "fetchPriority"
> {
  if (rank === 1) return { loading: "eager", fetchPriority: "high" };
  if (rank <= 4) return { loading: "eager" };
  return { loading: "lazy" };
}

function useDeferredTileMedia() {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(preference.matches);
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
    const root = rootRef.current;
    if (!root) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15);
      },
      { threshold: [0, 0.15] },
    );

    preloadObserver.observe(root);
    playbackObserver.observe(root);
    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  return {
    rootRef,
    reduceMotion,
    nearby,
    visible,
    pageVisible,
    videoFailed,
    setVideoFailed,
  };
}

function useAutoplayWhenVisible(
  videoRef: RefObject<HTMLVideoElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    let cancelled = false;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => {
        if (!cancelled) {
          /* keep poster fallback via onError on element */
        }
      });
    };

    play();
    video.addEventListener("canplay", play);
    return () => {
      cancelled = true;
      video.removeEventListener("canplay", play);
      video.pause();
    };
  }, [videoRef, active]);
}

type DeferredVideoProps = {
  className?: string;
  src: string;
  poster?: string;
  width: number;
  height: number;
  ariaLabel?: string;
  ariaHidden?: boolean;
  shouldPlay: boolean;
  onFailed: () => void;
};

function DeferredAutoplayVideo({
  className,
  src,
  poster,
  width,
  height,
  ariaLabel,
  ariaHidden,
  shouldPlay,
  onFailed,
}: DeferredVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayWhenVisible(videoRef, shouldPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) return;
    video.pause();
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={ariaHidden ? undefined : ariaLabel}
      aria-hidden={ariaHidden ? true : undefined}
      onError={onFailed}
    />
  );
}

function PosterImg({
  src,
  width,
  height,
  alt,
  className,
  rank,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  rank: number;
}) {
  const priority = homeTileImagePriority(rank);
  return (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      decoding="async"
      {...priority}
    />
  );
}

export function HomeMedia({ tile }: { tile: HomeTile }) {
  const {
    rootRef,
    reduceMotion,
    nearby,
    visible,
    pageVisible,
    videoFailed,
    setVideoFailed,
  } = useDeferredTileMedia();

  const rank = tile.rank;
  const motionAllowed = !reduceMotion;
  const loadMotion = motionAllowed && nearby && !videoFailed;
  const shouldPlayVideo = loadMotion && visible && pageVisible;

  const signalPoster = tile.poster || tile.src;

  if (tile.id === "klocky-cover") {
    const collectionPriority = homeTileImagePriority(rank);
    return (
      <span
        ref={rootRef}
        className="klocky-home-cover"
        role="img"
        aria-label={tile.alt}
      >
        {loadMotion ? (
          <DeferredAutoplayVideo
            className="klocky-home-signal"
            src={tile.src}
            poster={tile.poster}
            width={tile.width}
            height={tile.height}
            ariaHidden
            shouldPlay={shouldPlayVideo}
            onFailed={() => setVideoFailed(true)}
          />
        ) : (
          <PosterImg
            className="klocky-home-signal"
            src={signalPoster}
            width={tile.width}
            height={tile.height}
            alt=""
            rank={rank}
          />
        )}
        <span className="klocky-home-phone" aria-hidden="true">
          <span className="klocky-home-screen">
            <img
              src="/home/klocky-collection.webp"
              width="390"
              height="3618"
              alt=""
              decoding="async"
              {...collectionPriority}
            />
          </span>
          <span className="klocky-home-camera" />
        </span>
      </span>
    );
  }

  if (tile.id === "oontelligence-cover") {
    return (
      <span ref={rootRef} className="oontelligence-home-cover" role="img" aria-label={tile.alt}>
        {loadMotion ? (
          <DeferredAutoplayVideo
            src={tile.src}
            poster={tile.poster}
            width={tile.width}
            height={tile.height}
            ariaHidden
            shouldPlay={shouldPlayVideo}
            onFailed={() => setVideoFailed(true)}
          />
        ) : (
          <PosterImg
            src={signalPoster}
            width={tile.width}
            height={tile.height}
            alt=""
            rank={rank}
          />
        )}
      </span>
    );
  }

  if (tile.mediaKind === "video") {
    return (
      <span ref={rootRef} className="home-media-observe">
        {loadMotion ? (
          <DeferredAutoplayVideo
            src={tile.src}
            poster={tile.poster}
            width={tile.width}
            height={tile.height}
            ariaLabel={tile.alt}
            shouldPlay={shouldPlayVideo}
            onFailed={() => setVideoFailed(true)}
          />
        ) : (
          <PosterImg
            src={signalPoster}
            width={tile.width}
            height={tile.height}
            alt={tile.alt}
            rank={rank}
          />
        )}
      </span>
    );
  }

  const gifActive = tile.mediaKind === "gif" && motionAllowed && nearby;
  const stillSrc =
    tile.mediaKind === "gif"
      ? gifActive
        ? tile.src
        : tile.poster || tile.src
      : tile.poster || tile.src;

  return (
    <span ref={rootRef} className="home-media-observe">
      <PosterImg
        src={stillSrc}
        width={tile.width}
        height={tile.height}
        alt={tile.alt}
        rank={rank}
      />
    </span>
  );
}
