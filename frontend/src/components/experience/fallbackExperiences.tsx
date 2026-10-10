import React from "react";
import type { GroupedExperience } from "./types";

export const fallbackExperiences: GroupedExperience[] = [
  {
    company: "UX studio",
    logo: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3C0 1.34315 1.34315 0 3 0H21V15C21 18.3137 18.3137 21 15 21H0V3Z" fill="currentColor" />
        <rect x="13.3657" y="10.2407" width="3.15" height="9.66" rx="1.575" transform="rotate(60 13.3657 10.2407)" fill="white" />
        <rect x="14.7312" y="4" width="3.15" height="9.66" rx="1" transform="rotate(60 14.7312 4)" fill="white" />
      </svg>
    ),
    roles: [
      {
        id: 1,
        role: "Sr. UX Designer",
        employment_type: "Full-time",
        period: "2025- Present",
        bullets: [
          "Lead end-to-end design strategy for scalable multi-platform digital products.",
          "Architect unified design systems and collaborate across cross-functional engineering pods.",
          "Conduct data-informed UX research and usability validation with global audiences.",
        ],
        skills: ["Design Systems", "Figma", "User Research", "Next.js"],
      },
      {
        id: 2,
        role: "Jr. UX Designer",
        employment_type: "Full-time",
        period: "2024 - 2025",
        bullets: [
          "Expert in creating user-centered and intuitive digital experiences.",
          "Skilled in wireframing, prototyping, and interactive design.",
          "Strong eye for visual design, layout, and consistency.",
          "Collaborative problem-solver focused on seamless user journeys.",
        ],
        skills: ["UI Design", "Mobile app Design", "Website UI Design"],
      },
      {
        id: 3,
        role: "UI/UX Designer",
        employment_type: "Full-time",
        period: "2023 - 2024",
        bullets: [
          "Transformed complex technical requirements into user-friendly digital interfaces.",
          "Created visual identity guidelines and responsive screen components.",
          "Delivered 12+ client projects on schedule with stellar reviews.",
        ],
        skills: ["UI Design", "Interaction Design", "Adobe XD"],
      },
    ],
  },
  {
    company: "Creative Team",
    logo: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="21" height="21" rx="5" fill="currentColor" />
        <ellipse cx="10.0043" cy="11.0044" rx="8.25208" ry="4.48202" transform="rotate(-135 10.0043 11.0044)" fill="white" />
        <line x1="16.3536" y1="8.91459" x2="11.3536" y2="13.9146" stroke="black" />
        <line x1="15.3536" y1="6.91459" x2="9.35355" y2="12.9146" stroke="black" />
        <line x1="15.3536" y1="6.91459" x2="13.3536" y2="8.91459" stroke="white" />
        <line x1="16.3536" y1="8.91459" x2="14.3536" y2="10.9146" stroke="white" />
      </svg>
    ),
    roles: [
      {
        id: 4,
        role: "UI Designer",
        employment_type: "Full-time",
        period: "2022 - 2023",
        bullets: [
          "Focused on visual assets, graphic branding, and responsive layout styling.",
          "Crafted marketing website layouts and email campaign graphics.",
          "Optimized digital assets for fast web delivery and responsive scaling.",
        ],
        skills: ["Figma", "Canva", "Photoshop"],
      },
      {
        id: 5,
        role: "Intern UI Designer",
        employment_type: "Full-time",
        period: "2021 - 2022",
        bullets: [
          "Passionate about crafting clean, user-friendly interface designs.",
          "Skilled in wireframing, prototyping, and basic usability testing.",
          "Familiar with design tools like Figma, Adobe XD, and Sketch.",
          "Eager to learn, collaborate, and grow in real-world design projects.",
        ],
        skills: ["Figma", "Design Systems", "Canva", "Adobe XD", "Sketch"],
      },
    ],
  },
];
