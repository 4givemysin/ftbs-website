import { company } from "./company";
import { presidentMissionExcerpt } from "./leadership";

/**
 * BGW Construction Company division metadata.
 * Expanded in Phase 3 with dedicated pages and gallery content.
 */
export const bgwDivision = {
  id: "bgw-construction",
  name: company.division.name,
  shortName: "BGW",
  tagline: "Infrastructure built for generations",
  focus: company.division.focus,
  pillars: [
    "Road and transportation infrastructure",
    "Commercial and public buildings",
    "Housing and residential development",
    "Essential public works",
  ],
  missionExcerpt: presidentMissionExcerpt,
  partners: [
    "Government agencies",
    "Developers and institutions",
    "Infrastructure partners",
    "Community organizations",
  ],
  /** Planned route — page built in Phase 3 */
  plannedPath: "/divisions/bgw-construction",
} as const;
