import { AuroraBackground } from "@/components/ui/aurora-background";
import { landingHero } from "@/content/landing";
import { Link } from "@tanstack/react-router";
import { Play, Plus, Search, Star } from "lucide-react";
import type { CSSProperties } from "react";

type PosterCard = {
  title: string;
  year: string;
  rating: string;
  tone: "violet" | "rose" | "amber" | "sky";
  rotate: string;
  delay: string;
};

const TONE_BG: Record<PosterCard["tone"], string> = {
  violet: "from-violet-600/80 to-violet-900/90",
  rose: "from-rose-600/80 to-rose-900/90",
  amber: "from-amber-600/80 to-amber-900/90",
  sky: "from-sky-600/80 to-sky-900/90",
};

const POSTERS: PosterCard[] = [
  { title: "Dune: Part Two", year: "2024", rating: "8.6", tone: "amber", rotate: "-2deg", delay: "0ms" },
  { title: "Shōgun", year: "2024", rating: "8.7", tone: "rose", rotate: "1.5deg", delay: "400ms" },
  { title: "The Bear", year: "2023", rating: "8.5", tone: "sky", rotate: "-1deg", delay: "800ms" },
  { title: "Oppenheimer", year: "2023", rating: "8.3", tone: "violet", rotate: "2deg", delay: "1200ms" },
];

export function LandingHero() {
  return (
    <section data-test="landing-hero" className="relative overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 text-center md:pt-28">
        <span className="inline-flex animate-fade-in items-center gap-2 rounded-full bg-base-200 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-base-300">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          {landingHero.eyebrow}
        </span>

        <h1 className="mt-7 animate-fade-in text-5xl font-semibold tracking-tight text-balance text-base-content md:text-7xl">
          {landingHero.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg leading-relaxed text-pretty text-neutral-content md:text-xl">
          {landingHero.description}
        </p>

        <div className="mt-9 flex animate-fade-in flex-wrap justify-center gap-3">
          <Link
            to="/auth/signup"
            search={{ returnTo: "/dashboard" }}
            className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-content shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
          >
            {landingHero.primaryCta}
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full bg-base-200 px-7 py-3.5 font-medium text-base-content ring-1 ring-base-300 transition-colors hover:bg-base-300/60"
          >
            {landingHero.secondaryCta}
          </Link>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-24">
        <LibraryMockup />
      </div>
    </section>
  );
}

function LibraryMockup() {
  return (
    <div className="mx-auto max-w-4xl rounded-4xl border border-base-300 bg-base-200/80 p-4 shadow-[0_40px_90px_-40px_rgba(20,10,40,0.5)] backdrop-blur-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-full bg-base-100 px-3 py-1.5 text-sm text-neutral-content ring-1 ring-base-300">
            <Search className="size-4" />
            Search titles
          </span>
          <span className="hidden rounded-full bg-base-100 px-3 py-1.5 text-sm text-neutral-content ring-1 ring-base-300 sm:inline">
            Movies & TV
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-content">
          <Plus className="size-4" />
          Add to list
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5 md:grid-cols-4">
        {POSTERS.map((poster) => (
          <div
            key={poster.title}
            className="flex animate-note-float aspect-[2/3] flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-b p-4 ring-1 ring-base-300"
            style={
              {
                "--note-rotate": poster.rotate,
                animationDelay: poster.delay,
                backgroundImage: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85)), linear-gradient(to bottom, var(--tw-gradient-stops))`,
              } as CSSProperties
            }
          >
            <div className={`absolute inset-0 bg-linear-to-b ${TONE_BG[poster.tone]}`} />
            <div className="relative">
              <div className="mb-2 flex items-center gap-1 text-xs text-white/80">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {poster.rating}
              </div>
              <p className="text-sm leading-snug font-semibold text-white">{poster.title}</p>
              <p className="text-xs text-white/70">{poster.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-base-300 pt-5">
        {landingHero.navPanel.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <span
              key={stat.label}
              className="flex items-center gap-2 rounded-full bg-base-100 px-3.5 py-1.5 text-sm ring-1 ring-base-300"
            >
              <Icon className="size-4 text-primary" />
              <span className="font-semibold text-base-content tabular-nums">{stat.value}</span>
              <span className="text-neutral-content">{stat.label}</span>
            </span>
          );
        })}
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-base-100 px-3.5 py-1.5 text-sm ring-1 ring-base-300">
          <Play className="size-4 text-primary" />
          <span className="text-neutral-content">Now watching</span>
        </span>
      </div>
    </div>
  );
}
