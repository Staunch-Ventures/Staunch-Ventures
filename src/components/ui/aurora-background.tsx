/**
 * Aurora — a fixed, layered gradient-mesh backdrop that drifts slowly to give
 * the whole site ambient depth and motion (Mercury/Stripe style). Pure CSS
 * animation so it renders on the server with zero JS.
 *
 * No CSS blur. Each blob's softness is built into its gradient: an eased
 * falloff sized to the blob (closest-side, reaching transparent at the edge,
 * on a blob enlarged around the old centre to cover the old blur spread), so
 * it is painted once and the drift is a pure compositor transform. Blurring them with filter: blur(120px+) instead made
 * the browser re-blur several huge surfaces every frame while they drifted:
 * measured at ~70ms/frame when hovering cards over it, against ~17ms without.
 * On small screens `.aurora-blob` still freezes the drift (see globals.css).
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Base navy wash, deepening toward the bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_-10%,hsl(224_42%_12%)_0%,hsl(var(--navy))_45%,hsl(var(--navy-deep))_100%)]" />

      {/* Drifting color blobs */}
      <div
        className="aurora-blob absolute [will-change:transform] top-[calc(-25%-12.5vh)] right-[calc(-10%-12.5vh)] h-[95vh] w-[95vh] opacity-50"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(16 90% 55% / 0.324) 0%, hsl(16 90% 55% / 0.243) 15%, hsl(16 90% 55% / 0.162) 30%, hsl(16 90% 55% / 0.091) 48%, hsl(16 90% 55% / 0.039) 65%, hsl(16 90% 55% / 0.013) 80%, transparent 100%)",
          animation: "aurora-drift-1 22s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute [will-change:transform] top-[calc(10%-11vh)] left-[calc(-15%-11vh)] h-[82vh] w-[82vh] opacity-40"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(38 92% 56% / 0.216) 0%, hsl(38 92% 56% / 0.162) 15%, hsl(38 92% 56% / 0.108) 30%, hsl(38 92% 56% / 0.060) 48%, hsl(38 92% 56% / 0.026) 65%, hsl(38 92% 56% / 0.009) 80%, transparent 100%)",
          animation: "aurora-drift-2 28s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute [will-change:transform] bottom-[calc(-20%-11.5vh)] left-[calc(20%-11.5vh)] hidden h-[88vh] w-[88vh] opacity-40 sm:block"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(250 70% 45% / 0.252) 0%, hsl(250 70% 45% / 0.189) 15%, hsl(250 70% 45% / 0.126) 30%, hsl(250 70% 45% / 0.071) 48%, hsl(250 70% 45% / 0.030) 65%, hsl(250 70% 45% / 0.010) 80%, transparent 100%)",
          animation: "aurora-drift-3 32s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute [will-change:transform] top-[calc(40%-9vh)] right-[calc(10%-9vh)] hidden h-[68vh] w-[68vh] opacity-30 sm:block"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(210 90% 50% / 0.216) 0%, hsl(210 90% 50% / 0.162) 15%, hsl(210 90% 50% / 0.108) 30%, hsl(210 90% 50% / 0.060) 48%, hsl(210 90% 50% / 0.026) 65%, hsl(210 90% 50% / 0.009) 80%, transparent 100%)",
          animation: "aurora-drift-1 26s ease-in-out infinite reverse",
        }}
      />

      {/* Woven linework — brand pattern in muted terracotta, for depth */}
      <div className="absolute inset-0 bg-linework opacity-[0.1]" />

      {/* Grain overlay for richness / anti-banding */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />

      {/* Soft top fade so the nav reads cleanly */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/60 to-transparent" />
    </div>
  );
}
