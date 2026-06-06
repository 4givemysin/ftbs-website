import { OG_PAGE_CONTENT } from "@/lib/og/config";
import { createOgImageRoute } from "@/lib/og/route-handlers";

const route = createOgImageRoute("caseStudies", OG_PAGE_CONTENT.caseStudies);

export const alt = route.alt;
export const size = route.size;
export const contentType = route.contentType;
export default route.Image;
