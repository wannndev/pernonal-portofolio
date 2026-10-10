"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { Moon, Sun, MessageSquare, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useScrollSpy } from "./navbar/useScrollSpy";
import { LanguageSwitcher } from "./navbar/LanguageSwitcher";
import { ServicesDropdown } from "./navbar/ServicesDropdown";
import { MobileDrawer } from "./navbar/MobileDrawer";
import {
  getNavLinks,
  getProductStrategyItems,
  getInterfaceDeliveryItems,
} from "./navbar/navbarData";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { d } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();

  const sectionIds = useMemo(() => ["services", "about", "experience", "projects"], []);
  const activeSection = useScrollSpy(sectionIds);

  const productStrategyItems = useMemo(() => getProductStrategyItems(d), [d]);
  const interfaceDeliveryItems = useMemo(() => getInterfaceDeliveryItems(d), [d]);
  const navLinks = useMemo(() => getNavLinks(d), [d]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => {
            if (item.hasDropdown) {
              const isServicesActive = pathname === "/" && activeSection === "services";
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (pathname === "/") {
                        const el = document.getElementById("services");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#services";
                      }
                    }}
                    className={`flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)] cursor-pointer py-1 ${
                      isServicesActive
                        ? "text-[var(--foreground)] font-semibold"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {servicesDropdown && (
                    <ServicesDropdown
                      productStrategyTitle={d.nav.productStrategy}
                      interfaceDeliveryTitle={d.nav.interfaceDelivery}
                      productStrategyItems={productStrategyItems}
                      interfaceDeliveryItems={interfaceDeliveryItems}
                      onItemClick={() => setServicesDropdown(false)}
                    />
                  )}
                </div>
              );
            }

            const sectionId = item.href.startsWith("/#")
              ? item.href.slice(2)
              : item.href.startsWith("#")
              ? item.href.slice(1)
              : "";

            const isActive =
              pathname === "/"
                ? sectionId === "about"
                  ? activeSection === "about" || activeSection === "experience"
                  : activeSection === sectionId
                : pathname === item.href ||
                  (item.href === "/portfolio" && pathname.startsWith("/portfolio")) ||
                  (item.href === "/certificates" && pathname.startsWith("/certificates"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-[var(--foreground)] ${
                  isActive
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--muted-foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher variant="desktop" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          {/* Let's talk CTA */}
          <Link
            href="/contact-me"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
          >
            <span>{d.nav.letsTalk}</span>
            <MessageSquare className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
        pathname={pathname}
        productStrategyTitle={d.nav.productStrategy}
        interfaceDeliveryTitle={d.nav.interfaceDelivery}
        productStrategyItems={productStrategyItems}
        interfaceDeliveryItems={interfaceDeliveryItems}
        letsTalkLabel={d.nav.letsTalk}
      />
    </header>
  );
}
