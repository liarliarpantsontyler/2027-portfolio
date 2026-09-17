const screens = [
  ["oats-flavor-builder", 579, 1032],
  ["ratings-notes-ui", 579, 1032],
  ["oats-dashboard", 579, 1092],
  ["oats-protein-coffee", 579, 1032],
  ["oats-referrals", 579, 1032],
] as const;

export function OatsOverview() {
  return (
    <div
      className="oats-overview"
      role="img"
      aria-label="The Oats Overnight app: flavor selection, ratings, dashboard, Protein Coffee, and referrals"
    >
      {screens.map(([name, width, height]) => (
        <div className="overview-screen" key={name}>
          <img src={`/work/${name}.webp`} width={width} height={height} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
