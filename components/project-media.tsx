"use client";

import type { ProjectImage } from "@/content/projects";
import { site } from "@/content/site";
import { MotionVideo } from "@/components/motion-video";
import { OatsOverview } from "@/components/oats-overview";

const PUBLIC_PLACEHOLDER_BACKDROP = "/work/creativeos-wide-poster.webp";
const PUBLIC_PLACEHOLDER_ARIA =
  "Visuals in progress. Case study screenshots are not published yet. A full product demo is available on request.";

export function ProjectMedia({ item, first }: { item: ProjectImage; first: boolean }) {
  if (item.treatment === "overview") return <OatsOverview />;

  if (item.placeholder) {
    const ratio = `${item.width} / ${item.height}`;
    const className = `story-media ${item.treatment} placeholder${item.placeholderPublic ? " public" : ""}${item.inset ? " inset" : ""}${item.wash ? " wash" : ""}`;

    if (item.placeholderPublic) {
      const backdrop = item.poster ?? PUBLIC_PLACEHOLDER_BACKDROP;
      return (
        <div className={className} style={{ aspectRatio: ratio }} role="img" aria-label={PUBLIC_PLACEHOLDER_ARIA}>
          <img
            className="story-placeholder-backdrop"
            src={backdrop}
            alt=""
            aria-hidden="true"
            width={item.width}
            height={item.height}
            decoding="async"
          />
          <div className="story-placeholder-scrim" aria-hidden="true" />
          <div className="story-placeholder-public">
            <p className="story-placeholder-public-kicker">Visuals in progress</p>
            <p className="story-placeholder-public-body">
              These screens aren&apos;t published yet. A full walkthrough of the product is available on request.
            </p>
            <a className="story-placeholder-public-link" href={site.links.email}>
              Request a demo
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={className} style={{ aspectRatio: ratio }} role="img" aria-label={item.alt}>
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

  const framed =
    item.treatment === "device" && (item.kind === "video" || item.orientation === "portrait");
  const deviceAspect = `${item.width} / ${item.height}`;

  const video = item.loop ? (
    <MotionVideo key={item.src} src={item.src} poster={item.poster} width={item.width} height={item.height} alt={item.alt} />
  ) : (
    <video
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
      className={`story-media ${item.treatment}${item.orientation ? ` ${item.orientation}` : ""}${item.inset ? " inset" : ""}${item.wash ? " wash" : ""}`}
    >
      {item.kind === "video" ? (
        framed ? (
          <div
            className={`device-frame${item.orientation ? ` ${item.orientation}` : ""}`}
            style={{ aspectRatio: deviceAspect }}
          >
            {video}
          </div>
        ) : (
          video
        )
      ) : framed ? (
        <div
          className={`device-frame${item.orientation ? ` ${item.orientation}` : ""}`}
          style={{ aspectRatio: deviceAspect }}
        >
          <img
            src={item.src}
            srcSet={item.src2x ? `${item.src} 1x, ${item.src2x} 2x` : undefined}
            width={item.width}
            height={item.height}
            alt={item.alt}
            loading={first ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
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
