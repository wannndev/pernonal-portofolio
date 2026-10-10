"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "badge" | "standalone";
  size?: "sm" | "md" | "lg";
  textClassName?: string;
}

/**
 * WannDev Geometric "R" Mark
 */
export function WannDevIcon({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <>
      <img
        src="/images/logo-white.png"
        alt="WannDev Logo"
        className={`object-contain dark:hidden ${className}`}
      />
      <img
        src="/images/logo.png"
        alt="WannDev Logo"
        className={`object-contain hidden dark:block ${className}`}
      />
    </>
  );
}

export function BrandLogo({
  className = "",
  iconOnly = false,
  variant = "badge",
  size = "md",
  textClassName = "",
}: BrandLogoProps) {
  // Size presets
  const badgeSizes = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-8 h-8 rounded-xl",
    lg: "w-9 h-9 rounded-xl",
  };

  const imgSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5.5 h-5.5",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {variant === "badge" ? (
        <div
          className={`${badgeSizes[size]} bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-bold shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md p-1.5`}
        >
          {/* Light mode (dark badge background) -> use white logo */}
          <img
            src="/images/logo-white.png"
            alt="WannDev Logo"
            className={`${imgSizes[size]} object-contain dark:hidden`}
          />
          {/* Dark mode (white badge background) -> use black logo */}
          <img
            src="/images/logo.png"
            alt="WannDev Logo"
            className={`${imgSizes[size]} object-contain hidden dark:block`}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <img
            src="/images/logo.png"
            alt="WannDev Logo"
            className={`${imgSizes[size]} object-contain dark:hidden`}
          />
          <img
            src="/images/logo-white.png"
            alt="WannDev Logo"
            className={`${imgSizes[size]} object-contain hidden dark:block`}
          />
        </div>
      )}

      {!iconOnly && (
        <span
          className={`font-brand font-bold tracking-tight text-[var(--foreground)] flex items-center leading-none ${textSizes[size]} ${textClassName}`}
        >
          <span>WannDev</span>
        </span>
      )}
    </div>
  );
}

export default BrandLogo;
