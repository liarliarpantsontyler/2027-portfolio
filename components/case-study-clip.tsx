"use client";

import { useState } from "react";
import type { ProjectImage } from "@/content/projects";
import { MotionVideo } from "@/components/motion-video";

/** Reuses viewport-aware playback and static posters for reduced-motion visitors. */
export function CaseStudyClip({ item }: { item: ProjectImage }) {
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);

  return (
    <div className="case-study-clip">
      <MotionVideo key={replay} src={item.src} poster={item.poster} width={item.width} height={item.height} alt={item.alt} paused={paused} />
      <div className="case-study-clip-controls" aria-label="Recording playback">
        <button type="button" onClick={() => setPaused(!paused)} aria-label={`${paused ? "Play" : "Pause"} ${item.title}`}>{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={() => { setPaused(false); setReplay(replay + 1); }} aria-label={`Replay ${item.title}`}>Replay ↻</button>
        <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} video`}>Open video ↗</a>
      </div>
    </div>
  );
}
