import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <ContentContainer className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-600">
        The page you requested is not available. It may have moved or the address
        may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={routes.home.path}>Back to Home</Button>
        <Button href={routes.contact.path} variant="outline">
          Contact FTBS
        </Button>
      </div>
      <p className="mt-8 text-sm text-zinc-500">
        Looking for something specific? Try{" "}
        <Link href={routes.services.path} className="font-semibold text-brand-blue hover:text-brand-navy">
          Services
        </Link>
        ,{" "}
        <Link href={routes.faq.path} className="font-semibold text-brand-blue hover:text-brand-navy">
          FAQ
        </Link>
        , or{" "}
        <Link href={routes.capabilities.path} className="font-semibold text-brand-blue hover:text-brand-navy">
          Capability Statement
        </Link>
        .
      </p>
    </ContentContainer>
  );
}
