import { company } from "../company";
import { routes } from "../routes";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqContent = {
  banner: {
    eyebrow: "Help Center",
    title: "Frequently Asked Questions",
    description: `Common questions about ${company.shortName}, services, BGW Construction, and how to partner with our team.`,
  },
  categories: [
    {
      id: "general",
      title: "General",
      items: [
        {
          id: "what-is-ftbs",
          question: "What is FTBS?",
          answer: `${company.name} (${company.shortName}) is a professional services firm supporting construction project management, infrastructure development, and technology consulting for government agencies, developers, and institutional partners.`,
        },
        {
          id: "bgw-relationship",
          question: "What is BGW Construction Company?",
          answer: `${company.division.name} is a division of ${company.shortName} focused on infrastructure development including roads, buildings, housing, and essential public works.`,
        },
        {
          id: "where-located",
          question: "Where is FTBS located?",
          answer: `FTBS is headquartered at ${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}.`,
        },
      ],
    },
    {
      id: "services",
      title: "Services",
      items: [
        {
          id: "services-offered",
          question: "What services does FTBS provide?",
          answer:
            "FTBS provides construction project management, infrastructure development support, commercial construction coordination, technology and business consulting, and digital project systems guidance. See our Services page for full details.",
        },
        {
          id: "project-types",
          question: "What types of projects does FTBS support?",
          answer:
            "We support public infrastructure programs, commercial facilities, capital improvement oversight, and technology-enabled delivery systems for organizations that require disciplined reporting and stakeholder alignment.",
        },
      ],
    },
    {
      id: "government",
      title: "Government & procurement",
      items: [
        {
          id: "capability-statement",
          question: "Where can I find FTBS capability information?",
          answer:
            "Our Capability Statement page summarizes core competencies, differentiators, and readiness for government and commercial partners. A formatted PDF package can be requested through our contact form.",
        },
        {
          id: "certifications",
          question: "What certifications does FTBS hold?",
          answer:
            "FTBS publishes only verified credentials on our Certifications page. Placeholder sections are clearly labeled until official documentation is approved for public display. SAM.gov and detailed NAICS information are planned for a future government contracting phase.",
        },
        {
          id: "sample-content",
          question: "Is all portfolio content real client work?",
          answer:
            "Some portfolio, case study, and testimonial content is marked as sample until client-approved materials replace it. Verified past performance will be published only with appropriate approvals.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact & inquiries",
      items: [
        {
          id: "how-to-contact",
          question: "How do I contact FTBS?",
          answer: `Use our Contact page to submit an inquiry, email ${company.email}, or call ${company.phone}. For leadership inquiries, Paul Gibbs, President of BGW Construction Company, can be reached through the contact page or leadership section on About.`,
        },
        {
          id: "response-time",
          question: "How quickly will FTBS respond?",
          answer:
            "We aim to respond to business inquiries within one to two business days. Urgent project matters should include timeline details in your message.",
        },
        {
          id: "inquiry-types",
          question: "What inquiry types can I submit?",
          answer:
            "Our contact form supports general inquiries, partnership requests, capability package requests, and project-related questions. Dedicated consultation and quote forms are planned for a future phase.",
        },
      ],
    },
  ] satisfies FaqCategory[],
  relatedLinks: [
    { label: "Contact FTBS", href: routes.contact.path },
    { label: "Capability Statement", href: routes.capabilities.path },
    { label: "Services", href: routes.services.path },
  ],
} as const;

export const allFaqItems = faqContent.categories.flatMap((category) => category.items);
