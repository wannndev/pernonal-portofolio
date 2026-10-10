"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId("");
    }
  }, [pathname]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionIds.includes(hash)) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [sectionIds]);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const ratioDiff = b.intersectionRatio - a.intersectionRatio;
            return ratioDiff !== 0
              ? ratioDiff
              : a.boundingClientRect.top - b.boundingClientRect.top;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        } else if (window.scrollY < 200) {
          setActiveId("");
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, pathname]);

  return activeId;
}
