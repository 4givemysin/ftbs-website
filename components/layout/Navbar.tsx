import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { mainNavLinks, primaryCta } from "@/lib/navigation";
import { company } from "@/lib/company";

type NavbarProps = {
  onMenuOpen: () => void;
};

export function Navbar({ onMenuOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <ContentContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-brand-navy">
            {company.shortName}
          </span>
          <span className="hidden text-xs text-zinc-600 sm:block">
            Finesse Technology Business Solutions
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-navy"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            className="inline-flex min-h-11 items-center rounded-md bg-brand-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue"
          >
            {primaryCta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold text-brand-navy md:hidden"
          aria-label="Open menu"
          aria-expanded={false}
          aria-controls="mobile-navigation"
          onClick={onMenuOpen}
        >
          Menu
        </button>
      </ContentContainer>
    </header>
  );
}
