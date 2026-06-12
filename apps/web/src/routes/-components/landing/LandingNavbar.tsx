import { landingNav } from "@/content/landing";
import { AppConfig } from "@/utils/system";
import { Link } from "@tanstack/react-router";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-content">
            {AppConfig.wordmark}
          </span>
          <span className="text-lg font-semibold tracking-tight">{AppConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {landingNav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-content transition-colors hover:text-base-content"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            search={{ returnTo: "/dashboard" }}
            className="rounded-full px-4 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-200"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            search={{ returnTo: "/dashboard" }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-content shadow-sm transition-transform hover:scale-[1.02]"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
