import { company, formattedAddress } from "../company";
import { routes } from "../routes";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

const lastUpdated = "June 2026";

export const privacyPolicyContent = {
  banner: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description: `How ${company.shortName} collects, uses, and protects information when you visit our website or submit an inquiry.`,
  },
  lastUpdated,
  intro: `This Privacy Policy describes how ${company.name} ("${company.shortName}," "we," "us," or "our") handles information when you use ${company.url} and related pages. This policy is provided for transparency and should be reviewed by qualified legal counsel before final publication.`,
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We may collect information you voluntarily provide through our contact form, including your name, organization, email address, phone number, inquiry type, project focus selections, and message content.",
        "We may collect standard technical information such as browser type, device type, and general usage data when analytics tools are enabled.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: ["We use submitted information to:"],
      list: [
        "Respond to inquiries and partnership requests",
        "Route messages to the appropriate FTBS team member",
        "Improve website content and user experience",
        "Maintain security and prevent spam or abuse",
      ],
    },
    {
      id: "email-delivery",
      title: "Email and service providers",
      paragraphs: [
        "Contact form submissions may be processed through third-party email delivery services (such as Resend) to send notifications and confirmation messages. These providers process data according to their own privacy policies.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        "If analytics tools (such as Google Analytics) are enabled, we may use cookies or similar technologies to understand how visitors use the site. See our Cookie Policy for details.",
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      paragraphs: [
        "We retain inquiry information for as long as needed to respond, maintain business records, and comply with applicable obligations. Retention periods may vary based on inquiry type and business requirements.",
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      paragraphs: [
        "You may request access to, correction of, or deletion of personal information you have submitted, subject to applicable law and legitimate business needs. Contact us using the information below.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use reasonable administrative and technical measures to protect information submitted through our website. No method of transmission over the internet is completely secure.",
      ],
    },
    {
      id: "children",
      title: "Children's privacy",
      paragraphs: [
        "Our website is intended for business and professional audiences. We do not knowingly collect personal information from children under 13.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page will reflect the most recent revision.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      paragraphs: [
        `Questions about this Privacy Policy may be directed to ${company.email} or ${company.phone}.`,
        formattedAddress,
      ],
    },
  ] satisfies LegalSection[],
  relatedLinks: [
    { label: "Terms of Service", href: routes.terms.path },
    { label: "Cookie Policy", href: routes.cookies.path },
    { label: "Contact", href: routes.contact.path },
  ],
} as const;

export const termsOfServiceContent = {
  banner: {
    eyebrow: "Legal",
    title: "Terms of Service",
    description: `Terms governing use of the ${company.shortName} website and public content.`,
  },
  lastUpdated,
  intro: `These Terms of Service ("Terms") govern your access to and use of the ${company.url} website operated by ${company.name}. By using this website, you agree to these Terms. This document should be reviewed by qualified legal counsel before final publication.`,
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      paragraphs: [
        "By accessing or using this website, you acknowledge that you have read and agree to be bound by these Terms and our Privacy Policy.",
      ],
    },
    {
      id: "website-purpose",
      title: "Website purpose",
      paragraphs: [
        `${company.shortName} provides this website for general business information about construction project management, infrastructure development, technology consulting, and related services offered through ${company.name} and its division, ${company.division.name}.`,
        "Information on this website is provided for general informational purposes and does not constitute a binding offer, guarantee, or contract unless confirmed in a separate written agreement.",
      ],
    },
    {
      id: "sample-content",
      title: "Sample and forward-looking content",
      paragraphs: [
        "Certain portfolio, case study, testimonial, and certification content may be marked as sample or placeholder until client-approved materials are published. Do not rely on sample content for procurement, contracting, or investment decisions.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: ["You agree not to:"],
      list: [
        "Use the website for unlawful purposes or to transmit harmful code",
        "Attempt unauthorized access to systems or data",
        "Scrape, harvest, or misuse contact forms for spam",
        "Misrepresent your affiliation with FTBS or BGW Construction Company",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "Website content, branding, text, graphics, and layout are owned by or licensed to FTBS unless otherwise noted. You may not reproduce, distribute, or create derivative works without prior written permission.",
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      paragraphs: [
        "This website may link to third-party sites. FTBS is not responsible for the content, policies, or practices of external websites.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer of warranties",
      paragraphs: [
        'This website and its content are provided "as is" without warranties of any kind, express or implied, including accuracy, completeness, or fitness for a particular purpose.',
      ],
    },
    {
      id: "limitation",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, FTBS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These Terms shall be governed by the laws of the State of Georgia, United States, without regard to conflict-of-law principles, unless otherwise required by applicable law.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about these Terms may be directed to ${company.email}.`,
      ],
    },
  ] satisfies LegalSection[],
  relatedLinks: [
    { label: "Privacy Policy", href: routes.privacy.path },
    { label: "FAQ", href: routes.faq.path },
    { label: "Contact", href: routes.contact.path },
  ],
} as const;

export const cookiePolicyContent = {
  banner: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    description: "How cookies and similar technologies may be used on the FTBS website.",
  },
  lastUpdated,
  intro: `This Cookie Policy explains how ${company.name} may use cookies and similar technologies on ${company.url}. It should be read together with our Privacy Policy.`,
  sections: [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help websites remember preferences and understand how pages are used.",
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookies we may use",
      paragraphs: ["Depending on site configuration, we may use:"],
      list: [
        "Essential cookies required for basic site functionality",
        "Analytics cookies (such as Google Analytics) to measure traffic and usage patterns",
        "Security or spam-prevention mechanisms related to form submissions",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        "If analytics is enabled via environment configuration, we may use Google Analytics or a comparable privacy-conscious alternative. Analytics tools may set cookies to distinguish unique visitors and sessions.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices",
      paragraphs: [
        "You can control cookies through your browser settings. Disabling cookies may affect certain website features. Where required by law, we will provide additional consent mechanisms before non-essential cookies are set.",
      ],
    },
    {
      id: "updates",
      title: "Updates",
      paragraphs: [
        "We may update this Cookie Policy when our tools or legal requirements change. Check the \"Last updated\" date for the latest version.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [`Questions about cookies may be sent to ${company.email}.`],
    },
  ] satisfies LegalSection[],
  relatedLinks: [
    { label: "Privacy Policy", href: routes.privacy.path },
    { label: "Terms of Service", href: routes.terms.path },
  ],
} as const;
