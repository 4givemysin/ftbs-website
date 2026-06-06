import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Logo } from "@/components/brand/Logo";
import { BgwBadge } from "@/components/brand/BgwBadge";
import { mainNavLinks, primaryCta } from "@/lib/navigation";

type NavbarProps = {
  onMenuOpen: () => void;
};

export function Navbar({ onMenuOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <ContentContainer className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo showTagline={false} className="shrink-0" />
          <BgwBadge className="hidden lg:inline-flex" />
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
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold text-brand-navy lg:hidden"
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
