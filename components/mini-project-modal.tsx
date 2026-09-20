"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { MiniProject, MiniProjectMedia } from "@/content/home";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5l14 14M19 5 5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ModalMedia({ item, reduceMotion }: { item: MiniProjectMedia; reduceMotion: boolean }) {
  const isVideo = item.mediaKind === "video";

  return (
    <figure className="mini-project-figure">
      {isVideo && (!reduceMotion || !item.poster) ? (
        <video
          src={item.src}
          poster={item.poster}
          width={item.width}
          height={item.height}
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
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  );
}

export function MiniProjectModal({
  project,
  onRequestClose,
}: {
  project: MiniProject | null;
  onRequestClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
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
          <div className="mini-project-close-row">
            <button
              className="mini-project-close"
              type="button"
              onClick={onRequestClose}
              aria-label="Close project"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mini-project-content">
            <div className={`mini-project-media${project.media.length === 1 ? " single" : ""}`}>
              {project.media.map((item, index) => (
                <ModalMedia key={`${item.src}-${index}`} item={item} reduceMotion={reduceMotion} />
              ))}
            </div>
            <div className="mini-project-copy">
              <h2 id={titleId}>{project.title}</h2>
              <p id={descriptionId}>{project.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
