"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function formatNow() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatNow());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rail-clock" aria-label={`Local time in ${site.location}`}>
      <span suppressHydrationWarning>{time || "—"}</span>
      <span>/ {site.location}</span>
    </div>
  );
}
