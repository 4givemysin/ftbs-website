import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Logo } from "@/components/brand/Logo";
import { BgwBadge } from "@/components/brand/BgwBadge";
import { company, formattedAddress } from "@/lib/company";
import { paulGibbs } from "@/lib/leadership";
import { footerNav } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-navy text-white">
      <ContentContainer className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo href="/" variant="light" showTagline={false} className="shrink-0" />
            <div className="mt-3">
              <BgwBadge size="md" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {company.name} delivers construction project management and
              technology solutions for partners who require dependable,
              professional delivery.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Company
            </h2>
            <ul className="mt-4 space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                {paulGibbs.name}, {paulGibbs.title}
              </li>
              <li>{formattedAddress}</li>
              <li>Division: {company.division.name}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-zinc-400">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
}
