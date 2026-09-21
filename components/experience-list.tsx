"use client";

import { useEffect, useState } from "react";
import {
  experienceMetaLines,
  type ExperienceEntry,
} from "@/lib/experience-meta";

export function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  const [asOf, setAsOf] = useState<Date | null>(null);

  useEffect(() => {
    setAsOf(new Date());
  }, []);

  return (
    <div className="experience" style={{ marginTop: 36 }}>
      {entries.map((item) => {
        const paragraphs = Array.isArray(item.detail)
          ? item.detail
          : [item.detail];
        const meta = experienceMetaLines(item, asOf);
        return (
          <article key={`${item.role}-${item.company}`}>
            <h2>{item.role}</h2>
            <p className="company">{item.company}</p>
            {meta.map((line) => (
              <p className="experience-meta" key={line}>
                {line}
              </p>
            ))}
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </article>
        );
      })}
    </div>
  );
}
