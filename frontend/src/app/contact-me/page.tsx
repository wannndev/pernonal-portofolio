"use client";

import React, { useState, useEffect } from "react";
import { getProfileInfo, type ProfileInfo } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "@/components/LanguageProvider";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactProfileCard } from "@/components/contact/ContactProfileCard";

export default function ContactMePage() {
  const { d } = useLanguage();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    getProfileInfo()
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to load profile in contact page:", err));
  }, []);

  return (
    <main className="relative flex flex-col overflow-x-clip *:scroll-mt-15.5">
      <section className="relative border-b border-border xl:flex">
        {/* Left Decorative Dot Grid */}
        <div className="m-6 w-full shrink-2 [background-image:radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] [background-size:18px_18px] max-xl:hidden" />

        {/* Center Main Content Container */}
        <div className="mx-auto max-w-6xl space-y-9 px-4 py-8 min-[1147px]:border-x border-border sm:px-6 sm:py-16 lg:px-8 lg:py-24 w-full">
          {/* Header */}
          <MotionPreset
            fade
            blur
            slide={{ direction: "up", offset: 30 }}
            delay={0.05}
            className="space-y-2.5"
          >
            <div>
              <span className="inline-flex w-fit shrink-0 items-center justify-center border border-border text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium bg-background">
                {d.contact.badge}
              </span>
            </div>
            <div className="flex justify-between gap-4 max-md:flex-col">
              <div className="max-w-[400px]">
                <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground">
                  <BlurText
                    key={d.contact.title}
                    text={d.contact.title}
                    delay={100}
                    className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground"
                  />
                </h1>
              </div>
              <div>
                <p className="text-muted-foreground max-w-[600px] text-lg sm:text-xl">
                  {d.contact.description}
                </p>
              </div>
            </div>
          </MotionPreset>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column: Contact Form */}
            <MotionPreset fade blur slide={{ direction: "up", offset: 40 }} delay={0.1}>
              <ContactForm d={d} />
            </MotionPreset>

            {/* Right Column: Profile Photo, Details, Socials */}
            <MotionPreset
              fade
              blur
              slide={{ direction: "up", offset: 40 }}
              delay={0.18}
            >
              <ContactProfileCard profile={profile} />
            </MotionPreset>
          </div>
        </div>

        {/* Right Decorative Dot Grid */}
        <div className="m-6 w-full shrink-2 [background-image:radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] [background-size:18px_18px] max-xl:hidden" />
      </section>
    </main>
  );
}
