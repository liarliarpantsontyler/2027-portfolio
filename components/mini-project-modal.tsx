"use client";

import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import type { MiniProject, MiniProjectMedia } from "@/content/home";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkArrowIcon() {
  return (
    <svg className="mini-project-link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModalMedia({
  item,
  reduceMotion,
  hideCaption = false,
}: {
  item: MiniProjectMedia;
  reduceMotion: boolean;
  hideCaption?: boolean;
}) {
  const isVideo = item.mediaKind === "video";
  const mediaBackground = item.background;
  const figureStyle = mediaBackground ? { backgroundColor: mediaBackground } : undefined;
  const videoStyle = mediaBackground ? { backgroundColor: mediaBackground } : undefined;

  return (
    <figure
      className={`mini-project-figure${mediaBackground ? " has-media-background" : ""}`}
      style={figureStyle}
    >
      {isVideo && (!reduceMotion || !item.poster) ? (
        <video
          src={item.src}
          poster={item.poster}
          width={item.width}
          height={item.height}
          style={videoStyle}
          autoPlay={!reduceMotion}
          muted
          loop={!reduceMotion}
          playsInline
          controls={reduceMotion}
          preload={reduceMotion ? "metadata" : "auto"}
          disablePictureInPicture={!reduceMotion}
          aria-label={item.alt}
        />
      ) : (
        <img
          src={item.poster || item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />
      )}
      {item.caption && !hideCaption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  );
}

export type MiniProjectModalHandle = {
  show: () => void;
};

export const MiniProjectModal = forwardRef<
  MiniProjectModalHandle,
  {
    project: MiniProject | null;
    onRequestClose: () => void;
  }
>(function MiniProjectModal({ project, onRequestClose }, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setSlideIndex(0);
  }, [project?.slug]);

  useEffect(() => {
    if (!project || project.media.length < 2) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSlideIndex((index) => Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSlideIndex((index) => Math.min(project.media.length - 1, index + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project]);

  useImperativeHandle(ref, () => ({
    show: () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;

      returnFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.classList.add("mini-project-open");
      dialog.showModal();
    },
  }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!returnFocusRef.current) {
        returnFocusRef.current = document.activeElement as HTMLElement | null;
      }
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("mini-project-open");
      return;
    }

    if (dialog.open) dialog.close();
    document.body.classList.remove("mini-project-open");
    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  }, [project]);

  useEffect(
    () => () => {
      document.body.classList.remove("mini-project-open");
    },
    [],
  );

  const activeMedia = project
    ? project.media.length === 1
      ? project.media[0]
      : project.media[slideIndex]
    : null;
  const stageBackground = activeMedia?.background ?? "#000";

  return (
    <dialog
      ref={dialogRef}
      className="mini-project-modal"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onRequestClose();
      }}
    >
      {project ? (
        <div className="mini-project-shell">
          <div className="mini-project-content">
            <div className="mini-project-stage" style={{ background: stageBackground }}>
              <div
                className={`mini-project-media${project.media.length === 1 ? " single" : " carousel"}${
                  activeMedia?.background ? " has-media-background" : ""
                }`}
                {...(project.media.length > 1
                  ? {
                      role: "region",
                      "aria-roledescription": "carousel",
                      "aria-label": "Project media",
                    }
                  : {})}
              >
                {project.media.length === 1 ? (
                  <ModalMedia item={project.media[0]} reduceMotion={reduceMotion} />
                ) : (
                  <div
                    className={`mini-project-carousel-viewport${
                      project.media[slideIndex].background ? " has-media-background" : ""
                    }`}
                    style={{ background: stageBackground }}
                  >
                    <ModalMedia
                      key={project.media[slideIndex].src}
                      item={project.media[slideIndex]}
                      reduceMotion={reduceMotion}
                      hideCaption
                    />
                  </div>
                )}
              </div>
            </div>
            {project.media.length > 1 ? (
              <div className="mini-project-carousel-controls">
                <button
                  type="button"
                  className="mini-project-carousel-nav"
                  aria-label="Previous slide"
                  disabled={slideIndex === 0}
                  onClick={() => setSlideIndex((index) => Math.max(0, index - 1))}
                >
                  <ChevronIcon direction="left" />
                </button>
                <div className="mini-project-carousel-dots" role="tablist" aria-label="Choose slide">
                  {project.media.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      role="tab"
                      className="mini-project-carousel-dot"
                      aria-selected={index === slideIndex}
                      aria-label={`Slide ${index + 1} of ${project.media.length}`}
                      onClick={() => setSlideIndex(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="mini-project-carousel-nav"
                  aria-label="Next slide"
                  disabled={slideIndex === project.media.length - 1}
                  onClick={() =>
                    setSlideIndex((index) => Math.min(project.media.length - 1, index + 1))
                  }
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            ) : null}
            <div className="mini-project-copy">
              <h2 id={titleId}>{project.title}</h2>
              <p id={descriptionId}>{project.description}</p>
              {project.projectUrl ? (
                <a
                  className="mini-project-link"
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.projectUrlLabel || "View project"}
                  <LinkArrowIcon />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
});
