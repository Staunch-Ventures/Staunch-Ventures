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
/** Top of the lower row. The gap between rows is where the wordmark sits in the full logo. */
const LOWER_Y = 125;

/** One row of the nine bars. */
function BarRow({ y, className }: { y: number; className: string }) {
  return (
    <g>
      {BAR_X.map((x, i) => (
        <rect
          key={x}
          className={className}
          x={x}
          y={y}
          width={BAR_W[i]}
          height={ROW_H}
        />
      ))}
    </g>
  );
}

/** The bar symbol alone, solid. Used by the Capital cards on the home and invest pages. */
export function BarMark({ className, fill = "var(--gold)" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 191 181" aria-hidden="true">
      <g fill={fill}>
        <BarRow y={0} className="logo-bar" />
        <BarRow y={LOWER_Y} className="logo-bar" />
      </g>
    </svg>
  );
}
