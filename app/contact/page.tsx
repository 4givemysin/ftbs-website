import { ContactForm } from "@/components/forms/ContactForm";
import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { contactContent } from "@/lib/content/contact";
import { company, formattedAddress } from "@/lib/company";

export const metadata = createMetadataFromPageConfig(getPageSeo("contact"));

export default function ContactPage() {
  const { banner, inquiryOptions, formIntro } = contactContent;

  return (
    <>
      <LocalBusinessJsonLd />

      <InteriorPageTemplate banner={banner}>
        <Section>
          <ul className="grid gap-4 md:grid-cols-3">
            {inquiryOptions.map((option) => (
              <li key={option.title}>
                <Card className="bg-surface-alt shadow-none">
                  <h2 className="text-base font-semibold text-brand-navy">
                    {option.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {option.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>

        <Section alt>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-brand-navy">
                {formIntro.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {formIntro.description}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-2">
              <Card>
                <h2 className="text-lg font-semibold text-brand-navy">
                  Direct contact
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-medium text-brand-navy">Email</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${company.email}`}
                        className="text-brand-blue hover:text-brand-navy"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-navy">Address</dt>
                    <dd className="mt-1 leading-relaxed text-zinc-600">
                      {formattedAddress}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-navy">Company</dt>
                    <dd className="mt-1 leading-relaxed text-zinc-600">
                      {company.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-navy">Division</dt>
                    <dd className="mt-1 leading-relaxed text-zinc-600">
                      {company.division.name}
                    </dd>
                  </div>
                </dl>
              </Card>
            </aside>
          </div>
        </Section>
      </InteriorPageTemplate>
    </>
  );
}
