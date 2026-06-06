import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Logo } from "@/components/brand/Logo";
import { company } from "@/lib/company";
import { mainNavLinks, primaryCta } from "@/lib/navigation";

type NavbarProps = {
  onMenuOpen: () => void;
  menuOpen?: boolean;
};

export function Navbar({ onMenuOpen, menuOpen = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <ContentContainer className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo showTagline className="shrink-0" />
        </div>

        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
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
          <a
            href={`tel:${company.phone.replace(/\D/g, "")}`}
            className="hidden h-11 items-center px-2 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-blue xl:inline-flex"
          >
            {company.phone}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold text-brand-navy lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={onMenuOpen}
        >
          Menu
        </button>
      </ContentContainer>
    </header>
  );
}
