import { BgwVerticalPage, createBgwVerticalMetadata } from "@/components/bgw/BgwVerticalPage";
import { bgwVerticals } from "@/lib/content/bgw/verticals";

export const metadata = createBgwVerticalMetadata("bgwFutureDevelopment");

export default function BgwFutureDevelopmentPage() {
  return <BgwVerticalPage content={bgwVerticals.futureDevelopment} seoKey="bgwFutureDevelopment" />;
}
