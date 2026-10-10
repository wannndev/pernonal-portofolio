"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { TestimonialItem } from "@/lib/api";

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const defaultTestimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Marley Calzoni",
      role: "Design Director",
      company: "NextGen Media",
      avatar: "/images/about/image-21.webp",
      rating: 5,
      comment: "John delivered an extraordinary portfolio redesign that completely transformed our market positioning. His ability to fuse aesthetic finesse with high-performance Next.js code is world-class.",
      sort_order: 1,
    },
    {
      id: 2,
      name: "Tony Stark",
      role: "Founder & CTO",
      company: "Arc Tech Labs",
      avatar: "/images/about/image-22.webp",
      rating: 5,
      comment: "Working with John felt like working with a high-caliber design studio. The attention to detail in micro-interactions and dark mode implementation was flawless. Our conversion rate surged by 38% after release.",
      sort_order: 2,
    },
    {
      id: 3,
      name: "Bruce Wayne",
      role: "Managing Partner",
      company: "Wayne Ventures",
      avatar: "/images/about/image-25.webp",
      rating: 5,
      comment: "Finding someone who can both design high-end Figma concepts and architect a bulletproof Laravel 11 + MySQL API is almost unheard of. John is the complete package.",
      sort_order: 3,
    },
  ];

  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  };

  const active = items[currentIndex];

  return (
    <section id="testimonials" className="relative border-y border-[var(--border)] bg-dot-pattern">
      <div className="mx-auto flex w-full max-w-6xl grow flex-col gap-12 px-4 py-8 lg:border-x border-[var(--border)] bg-[var(--background)] md:px-6 md:py-16 lg:px-8 xl:shrink-0">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--card)]">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            What Clients Say About My Work
          </h2>
          <p className="text-base text-[var(--muted-foreground)]">
            Real feedback from founders, product leaders, and design executives.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)]">50+</span>
            <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-2 font-semibold">
              Happy Clients
            </p>
          </div>
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)]">$50M+</span>
            <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-2 font-semibold">
              Revenue Generated
            </p>
          </div>
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)]">4.9 / 5</span>
            <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-2 font-semibold">
              Average Rating
            </p>
          </div>
        </div>

        {/* Interactive Testimonial Spotlight */}
        <div className="relative max-w-3xl mx-auto">
          {/* Card Frame */}
          <div className="p-8 sm:p-12 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl relative overflow-hidden">
            {/* Background Quote Icon */}
            <Quote className="absolute top-6 right-6 w-20 h-20 text-[var(--secondary)] -z-0 opacity-40" />

            <div className="relative z-10 space-y-6">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(Math.max(1, Math.min(5, Math.round(active?.rating || 5))))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--foreground)] leading-relaxed italic">
                &ldquo;{(active as any).comment || (active as any).content}&rdquo;
              </p>

              {/* Author Info & Nav Buttons */}
              <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--border)] relative bg-zinc-200 dark:bg-zinc-800 shrink-0 flex items-center justify-center font-bold text-xs text-[var(--foreground)]">
                    {active.avatar && (active.avatar.startsWith("/") || active.avatar.startsWith("http")) ? (
                      <Image
                        src={active.avatar}
                        alt={active.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span>{active.avatar || active.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[var(--foreground)]">{active.name}</h4>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {active.role} • {active.company}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous Testimonial"
                    className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next Testimonial"
                    className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[var(--foreground)]" : "w-2 bg-[var(--border)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
