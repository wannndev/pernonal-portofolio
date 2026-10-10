"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavItem, ServiceSubItem } from "./navbarData";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  activeSection: string;
  pathname: string;
  productStrategyTitle: string;
  interfaceDeliveryTitle: string;
  productStrategyItems: ServiceSubItem[];
  interfaceDeliveryItems: ServiceSubItem[];
  letsTalkLabel: string;
}

export function MobileDrawer({
  open,
  onClose,
  navLinks,
  activeSection,
  pathname,
  productStrategyTitle,
  interfaceDeliveryTitle,
  productStrategyItems,
  interfaceDeliveryItems,
  letsTalkLabel,
}: MobileDrawerProps) {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="md:hidden border-b border-[var(--border)] bg-[var(--background)] px-4 py-5 space-y-3">
      {/* Mobile Language Switcher Row */}
      <LanguageSwitcher variant="mobile" />

      {navLinks.map((item) => {
        if (item.hasDropdown) {
          return (
            <div key={item.href} className="border-b border-[var(--border)]/40 pb-2">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-2 text-base font-medium text-[var(--foreground)]"
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-2 pt-2 space-y-3">
                  <div>
                    <p className="text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                      {productStrategyTitle}
                    </p>
                    <div className="space-y-1">
                      {productStrategyItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={onClose}
                          className="flex items-center gap-2 py-1 text-sm text-[var(--foreground)]"
                        >
                          <div className="size-6 rounded-md border border-[var(--border)] flex items-center justify-center shrink-0">
                            {sub.icon}
                          </div>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                      {interfaceDeliveryTitle}
                    </p>
                    <div className="space-y-1">
                      {interfaceDeliveryItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={onClose}
                          className="flex items-center gap-2 py-1 text-sm text-[var(--foreground)]"
                        >
                          <div className="size-6 rounded-md border border-[var(--border)] flex items-center justify-center shrink-0">
                            {sub.icon}
                          </div>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
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
            onClick={onClose}
            className={`block py-2 text-base transition-colors ${
              isActive
                ? "font-semibold text-[var(--foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <div className="pt-3 border-t border-[var(--border)]">
        <Link
          href="/contact-me"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium shadow-xs"
        >
          <span>{letsTalkLabel}</span>
          <MessageSquare className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
