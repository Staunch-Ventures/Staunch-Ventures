/**
 * The Staunch mark, redrawn as vectors so it can take the Capital gold.
 *
 * Geometry is measured off public/Transparent Logo.png: nine bars per row,
 * widening left to right on a ~21.4px pitch, rows 56 tall. The full logo sets
 * the wordmark between the two rows; the symbol alone keeps that gap open.
 */
const BAR_X = [0, 21, 42, 64, 85, 107, 128, 150, 171];
const BAR_W = [2, 4, 7, 9, 11, 13, 15, 17, 20];
const ROW_H = 56;
const MARK_W = 191;
/** Top of the lower row. The gap between rows is where the wordmark sits. */
const LOWER_Y = 125;

/**
 * One row of bars. `grow` says which way the bars draw on (see CapitalFX):
 * the upper row grows up from its base, the lower row down from its top, so
 * both open outward from the wordmark between them.
 */
function BarRow({ y, grow, className }: { y: number; grow: "up" | "down"; className: string }) {
  return (
    <g data-grow={grow}>
      {BAR_X.map((x, i) => (
        <rect
          key={x}
          className={className}
          x={x}
          y={y}
          width={BAR_W[i]}
          height={ROW_H}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </g>
  );
}

/** The full logo: bars, wordmark, bars. Used by the preloader and the seal. */
export function CapitalLogo({ className, title = "Staunch Capital" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 584 181" role="img" aria-label={title}>
      <g transform={`translate(${(584 - MARK_W) / 2} 0)`} fill="var(--gold)">
        <BarRow y={0} grow="up" className="logo-bar" />
        <BarRow y={LOWER_Y} grow="down" className="logo-bar" />
      </g>
      {/* textLength pins the wordmark to the original's measure, so the lockup
          keeps its proportions whatever the fallback font does. */}
      <text
        x="292"
        y="107"
        textAnchor="middle"
        textLength="581"
        lengthAdjust="spacing"
        fill="var(--text)"
        style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 48 }}
      >
        STAUNCH CAPITAL
      </text>
    </svg>
  );
}

/** Nav-scale lockup: the symbol beside the wordmark, readable at 20px. */
export function CapitalLockup() {
  return (
    <span className="lockup">
      <svg className="lockup__mark" viewBox="0 0 191 181" aria-hidden="true">
        <g fill="var(--gold)">
          <BarRow y={0} grow="up" className="logo-bar" />
          <BarRow y={LOWER_Y} grow="down" className="logo-bar" />
        </g>
      </svg>
      <span className="lockup__word">Staunch Capital</span>
    </span>
  );
}

/**
 * The symbol at ground scale — the hero's mark and the faint recurring
 * grounds. Hairline bars that draw on, shimmer in a slow wave, and drift with
 * the pointer (all driven from CapitalFX / CSS).
 */
export function BarSymbol({ id }: { id?: string }) {
  return (
    <svg id={id} viewBox="-4 -4 199 189" aria-hidden="true">
      <BarRow y={0} grow="up" className="bar" />
      <BarRow y={LOWER_Y} grow="down" className="bar" />
    </svg>
  );
}

export function BarGhost({
  placement,
  depth = 0.1,
}: {
  placement: "upper-right" | "left" | "seal";
  depth?: number;
}) {
  return (
    <div
      className={`bar-ghost bar-ghost--${placement}`}
      aria-hidden="true"
      data-bar-ghost
      data-depth={depth}
    >
      <BarSymbol />
    </div>
  );
}
