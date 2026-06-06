import type { FaqCategory } from "@/lib/content/faq";

type FaqAccordionProps = {
  categories: readonly FaqCategory[];
};

export function FaqAccordion({ categories }: FaqAccordionProps) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.id} aria-labelledby={`faq-${category.id}-heading`}>
          <h2
            id={`faq-${category.id}-heading`}
            className="text-xl font-bold text-brand-navy"
          >
            {category.title}
          </h2>
          <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-white">
            {category.items.map((item) => (
              <details key={item.id} className="group px-5 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-brand-navy marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden
                    className="shrink-0 text-brand-blue transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-zinc-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
