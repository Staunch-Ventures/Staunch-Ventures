/**
 * Aurora — a fixed, layered gradient-mesh backdrop that drifts slowly to give
 * the whole site ambient depth and motion (Mercury/Stripe style). Pure CSS
 * animation so it renders on the server with zero JS.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Base navy wash, deepening toward the bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_-10%,hsl(224_42%_12%)_0%,hsl(var(--navy))_45%,hsl(var(--navy-deep))_100%)]" />

      {/* Drifting color blobs */}
      <div
        className="absolute -top-1/4 right-[-10%] h-[70vh] w-[70vh] rounded-full blur-[120px] opacity-50"
        style={{
          background:
            "radial-gradient(circle, hsl(16 90% 55% / 0.45), transparent 60%)",
          animation: "aurora-drift-1 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] left-[-15%] h-[60vh] w-[60vh] rounded-full blur-[130px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, hsl(38 92% 56% / 0.30), transparent 62%)",
          animation: "aurora-drift-2 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[20%] h-[65vh] w-[65vh] rounded-full blur-[140px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, hsl(250 70% 45% / 0.35), transparent 62%)",
          animation: "aurora-drift-3 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[40%] right-[10%] h-[50vh] w-[50vh] rounded-full blur-[120px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, hsl(210 90% 50% / 0.30), transparent 62%)",
          animation: "aurora-drift-1 26s ease-in-out infinite reverse",
        }}
      />

      {/* Grain overlay for richness / anti-banding */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />

      {/* Soft top fade so the nav reads cleanly */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/60 to-transparent" />
    </div>
  );
}
