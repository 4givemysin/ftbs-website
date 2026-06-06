import { BgwVerticalPage, createBgwVerticalMetadata } from "@/components/bgw/BgwVerticalPage";
import { bgwVerticals } from "@/lib/content/bgw/verticals";

export const metadata = createBgwVerticalMetadata("bgwInfrastructure");

export default function BgwInfrastructurePage() {
  return <BgwVerticalPage content={bgwVerticals.infrastructure} seoKey="bgwInfrastructure" />;
}
