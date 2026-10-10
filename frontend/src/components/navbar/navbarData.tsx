import React from "react";
import type { TranslationsType } from "@/locales";

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ServiceSubItem {
  label: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

export function getProductStrategyItems(d: TranslationsType): ServiceSubItem[] {
  return [
    {
      label: d.nav.items.uiUx.title,
      desc: d.nav.items.uiUx.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      ),
    },
    {
      label: d.nav.items.brandIdentity.title,
      desc: d.nav.items.brandIdentity.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="m2 2 7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
    },
    {
      label: d.nav.items.wireframing.title,
      desc: d.nav.items.wireframing.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <line x1="4" x2="20" y1="9" y2="9"></line>
          <line x1="4" x2="20" y1="15" y2="15"></line>
          <line x1="10" x2="8" y1="3" y2="21"></line>
          <line x1="16" x2="14" y1="3" y2="21"></line>
        </svg>
      ),
    },
  ];
}

export function getInterfaceDeliveryItems(d: TranslationsType): ServiceSubItem[] {
  return [
    {
      label: d.nav.items.framer.title,
      desc: d.nav.items.framer.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M5 2h14v7h-7l7 7H5l7-7H5V2z" />
        </svg>
      ),
    },
    {
      label: d.nav.items.landingPage.title,
      desc: d.nav.items.landingPage.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
      ),
    },
    {
      label: d.nav.items.mobileApp.title,
      desc: d.nav.items.mobileApp.desc,
      href: "/#services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
          <path d="M12 18h.01"></path>
        </svg>
      ),
    },
  ];
}

export function getNavLinks(d: TranslationsType): NavItem[] {
  return [
    { label: d.nav.portfolio, href: "/portfolio" },
    {
      label: d.nav.services,
      href: "/#services",
      hasDropdown: true,
    },
    { label: d.nav.about, href: "/#about" },
    { label: d.nav.projects, href: "/#projects" },
    { label: d.nav.certificates, href: "/certificates" },
  ];
}
