import { company } from "../company";
import { bgwDivision } from "../divisions";
import { paulGibbs } from "../leadership";

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
    paragraph: `${bgwDivision.name} is led by ${paulGibbs.fullTitle} with a commitment to infrastructure development, community growth, and returning home to contribute to the nation's progress.`,
  },
  missionItems: [
    {
      title: "Mission",
      content:
        "Deliver construction and technology solutions with discipline, transparency, and a commitment to outcomes that serve clients, communities, and long-term infrastructure development.",
    },
    {
      title: "Vision",
      content:
        "Be a trusted partner for organizations building infrastructure, facilities, and systems that create lasting value for communities and future generations.",
    },
    {
      title: "Values",
      content:
        "Accountability, professionalism, community impact, and long-term thinking guide every engagement.",
    },
  ],
  leadership: {
    eyebrow: "Leadership",
    title: `${paulGibbs.name}, ${paulGibbs.fullTitle}`,
    description:
      "Construction industry leadership, project management, and hands-on building experience — dedicated to quality infrastructure and community development.",
  },
  cta: {
    title: "Learn how FTBS can support your organization",
    description:
      "Reach out to discuss project management, infrastructure partnerships, or technology consulting needs.",
  },
} as const;
