import { company } from "./company";
import { presidentMissionExcerpt } from "./leadership";
import { routes } from "./routes";

/**
 * BGW Construction Company division metadata.
 */
export const bgwDivision = {
  id: "bgw-construction",
  name: company.division.name,
  shortName: "BGW",
  tagline: "Infrastructure built for generations",
  focus: company.division.focus,
  path: routes.bgw.path,
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
  serviceVerticals: [
    { label: "Infrastructure", href: routes.bgwInfrastructure.path },
    { label: "Commercial", href: routes.bgwCommercial.path },
    { label: "Residential", href: routes.bgwResidential.path },
    { label: "Future Development", href: routes.bgwFutureDevelopment.path },
  ],
} as const;
