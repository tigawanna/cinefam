import { landingFeatures } from "@/content/landing";

export function LandingFeatures() {
  return (
    <section id="features" className="border-t border-base-300 bg-base-200/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
            {landingFeatures.heading}
          </h2>
          <p className="mt-4 text-lg text-neutral-content">{landingFeatures.description}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {landingFeatures.items.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-3xl bg-base-100 p-6 ring-1 ring-base-300 transition-shadow hover:shadow-lg"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-base-content">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-content">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
