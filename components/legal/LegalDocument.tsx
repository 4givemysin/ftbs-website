import Link from "next/link";
import type { LegalSection } from "@/lib/content/legal";

type LegalDocumentProps = {
  lastUpdated: string;
  intro: string;
  sections: readonly LegalSection[];
  relatedLinks: readonly { label: string; href: string }[];
};

export function LegalDocument({
  lastUpdated,
  intro,
  sections,
  relatedLinks,
}: LegalDocumentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>

      <div
        role="note"
        className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900"
      >
        <strong className="font-semibold">Legal review required.</strong> This
        document is a business website template and should be reviewed by qualified
        legal counsel before final publication.
      </div>

      <p className="mt-8 text-base leading-relaxed text-zinc-700">{intro}</p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-brand-navy">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-base leading-relaxed text-zinc-700"
              >
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-700">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <nav
        aria-label="Related legal pages"
        className="mt-12 border-t border-border pt-8"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
          Related pages
        </h2>
        <ul className="mt-4 flex flex-wrap gap-4">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-brand-blue hover:text-brand-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
