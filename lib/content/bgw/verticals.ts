import { routes } from "../../routes";
import { bgwDivision } from "../../divisions";

export type BgwVerticalKey =
  | "infrastructure"
  | "commercial"
  | "residential"
  | "futureDevelopment";

export type BgwVerticalContent = {
  key: BgwVerticalKey;
  banner: {
    eyebrow: string;
    title: string;
    description: string;
  };
  overview: {
    title: string;
    paragraphs: string[];
  };
  capabilities: string[];
  partnerTypes: string[];
  relatedCaseStudySlugs?: string[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

export const bgwVerticals: Record<BgwVerticalKey, BgwVerticalContent> = {
  infrastructure: {
    key: "infrastructure",
    banner: {
      eyebrow: "BGW Construction",
      title: "Infrastructure Services",
      description:
        "Roads, transportation corridors, public buildings, and essential infrastructure delivered with phased planning and compliance-aware execution.",
    },
    overview: {
      title: "Building infrastructure that communities depend on",
      paragraphs: [
        `${bgwDivision.name} supports infrastructure programs that improve transportation access, public facilities, and essential systems for communities and national development.`,
        "Our approach combines field supervision, schedule discipline, and documentation suitable for government oversight and institutional review.",
      ],
    },
    capabilities: [
      "Road and transportation infrastructure",
      "Public buildings and municipal facilities",
      "Utilities coordination and phased delivery",
      "Safety and compliance checkpoint documentation",
      "Agency reporting and stakeholder communication",
      "Subcontractor and vendor coordination",
    ],
    partnerTypes: [
      "Municipal and county agencies",
      "State transportation partners",
      "Regional developers on public-private programs",
      "Institutional infrastructure owners",
    ],
    relatedCaseStudySlugs: ["public-infrastructure-program-recovery"],
    cta: {
      title: "Explore an infrastructure partnership",
      description:
        "Discuss roads, public works, and essential infrastructure programs with BGW Construction.",
      primaryLabel: "Infrastructure Inquiry",
      primaryHref: `${routes.bgwInquiry.path}?focus=infrastructure`,
    },
  },
  commercial: {
    key: "commercial",
    banner: {
      eyebrow: "BGW Construction",
      title: "Commercial Construction",
      description:
        "Commercial buildings and facilities built to specification, code compliance, and professional delivery standards for developers and institutional owners.",
    },
    overview: {
      title: "Commercial delivery with accountability",
      paragraphs: [
        "BGW Construction supports commercial builds and facility programs where schedule control, quality oversight, and clear reporting keep stakeholders aligned.",
        "From ground-up construction to phased tenant improvements, we bring construction leadership and field coordination to complex commercial environments.",
      ],
    },
    capabilities: [
      "Commercial building construction",
      "Facility upgrades and renovations",
      "Code and safety compliance coordination",
      "Schedule and milestone management",
      "Multi-trade coordination on active sites",
      "Executive status reporting",
    ],
    partnerTypes: [
      "Commercial developers",
      "Retail and service facility owners",
      "Institutional facility managers",
      "General contractors seeking division partners",
    ],
    relatedCaseStudySlugs: ["multi-site-capital-improvement-oversight"],
    cta: {
      title: "Discuss a commercial construction project",
      description:
        "Share scope, timeline, and facility requirements with the BGW Construction team.",
      primaryLabel: "Commercial Inquiry",
      primaryHref: `${routes.bgwInquiry.path}?focus=commercial`,
    },
  },
  residential: {
    key: "residential",
    banner: {
      eyebrow: "BGW Construction",
      title: "Residential Construction",
      description:
        "Housing and residential development that supports community growth, durable construction quality, and long-term value for residents and partners.",
    },
    overview: {
      title: "Housing and residential development with purpose",
      paragraphs: [
        "BGW Construction pursues residential programs that strengthen communities — from housing blocks to mixed-use development supporting local growth.",
        "We align construction delivery with community impact, safety standards, and the long-term infrastructure vision outlined in BGW leadership messaging.",
      ],
    },
    capabilities: [
      "Housing and residential development",
      "Mixed-use and community infill projects",
      "Site coordination and phased occupancy planning",
      "Quality checkpoints for structural and systems work",
      "Community-minded scheduling and communication",
      "Partnership with local agencies and developers",
    ],
    partnerTypes: [
      "Residential developers",
      "Community development organizations",
      "Housing agencies and institutional sponsors",
      "Municipal partners on residential infrastructure",
    ],
    cta: {
      title: "Explore residential development opportunities",
      description:
        "Connect with BGW Construction about housing programs and community-focused builds.",
      primaryLabel: "Residential Inquiry",
      primaryHref: `${routes.bgwInquiry.path}?focus=residential`,
    },
  },
  futureDevelopment: {
    key: "futureDevelopment",
    banner: {
      eyebrow: "BGW Construction",
      title: "Future Development",
      description:
        "Long-term infrastructure vision, strategic priorities, and partnership opportunities aligned with national development and returning home to contribute.",
    },
    overview: {
      title: "Building for the next generation of infrastructure",
      paragraphs: [
        `${bgwDivision.name} is focused on long-term infrastructure development — roads, housing, commercial growth, and public works that create durable community benefit.`,
        "Our leadership is committed to returning home to support national progress through quality construction, professional partnerships, and community-minded development.",
      ],
    },
    capabilities: [
      "Regional infrastructure pipeline planning (subject to approval)",
      "Public-private partnership exploration",
      "Community development alignment",
      "Workforce and subcontractor network growth",
      "Technology-enabled program reporting via FTBS parent support",
      "Partnership with agencies on upcoming capital programs",
    ],
    partnerTypes: [
      "Government planning offices",
      "Regional economic development groups",
      "Developers with multi-year pipeline programs",
      "Institutional investors in community infrastructure",
    ],
    cta: {
      title: "Partner on upcoming development initiatives",
      description:
        "Invite BGW Construction into early-stage discussions for future infrastructure and development programs.",
      primaryLabel: "Partnership Inquiry",
      primaryHref: routes.bgwInquiry.path,
    },
  },
};

export const futureDevelopmentDisclaimer =
  "Forward-looking statements on this page describe strategic priorities and partnership interests. Specific projects, regions, and commitments are subject to client approval, funding, and formal agreement.";
