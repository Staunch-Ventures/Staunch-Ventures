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
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8 space-y-20">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Media</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Stories from the</span>{" "}
          <span className="text-primary">ecosystem</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          Interviews, founder stories, and moments from the events and ventures we build alongside Africa&apos;s boldest founders.
        </p>
      </ScrollReveal>

      {videos.length > 0 ? (
        <Stagger
          className={cn(
            "grid gap-6",
            // Columns track the video count so they always fill the row evenly:
            // 1 → centered & capped, 2 → halves, 3+ → thirds (wrapping past 3).
            {
              1: "max-w-2xl mx-auto",
              2: "sm:grid-cols-2",
            }[videos.length] ?? "sm:grid-cols-2 lg:grid-cols-3"
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
