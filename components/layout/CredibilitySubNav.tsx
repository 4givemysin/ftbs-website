"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { credibilityNav } from "@/lib/navigation";

const credibilityPaths = new Set(credibilityNav.map((link) => link.href));

export function CredibilitySubNav() {
  const pathname = usePathname();

  if (!credibilityPaths.has(pathname)) {
    return null;
  }

  return (
    <nav aria-label="Credibility resources" className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {credibilityNav.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 border-b-2 px-3 py-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
                isActive
                  ? "border-brand-navy text-brand-navy"
                  : "border-transparent text-zinc-500 hover:border-border hover:text-brand-navy"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
