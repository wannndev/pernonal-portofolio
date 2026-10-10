"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface StackImage {
  id: string | number;
  src: string;
  alt: string;
}

interface CyclingStackPreviewProps {
  images: StackImage[];
}

export function CyclingStackPreview({ images }: CyclingStackPreviewProps) {
  const [cards, setCards] = useState(images);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setCards(images);
  }, [images]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      className="relative h-56 sm:h-[242px] w-full max-w-full mt-4 sm:mt-6 cursor-pointer select-none overflow-hidden min-w-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setCards((prev) => {
          const next = [...prev];
          next.unshift(next.pop()!);
          return next;
        });
      }}
    >
      {cards.map((card, r) => (
        <motion.div
          key={card.id}
          className="absolute left-1/2 w-full max-w-full -translate-x-1/2"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: -((r - 2) * 10),
            scale: 1 - 0.05 * r,
            opacity: 1 - 0.2 * r,
            zIndex: cards.length - r,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <img
            src={card.src}
            alt={card.alt}
            className="h-44 sm:h-[206px] w-full max-w-full rounded-xl object-cover border border-[var(--border)] shadow-md bg-[var(--card)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
