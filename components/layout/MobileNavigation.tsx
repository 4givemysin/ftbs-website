"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mainNavLinks, primaryCta } from "@/lib/navigation";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-navy/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <nav className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl" id="mobile-navigation">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <span className="text-base font-bold text-brand-navy">Navigation</span>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold"
            onClick={onClose}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-1 p-4">
          {mainNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-md px-4 py-3 text-base font-medium text-zinc-800 hover:bg-surface-alt"
                onClick={onClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link
              href={primaryCta.href}
              className="block rounded-md bg-brand-navy px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-blue"
              onClick={onClose}
            >
              {primaryCta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
