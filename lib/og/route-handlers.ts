import {
  OG_IMAGE,
  getOgImageAlt,
  type OgImageContent,
  type OgPageKey,
} from "./config";
import { generateOgImage } from "./generate-og-image";

export const ogImageSize = {
  width: OG_IMAGE.width,
  height: OG_IMAGE.height,
};

export const ogImageContentType = OG_IMAGE.contentType;

export function createOgImageRoute(pageKey: OgPageKey, content: OgImageContent) {
  return {
    alt: getOgImageAlt(content),
    size: ogImageSize,
    contentType: ogImageContentType,
    Image: async () => generateOgImage(content),
  };
}
