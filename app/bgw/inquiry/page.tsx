import { ContentSection } from "@/components/sections/ContentSection";
import { BgwPageTemplate } from "@/components/bgw/BgwPageTemplate";
import { BgwConstructionInquiryForm } from "@/components/forms/BgwConstructionInquiryForm";
import { LeadershipProfile } from "@/components/marketing/LeadershipProfile";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { bgwBreadcrumbs } from "@/lib/bgw/breadcrumbs";
import { company } from "@/lib/company";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";

export const metadata = createMetadataFromPageConfig(getPageSeo("bgwInquiry"));

export default function BgwInquiryPage() {
  return (
    <>
      <WebPageJsonLd
        title="BGW Construction Inquiry"
        description="Submit a construction inquiry to BGW Construction Company."
        path={getPagePath("bgwInquiry")}
      />
      <BgwPageTemplate
        banner={{
          eyebrow: "BGW Construction",
          title: "Construction Inquiry",
          description:
            "Share your infrastructure, commercial, or residential project scope with BGW Construction. Our team responds to qualified partnership and project inquiries.",
          secondaryCta: { label: "BGW Capability Statement", href: routes.bgwCapabilityStatement.path },
        }}
        breadcrumbs={bgwBreadcrumbs({ name: "Construction Inquiry", path: routes.bgwInquiry.path })}
      >
        <ContentSection
          title="Tell us about your project"
          description="Fields marked with * are required. For general FTBS inquiries, use the main contact page."
          alt={false}
        >
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <BgwConstructionInquiryForm />
            </div>
            <aside className="space-y-6 lg:col-span-2">
              <LeadershipProfile variant="compact" showResumeLink />
              <div className="rounded-lg border border-border bg-surface-alt p-6">
                <h2 className="text-lg font-semibold text-brand-navy">Direct contact</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-medium text-brand-navy">Phone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${company.phone.replace(/\D/g, "")}`} className="text-brand-blue hover:text-brand-navy">
                        {company.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-navy">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${company.email}`} className="text-brand-blue hover:text-brand-navy">
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-navy">Response time</dt>
                    <dd className="mt-1 text-zinc-600">One to two business days for qualified inquiries.</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </ContentSection>
      </BgwPageTemplate>
    </>
  );
}
