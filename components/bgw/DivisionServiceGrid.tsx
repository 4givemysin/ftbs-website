import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";
import { bgwDivision } from "@/lib/divisions";

const verticals = [
  {
    title: "Infrastructure",
    description: "Roads, public works, and essential infrastructure systems.",
    href: routes.bgwInfrastructure.path,
  },
  {
    title: "Commercial",
    description: "Commercial buildings and facilities built to specification.",
    href: routes.bgwCommercial.path,
  },
  {
    title: "Residential",
    description: "Housing and residential development for community growth.",
    href: routes.bgwResidential.path,
  },
  {
    title: "Future Development",
    description: "Long-term vision and partnership opportunities.",
    href: routes.bgwFutureDevelopment.path,
  },
];

export function DivisionServiceGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {verticals.map((item) => (
        <li key={item.href}>
          <Card className="h-full border-bgw-green/20 bg-gradient-to-br from-white to-bgw-green/5">
            <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
            <Link
              href={item.href}
              className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-bgw-green hover:text-bgw-earth"
            >
              Learn more →
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function InfrastructurePillars({ items }: { items: readonly { label: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.label}>
          <Card className="border-bgw-green/20 bg-white text-center shadow-none">
            <span
              aria-hidden
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-bgw-green/15 text-bgw-green"
            >
              ✓
            </span>
            <p className="mt-4 text-sm font-semibold text-brand-navy">{item.label}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function BgwParentLink() {
  return (
    <p className="text-sm text-zinc-500">
      {bgwDivision.name} is a division of{" "}
      <Link href={routes.about.path} className="font-semibold text-brand-blue hover:text-brand-navy">
        FTBS
      </Link>
      . Corporate capability materials are available on the{" "}
      <Link
        href={routes.capabilities.path}
        className="font-semibold text-brand-blue hover:text-brand-navy"
      >
        FTBS Capability Statement
      </Link>
      .
    </p>
  );
}
