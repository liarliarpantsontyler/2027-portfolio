export type ExperienceMonth = {
  year: number;
  /** 1–12 */
  month: number;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  start: ExperienceMonth;
  end: ExperienceMonth | null;
  location?: string;
  detail: string | string[];
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatMonthYear({ year, month }: ExperienceMonth): string {
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

/** LinkedIn-style inclusive month span (Jun 2023 → Sep 2026 = 3 yrs 4 mos). */
export function inclusiveMonthSpan(
  start: ExperienceMonth,
  end: ExperienceMonth,
): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }
  return parts.join(" ");
}

function endPoint(
  entry: Pick<ExperienceEntry, "end">,
  asOf: Date,
): ExperienceMonth {
  if (entry.end) return entry.end;
  return { year: asOf.getFullYear(), month: asOf.getMonth() + 1 };
}

/** Meta lines under company (dates · tenure, then location). */
export function experienceMetaLines(
  entry: Pick<ExperienceEntry, "start" | "end" | "location">,
  asOf: Date | null,
): string[] {
  const endLabel = entry.end ? formatMonthYear(entry.end) : "Present";
  const range = `${formatMonthYear(entry.start)} – ${endLabel}`;

  const lines: string[] = [];
  if (entry.end || asOf) {
    const end = endPoint(entry, asOf ?? new Date());
    const duration = formatDuration(inclusiveMonthSpan(entry.start, end));
    lines.push(`${range} · ${duration}`);
  } else {
    lines.push(range);
  }

  if (entry.location) lines.push(entry.location);
  return lines;
}
