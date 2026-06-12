import { Clapperboard, Film, ListVideo, Share2, Sparkles, Users, Wifi } from "lucide-react";

export const landingNav = {
  status: "Movies · Shows · Watchlists",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Sign in", href: "/auth" },
  ],
} as const;

export const landingHero = {
  eyebrow: "Your cinema companion",
  title: "Track what you watch. Share what you love.",
  description:
    "Cinefam blends live movie and TV data with your personal watchlists and watched history — local SQLite on device, Postgres in the cloud, synced your way.",
  primaryCta: "Get started",
  secondaryCta: "Open dashboard",
  navPanel: {
    stats: [
      { label: "Watched", value: "142", icon: Film },
      { label: "Watchlists", value: "8", icon: ListVideo },
      { label: "Friends", value: "24", icon: Users },
    ],
  },
} as const;

export const landingFeatures = {
  heading: "Everything in one place",
  description:
    "Live TMDB data joined with your synced library — SQLite on device, Postgres in the cloud.",
  items: [
    {
      icon: Clapperboard,
      title: "Discover movies & shows",
      description: "Browse trending titles from TMDB with rich posters, ratings, and details.",
    },
    {
      icon: ListVideo,
      title: "Watchlists that sync",
      description: "Build lists like Want to Watch and share them with public or followers-only visibility.",
    },
    {
      icon: Sparkles,
      title: "Watched history",
      description: "Mark titles as watched, rate them, and keep notes — synced across your devices.",
    },
    {
      icon: Share2,
      title: "Share with friends",
      description: "Follow friends, like watchlists, and see what your community is watching.",
    },
    {
      icon: Wifi,
      title: "Local-first sync",
      description:
        "SQLite on device via TanStack DB persistence, Postgres on the worker — you control the glue.",
    },
    {
      icon: Users,
      title: "Better Auth",
      description: "Sign in with email or Google. Your account ties your library to every device.",
    },
  ],
} as const;

export const landingShowcase = {
  heading: "From discovery to done",
  description: "Search TMDB, add to a list, mark watched — TanStack DB joins live metadata with your synced data.",
  steps: [
    {
      id: "01",
      label: "DISCOVER",
      title: "Find your next watch",
      description: "Browse movies and TV from TMDB with filters and search.",
    },
    {
      id: "02",
      label: "COLLECT",
      title: "Curate watchlists",
      description: "Add titles once by TMDB ID and reuse them across multiple lists.",
    },
    {
      id: "03",
      label: "SHARE",
      title: "Watch together",
      description: "Public lists, collaborative lists, and a social feed for your cinema circle.",
    },
  ],
} as const;

export const landingCta = {
  title: "Start your cinema journal",
  highlight: "journal",
  description: "Create an account to sync watchlists across web and mobile, or open the dashboard to explore.",
  primaryCta: "Create account",
  secondaryCta: "Sign in",
} as const;

export const landingFooter = {
  tagline: "Movies · Shows · Watchlists · Friends",
} as const;
