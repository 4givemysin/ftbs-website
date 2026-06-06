import { BgwVerticalPage, createBgwVerticalMetadata } from "@/components/bgw/BgwVerticalPage";
import { bgwVerticals } from "@/lib/content/bgw/verticals";

export const metadata = createBgwVerticalMetadata("bgwResidential");

export default function BgwResidentialPage() {
  return <BgwVerticalPage content={bgwVerticals.residential} seoKey="bgwResidential" />;
}
