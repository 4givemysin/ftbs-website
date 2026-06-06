"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  bgwGalleryItems,
  galleryCategories,
  getCategoryLabel,
  type GalleryCategory,
} from "@/lib/bgw/gallery";

export function ProjectGallery() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");

  const items =
    active === "all"
      ? bgwGalleryItems
      : bgwGalleryItems.filter((item) => item.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2"
      >
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={active === cat.id}
            onClick={() => setActive(cat.id)}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
              active === cat.id
                ? "border-bgw-green bg-bgw-green/10 text-bgw-earth"
                : "border-border bg-white text-brand-navy hover:border-bgw-green/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <Card className="flex h-full flex-col overflow-hidden p-0">
              <div
                className="flex aspect-[4/3] items-end bg-gradient-to-br from-bgw-earth/80 via-brand-navy/70 to-bgw-green/60 p-4"
                role="img"
                aria-label={`Sample project photo placeholder: ${item.title}`}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Sample</Badge>
                  <Badge variant="construction">{getCategoryLabel(item.category)}</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                  {item.caption}
                </p>
                <p className="mt-4 text-xs text-zinc-500">
                  {item.location} · {item.year}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
