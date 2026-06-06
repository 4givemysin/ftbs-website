import { company } from "../company";
import { bgwDivision } from "../divisions";
import { paulGibbs } from "../leadership";

export const aboutContent = {
  banner: {
    eyebrow: "About FTBS",
    title: "Finesse Technology Business Solutions",
    description: `${company.name} supports partners with IT infrastructure, technology consulting, and construction project management — combining systems expertise with disciplined field delivery.`,
  },
  whoWeAre: {
    title: "Who we are",
    paragraphs: [
      "FTBS was built on a simple premise: organizations running complex construction and infrastructure programs need technology, leadership, and communication working together — not in silos.",
      "We deploy and support IT infrastructure, modernize project systems, and manage construction delivery for government agencies, developers, and institutional clients who require professional accountability.",
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
      "Regional project management, construction leadership, IT infrastructure delivery, and hands-on electrical experience — dedicated to quality infrastructure and community development.",
    resumeTitle: "Professional background",
    resumeDescription:
      "Executive resume summary, work history, education, and certifications for procurement and partnership review.",
  },
  cta: {
    title: "Learn how FTBS can support your organization",
    description:
      "Reach out to discuss project management, infrastructure partnerships, or technology consulting needs.",
  },
} as const;
