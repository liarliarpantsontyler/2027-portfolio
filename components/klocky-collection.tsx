"use client";

import { useState } from "react";
import { MotionVideo } from "@/components/motion-video";

const clocks = [
  ["meridian", "Meridian"], ["fold", "Fold"], ["sunday", "Sunday"],
  ["lucent", "Lucent"], ["index", "Index"], ["quarters", "Quarters"],
] as const;

export function KlockyCollection() {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <div className="klocky-motion-controls">
        <button type="button" aria-controls="klocky-clock-collection" onClick={() => setPaused(!paused)}>
          {paused ? "Resume animations" : "Pause animations"}
        </button>
      </div>
      <div id="klocky-clock-collection" className="klocky-clock-grid" aria-label="Six Klocky clock designs">
        {clocks.map(([id, name]) => (
          <figure key={id}>
            <div className="klocky-still-frame">
              <MotionVideo src={`/work/klocky/${id}.mp4`} poster={`/work/klocky/${id}.webp`}
                width={2532} height={1170} alt={`${name} clock design in Klocky`} paused={paused} />
            </div>
            <figcaption>{name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
