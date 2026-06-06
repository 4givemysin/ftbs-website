import { company } from "./company";

/**
 * FTBS / BGW leadership — single source of truth for executive content.
 */
export const paulGibbs = {
  name: "Paul Gibbs",
  title: "President",
  organization: company.division.name,
  fullTitle: "President, BGW Construction Company",
  phone: "(954) 224-1283",
  email: "paulgibbs77@yahoo.com",
  bio: "Paul Gibbs leads BGW Construction Company with experience in construction industry leadership, project management, and hands-on building and development work. His focus is bringing that experience home to support infrastructure development, community growth, and long-term national progress.",
} as const;

export const presidentLetter = {
  salutation: "To Whom It May Concern,",
  paragraphs: [
    "My name is Paul Gibbs, and I am the President of BGW Construction Company. I am writing to formally express my interest and commitment to returning home in order to contribute to the continued infrastructure development and growth of our country.",
    "Over the years, I have gained valuable experience in the construction industry through leadership, project management, and hands-on involvement in building and development projects. Through BGW Construction Company, my goal is to bring that experience, professionalism, and dedication back home to help support the nation's progress through quality infrastructure and community development.",
    "I strongly believe that infrastructure is one of the foundations of economic growth and national improvement. Roads, housing, commercial developments, and public works projects all play a major role in strengthening communities and creating opportunities for future generations. It would be an honor for me and my company to contribute to these efforts.",
    "BGW Construction Company is prepared to work collaboratively with local leaders, organizations, contractors, and government agencies to support projects that improve living conditions, create jobs, and help modernize the country's infrastructure.",
    "Returning home is not only a professional goal for me, but also a personal mission to give back and be part of building a stronger future for our people.",
  ],
  closing: "Thank you for your time and consideration. I look forward to the opportunity to discuss how BGW Construction Company can contribute to the nation's development and infrastructure goals.",
  signature: {
    name: paulGibbs.name,
    title: paulGibbs.title,
    organization: paulGibbs.organization,
  },
} as const;

/** Short excerpt for home page and banners */
export const presidentMissionExcerpt =
  "Returning home is not only a professional goal for me, but also a personal mission to give back and be part of building a stronger future for our people.";

export const leadership = paulGibbs;
