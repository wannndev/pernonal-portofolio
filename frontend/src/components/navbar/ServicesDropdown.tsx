"use client";

import React from "react";
import Link from "next/link";
import type { ServiceSubItem } from "./navbarData";

interface ServicesDropdownProps {
  productStrategyTitle: string;
  interfaceDeliveryTitle: string;
  productStrategyItems: ServiceSubItem[];
  interfaceDeliveryItems: ServiceSubItem[];
  onItemClick: () => void;
}

export function ServicesDropdown({
  productStrategyTitle,
  interfaceDeliveryTitle,
  productStrategyItems,
  interfaceDeliveryItems,
  onItemClick,
}: ServicesDropdownProps) {
  return (
    <div className="absolute top-full mt-2 -left-16 sm:-left-24 w-[480px] sm:w-[500px] p-2.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 z-50">
      <div className="grid grid-cols-2 gap-2">
        {/* Column 1: Product & UX Strategy */}
        <div>
          <p className="text-[11px] font-normal text-[var(--muted-foreground)] px-2 mb-1.5">
            {productStrategyTitle}
          </p>
          <div className="space-y-0.5">
            {productStrategyItems.map((sub) => (
              <Link
                key={sub.label}
                href={sub.href}
                onClick={onItemClick}
                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors group"
              >
                <div className="size-7 rounded-md border border-[var(--border)] bg-[var(--muted)]/40 group-hover:border-[var(--foreground)]/30 flex items-center justify-center shrink-0 text-[var(--foreground)] transition-colors mt-0.5">
                  {sub.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[var(--foreground)] group-hover:text-primary transition-colors leading-snug">
                    {sub.label}
                  </div>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 leading-tight line-clamp-2">
                    {sub.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Interface & Delivery */}
        <div>
          <p className="text-[11px] font-normal text-[var(--muted-foreground)] px-2 mb-1.5">
            {interfaceDeliveryTitle}
          </p>
          <div className="space-y-0.5">
            {interfaceDeliveryItems.map((sub) => (
              <Link
                key={sub.label}
                href={sub.href}
                onClick={onItemClick}
                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors group"
              >
                <div className="size-7 rounded-md border border-[var(--border)] bg-[var(--muted)]/40 group-hover:border-[var(--foreground)]/30 flex items-center justify-center shrink-0 text-[var(--foreground)] transition-colors mt-0.5">
                  {sub.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[var(--foreground)] group-hover:text-primary transition-colors leading-snug">
                    {sub.label}
                  </div>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 leading-tight line-clamp-2">
                    {sub.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
