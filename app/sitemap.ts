import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { activeRoutes } from "@/lib/routes";
import { caseStudies } from "@/lib/case-studies";
import { getCaseStudyPath } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = activeRoutes.map((route) => ({
    url: `${company.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route.path === "/" ? 1 : 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${company.url}${getCaseStudyPath(study.slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages];
}
