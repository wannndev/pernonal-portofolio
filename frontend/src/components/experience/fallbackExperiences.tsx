import React from "react";
import type { GroupedExperience } from "./types";

export const fallbackExperiences: GroupedExperience[] = [
  {
    company: "Kalapa Technology",
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
        role: "IT Development",
        employment_type: "Intern",
        period: "Feb 2026 - Mei 2026",
        bullets: [
          "Merancang arsitektur design system komprehensif yang digunakan di seluruh aplikasi web enterprise.",
          "Melakukan riset pengujian pengguna mendalam dan prototipe berulang yang meningkatkan tingkat penyelesaian tugas hingga 35%.",
          "Berkolaborasi langsung dengan pimpinan tim engineering untuk serah terima komponen presisi tinggi di Next.js.",
        ],
        skills: ["Figma", "Design Systems", "User Research", "Next.js"],
      },
    ],
  },
  {
    company: "Jaritechnology Inovation",
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
        id: 3,
        role: "Software Developer",
        employment_type: "Penuh Waktu",
        period: "Juni 2026 - Present",
        bullets: [
          "Mengubah kebutuhan teknis kompleks menjadi antarmuka digital yang mudah digunakan.",
          "Menciptakan panduan identitas visual dan komponen layar responsif.",
          "Menyelesaikan 12+ proyek klien tepat waktu dengan ulasan memuaskan.",
        ],
        skills: ["UI Design", "Interaction Design", "Adobe XD"],
      },
    ],
  },
];
