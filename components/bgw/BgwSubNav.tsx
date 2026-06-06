"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bgwNav } from "@/lib/navigation";

export function BgwSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="BGW Construction section"
      className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {bgwNav.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/bgw" && pathname.startsWith(`${link.href}/`));
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 border-b-2 px-3 py-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
                isActive
                  ? "border-bgw-green text-bgw-earth"
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
