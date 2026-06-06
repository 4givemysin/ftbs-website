import { BgwVerticalPage, createBgwVerticalMetadata } from "@/components/bgw/BgwVerticalPage";
import { bgwVerticals } from "@/lib/content/bgw/verticals";

export const metadata = createBgwVerticalMetadata("bgwCommercial");

export default function BgwCommercialPage() {
  return <BgwVerticalPage content={bgwVerticals.commercial} seoKey="bgwCommercial" />;
}
