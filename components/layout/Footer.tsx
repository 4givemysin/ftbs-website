import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Logo } from "@/components/brand/Logo";
import { company, formattedAddress } from "@/lib/company";
import { paulGibbs } from "@/lib/leadership";
import { footerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-navy text-white">
      <ContentContainer className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <Logo href="/" variant="light" showTagline className="shrink-0" />
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {company.description}
            </p>
            <p className="mt-3">
              <Link
                href={routes.bgw.path}
                className="text-sm font-medium text-brand-gold-light hover:text-white"
              >
                BGW Construction division →
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold-light">
              Company
            </h2>
            <ul className="mt-4 space-y-1">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold-light">
              BGW Construction
            </h2>
            <ul className="mt-4 space-y-1">
              {footerNav.bgw.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold-light">
              Services
            </h2>
            <ul className="mt-4 space-y-1">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold-light">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                {paulGibbs.name}, {paulGibbs.ftbsTitle}
              </li>
              <li>{formattedAddress}</li>
              <li>Division: {company.division.name}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold-light">
              Legal
            </h2>
            <ul className="mt-4 space-y-1">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={`bottom-${link.href}`}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentContainer>
    </footer>
  );
}
