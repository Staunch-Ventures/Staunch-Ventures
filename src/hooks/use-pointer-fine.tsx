import * as React from "react";

/**
 * usePointerFine — true only on devices with a precise pointer (a real mouse /
 * trackpad). Touch devices report `(pointer: coarse)` and resolve to false.
 *
 * Use this to gate cursor-driven effects (3D tilt, magnetic pull, spotlight,
 * parallax) so they never mount their framer-motion springs and listeners on
 * phones — where they do nothing useful, waste battery, and can leave hover/
 * tilt states stuck after a tap.
 *
 * Returns false during SSR and the first client render (mobile-first), then
 * settles to the real value after mount. Effects that read it simply render
 * their plain children until/unless a fine pointer is confirmed.
 */
export function usePointerFine() {
  const [fine, setFine] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const onChange = () => setFine(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return fine;
}
