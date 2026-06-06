"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileNavigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
