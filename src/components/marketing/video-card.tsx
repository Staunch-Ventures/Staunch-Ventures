"use client";

import * as React from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Video } from "@/lib/site-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * VideoCard — a "facade" YouTube embed. We render only the thumbnail + a play
 * button until the user clicks; the real (heavy) iframe is mounted on demand.
 * This keeps a page full of videos fast — no per-video player JS on first load —
 * and uses youtube-nocookie.com so nothing is set until playback begins.
 */
export function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = React.useState(false);
  const { youtubeId, title, description, category } = video;

  // YouTube's hqdefault thumbnail always exists for a valid ID.
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <SpotlightCard className="h-full">
      <Card variant="interactive" className="flex h-full flex-col overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-muted">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group/play absolute inset-0 h-full w-full cursor-pointer outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover/play:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                  "rounded-full bg-primary/90 text-primary-foreground shadow-float backdrop-blur-sm",
                  "transition-transform duration-300 group-hover/play:scale-110"
                )}
              >
                <Play className="ml-0.5 h-7 w-7 fill-current" />
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {category && (
            <Badge
              variant="secondary"
              className="mb-3 w-fit border-primary/20 bg-primary/10 text-primary"
            >
              {category}
            </Badge>
          )}
          <h3 className="text-lg font-semibold tracking-tight text-foreground text-balance">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{description}</p>
        </div>
      </Card>
    </SpotlightCard>
  );
}
