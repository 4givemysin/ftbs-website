import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { servicesContent } from "@/lib/content/services";
import { serviceCategories, services } from "@/lib/services";

export const metadata = createMetadataFromPageConfig(getPageSeo("services"));

export default function ServicesPage() {
  const { banner, processSteps, cta } = servicesContent;

  return (
    <InteriorPageTemplate banner={banner} cta={cta}>
      <Section>
        <ServicesGrid showHeader={false} />
      </Section>

      {serviceCategories.map((category, index) => {
        const categoryServices = services.filter(
          (service) => service.category === category.id,
        );

        return (
          <ContentSection
            key={category.id}
            eyebrow={category.label}
            title={
              category.id === "technology"
                ? "Technology that supports smarter operations"
                : "Built for complex project environments"
            }
            alt={index % 2 === 1}
          >
            <div className="mt-0 space-y-8">
              {categoryServices.map((service) => (
                <article key={service.id} id={service.id} className="scroll-mt-24">
                  <Card className="lg:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          category.id === "construction"
                            ? "construction"
                            : "technology"
                        }
                      >
                        {category.label}
                      </Badge>
                      {service.division === "bgw" ? (
                        <Badge variant="bgw">BGW Division</Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-brand-navy">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
                      {service.description}
                    </p>
                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-navy">
                          Capabilities
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {service.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="flex gap-2 text-sm text-zinc-700 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-gold"
                            >
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-navy">
                          Who we serve
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                          {service.audience}
                        </p>
                      </div>
                    </div>
                  </Card>
                </article>
              ))}
            </div>
          </ContentSection>
        );
      })}

      <ContentSection
        eyebrow="Our Process"
        title="A clear path from consultation to delivery"
        description="Every engagement follows a structured approach designed for accountability and professional communication."
      >
        <ol className="mt-0 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step}>
              <Card>
                <p className="text-sm font-bold text-brand-blue">{step.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </ContentSection>
    </InteriorPageTemplate>
  );
}
