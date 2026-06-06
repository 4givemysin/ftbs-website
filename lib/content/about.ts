import { company } from "../company";
import { bgwDivision } from "../divisions";

export const aboutContent = {
  banner: {
    eyebrow: "About FTBS",
    title: "Finesse Technology Business Solutions",
    description: `${company.name} supports construction and infrastructure partners with project management expertise and technology-driven business solutions.`,
  },
  whoWeAre: {
    title: "Who we are",
    paragraphs: [
      "FTBS was built on a simple premise: complex construction and infrastructure work requires more than execution — it requires leadership, systems, and communication that keep every stakeholder aligned.",
      "We serve government agencies, developers, and institutional clients who need a professional partner capable of managing scope, schedule, quality, and reporting with consistency.",
    ],
  },
  bgw: {
    title: bgwDivision.name,
    focus: bgwDivision.focus,
    paragraph:
      "BGW reflects FTBS commitment to infrastructure that opens doors for local communities and supports national development over the long term.",
  },
  missionItems: [
    {
      title: "Mission",
      content:
        "Deliver construction and technology solutions with discipline, transparency, and a commitment to outcomes that serve clients and communities.",
    },
    {
      title: "Vision",
      content:
        "Be a trusted partner for organizations building infrastructure, facilities, and systems that create lasting value.",
    },
    {
      title: "Values",
      content:
        "Accountability, professionalism, community impact, and long-term thinking guide every engagement.",
    },
  ],
  leadership: {
    eyebrow: "Leadership Commitment",
    title: "Experience in construction and business leadership",
    description:
      "FTBS leadership brings together construction delivery experience and business leadership to help partners execute with confidence.",
    paragraphs: [
      "BGW Construction Company is led with a clear purpose: to contribute to the rebuilding and long-term development of essential infrastructure — including roads, buildings, housing, and other systems communities depend on.",
      "That purpose shapes how FTBS approaches partnerships, project selection, and delivery. We look for opportunities to support progress that matters beyond the immediate contract.",
    ],
  },
  cta: {
    title: "Learn how FTBS can support your organization",
    description:
      "Reach out to discuss project management, infrastructure partnerships, or technology consulting needs.",
  },
} as const;
