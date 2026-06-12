import { landingCta } from "@/content/landing";
import { Link } from "@tanstack/react-router";

export function LandingCTA() {
  const [before, after] = landingCta.title.split(landingCta.highlight);

  return (
    <section className="border-t border-base-300 bg-base-200/40 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-base-content md:text-5xl">
          {before}
          <span className="text-primary">{landingCta.highlight}</span>
          {after}
        </h2>
        <p className="mt-5 text-lg text-neutral-content">{landingCta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/auth/signup"
            search={{ returnTo: "/dashboard" }}
            className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-content shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
          >
            {landingCta.primaryCta}
          </Link>
          <Link
            to="/auth"
            search={{ returnTo: "/dashboard" }}
            className="rounded-full bg-base-100 px-7 py-3.5 font-medium text-base-content ring-1 ring-base-300 transition-colors hover:bg-base-300/60"
          >
            {landingCta.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
