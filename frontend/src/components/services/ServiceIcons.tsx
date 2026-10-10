"use client";

import React from "react";
import { Palette, Laptop, PenTool, Smartphone } from "lucide-react";

export function getServiceIcon(iconName?: string, defaultFallback: string = "palette"): React.ReactNode {
  const key = (iconName || defaultFallback).toLowerCase();
  if (key.includes("laptop") || key.includes("web") || key.includes("code")) {
    return <Laptop className="size-5 text-[var(--foreground)]" />;
  }
  if (key.includes("phone") || key.includes("mobile") || key.includes("app")) {
    return <Smartphone className="size-5 text-[var(--foreground)]" />;
  }
  if (key.includes("pen") || key.includes("tool") || key.includes("logo") || key.includes("draw")) {
    return <PenTool className="size-5 text-[var(--foreground)]" />;
  }
  if (key.includes("framer")) {
    return (
      <svg
        className="size-5 text-[var(--foreground)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7" />
      </svg>
    );
  }
  return <Palette className="size-5 text-[var(--foreground)]" />;
}
