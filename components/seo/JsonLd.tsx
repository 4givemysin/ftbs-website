import { company, formattedAddress } from "@/lib/company";
import { paulGibbs } from "@/lib/leadership";
import { portfolioProjects } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";
import { testimonials } from "@/lib/testimonials";
import { allFaqItems } from "@/lib/content/faq";
import { routes } from "@/lib/routes";
import { getCaseStudyPath } from "@/lib/pages";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    url: company.url,
    email: company.email,
    telephone: company.phone,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: company.address.country,
    },
    subOrganization: {
      "@type": "Organization",
      name: company.division.name,
      description: company.division.focus,
    },
    founder: {
      "@type": "Person",
      name: paulGibbs.name,
      jobTitle: paulGibbs.fullTitle,
      email: paulGibbs.email,
      telephone: paulGibbs.phone,
      knowsLanguage: [...paulGibbs.languages],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.shortName,
    url: company.url,
    email: company.email,
    telephone: company.phone,
    description: company.description,
    address: formattedAddress,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type WebPageJsonLdProps = {
  title: string;
  description: string;
  path: string;
};

export function WebPageJsonLd({ title, description, path }: WebPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${company.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: company.shortName,
      url: company.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PortfolioItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FTBS Projects Portfolio",
    description: "Sample project profiles for construction, technology, and consulting engagements.",
    url: `${company.url}${routes.projects.path}`,
    numberOfItems: portfolioProjects.length,
    itemListElement: portfolioProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.summary,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CaseStudyItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FTBS Case Studies",
    url: `${company.url}${routes.caseStudies.path}`,
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.title,
      url: `${company.url}${getCaseStudyPath(study.slug)}`,
      description: study.summary,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TestimonialsJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FTBS Client Testimonials",
    description: "Sample client testimonials — replace with approved quotes.",
    url: `${company.url}${routes.testimonials.path}`,
    itemListElement: testimonials.slice(0, 3).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewBody: item.quote,
        author: {
          "@type": "Person",
          name: item.name,
          jobTitle: item.title,
          worksFor: {
            "@type": "Organization",
            name: item.organization,
          },
        },
        itemReviewed: {
          "@type": "Organization",
          name: company.shortName,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${company.url}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
