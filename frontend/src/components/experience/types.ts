import React from "react";

export interface ExperienceRole {
  id: number | string;
  role: string;
  employment_type: string;
  period: string;
  bullets?: string[];
  skills?: string[];
}

export interface GroupedExperience {
  company: string;
  logo: React.ReactNode;
  roles: ExperienceRole[];
}
