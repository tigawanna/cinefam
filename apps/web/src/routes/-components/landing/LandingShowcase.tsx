import { landingShowcase } from "@/content/landing";

export function LandingShowcase() {
  return (
    <section id="how" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
            {landingShowcase.heading}
          </h2>
          <p className="mt-4 text-lg text-neutral-content">{landingShowcase.description}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {landingShowcase.steps.map((step) => (
            <article
              key={step.id}
              className="relative overflow-hidden rounded-3xl bg-base-200 p-8 ring-1 ring-base-300"
            >
              <span className="text-xs font-semibold tracking-widest text-primary">{step.label}</span>
              <h3 className="mt-3 text-xl font-semibold text-base-content">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-content">{step.description}</p>
              <span className="absolute -right-2 -bottom-4 text-8xl font-bold text-base-content/5">
                {step.id}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
