"use client";

import { useState } from "react";
import { portfolioCategories, portfolioItems } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof portfolioCategories)[number]>(
    "Tümü"
  );

  const filtered =
    active === "Tümü"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              active === cat
                ? "border-gold bg-gold text-black"
                : "border-white/15 text-neutral hover:border-white/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Reveal key={`${item.title}-${i}`} index={i % 3}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 text-sm text-neutral">
                Görsel / Video Alanı
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.brand}
                  </p>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
                <span className="shrink-0 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-black">
                  İncele
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
