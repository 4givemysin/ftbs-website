import Link from "next/link";
import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqPageJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";
import { faqContent } from "@/lib/content/faq";

export const metadata = createMetadataFromPageConfig(getPageSeo("faq"));

export default function FaqPage() {
  const { banner, categories, relatedLinks } = faqContent;

  return (
    <>
      <WebPageJsonLd
        title="FAQ"
        description={banner.description}
        path={getPagePath("faq")}
      />
      <FaqPageJsonLd />
      <InteriorPageTemplate
        banner={banner}
        cta={{
          title: "Still have questions?",
          description: "Reach out to discuss services, partnerships, or procurement materials.",
          primaryLabel: "Contact FTBS",
          primaryHref: routes.contact.path,
          secondaryLabel: "View Services",
          secondaryHref: routes.services.path,
        }}
      >
        <ContentSection title="Common questions" alt={false}>
          <FaqAccordion categories={categories} />
        </ContentSection>

        <ContentSection title="Quick links" alt>
          <ul className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Button href={link.href} variant="outline">
                  {link.label}
                </Button>
              </li>
            ))}
            <li>
              <Link
                href={routes.privacy.path}
                className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold text-brand-blue hover:text-brand-navy"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
