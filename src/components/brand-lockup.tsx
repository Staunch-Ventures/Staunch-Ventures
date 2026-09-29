/**
 * The Staunch logo as a nav-scale lockup: the bar mark, STAUNCH, and the arm
 * you're in. Both arm names are always rendered; which one shows is decided
 * by CSS from the nearest [data-site] (see LOGO LOCKUP in globals.css), so
 * the switch animates by itself when the route changes and server-rendered
 * pages like the footer need no props.
 *
 * Bar geometry is measured off public/Transparent Logo.png.
 */
const BAR_X = [0, 21, 42, 64, 85, 107, 128, 150, 171];
const BAR_W = [2, 4, 7, 9, 11, 13, 15, 17, 20];

function Letters({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((ch, i) => (
        <i key={i} style={{ "--i": i } as React.CSSProperties}>
          {ch}
        </i>
      ))}
    </>
  );
}

export function StaunchLockup() {
  return (
    <span className="lockup-staunch">
      <svg className="lockup-staunch__bars" viewBox="0 0 191 181" aria-hidden="true">
        {[0, 125].map((y) =>
          BAR_X.map((x, i) => (
            <rect key={`${y}-${x}`} x={x} y={y} width={BAR_W[i]} height={56} style={{ "--i": i } as React.CSSProperties} />
          )),
        )}
      </svg>
      <span aria-hidden="true">Staunch</span>
      <span className="lockup-staunch__word" aria-hidden="true">
        <span className="lockup-staunch__ventures">
          <Letters word="Ventures" />
        </span>
        <span className="lockup-staunch__capital">
          <Letters word="Capital" />
        </span>
      </span>
    </span>
  );
}
