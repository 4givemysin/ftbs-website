import type { Metadata } from "next";
import { company } from "@/lib/company";
import {
  OG_IMAGE,
  getDynamicOgImagePath,
  getDynamicTwitterImagePath,
  getOgImageAlt,
  getOgPageKeyFromPath,
  OG_PAGE_CONTENT,
} from "./config";

type SocialMetadataInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Builds Open Graph, Twitter, and LinkedIn-compatible image metadata.
 * LinkedIn reads og:image, og:title, og:description — same as Open Graph.
 */
export function buildSocialMetadata({
  title,
  description,
  path,
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const pageKey = getOgPageKeyFromPath(path);
  const ogContent = OG_PAGE_CONTENT[pageKey];
  const ogImagePath = getDynamicOgImagePath(pageKey);
  const twitterImagePath = getDynamicTwitterImagePath(pageKey);
  const alt = getOgImageAlt(ogContent);

  const ogImage = {
    url: ogImagePath,
    secureUrl: ogImagePath,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt,
    type: OG_IMAGE.contentType,
  };

  return {
    openGraph: {
      title,
      description,
      url: `${company.url}${path === "/" ? "" : path}`,
      siteName: company.shortName,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: twitterImagePath,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt,
        },
      ],
    },
  };
}
