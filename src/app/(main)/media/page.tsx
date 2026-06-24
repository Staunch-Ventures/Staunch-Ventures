import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { VideoCard } from "@/components/marketing/video-card";
import { videos } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Media | Staunch Ventures",
  description:
    "Watch interviews, founder stories, and events from the Staunch Ventures ecosystem.",
};

export default function MediaPage() {
  return (
    <div className="container max-w-6xl mx-auto py-28 md:py-36 px-4 space-y-20">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Media</p>
        <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-display leading-[0.98]">
          <span className="text-gradient-brand">Stories from the</span>{" "}
          <span className="text-gradient-ember">ecosystem</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          Interviews, founder stories, and moments from the events and ventures we build alongside Africa&apos;s boldest founders.
        </p>
      </ScrollReveal>

      {videos.length > 0 ? (
        <Stagger
          className={cn(
            "grid gap-6",
            // A lone video is centered and capped; multiples flow into a grid.
            videos.length === 1
              ? "max-w-2xl mx-auto"
              : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {videos.map((video, i) => (
            <StaggerItem key={`${video.youtubeId}-${i}`} className="flex">
              <VideoCard video={video} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <ScrollReveal className="text-center text-muted-foreground">
          <p>New videos are on the way — check back soon.</p>
        </ScrollReveal>
      )}
    </div>
  );
}
