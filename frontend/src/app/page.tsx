import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import {
  getProfileInfo,
  getPortfolioProjects,
  getServices,
  getExperiences,
  getProjectsShowcase,
  getBrandLogos,
  getDesignTools,
} from "@/lib/api";

export default async function HomePage() {
  const [
    profile,
    portfolioProjects,
    services,
    experiences,
    projectsShowcase,
    brandLogos,
    designTools,
  ] = await Promise.all([
    getProfileInfo(),
    getPortfolioProjects(),
    getServices(),
    getExperiences(),
    getProjectsShowcase(),
    getBrandLogos(),
    getDesignTools(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection profile={profile} brandLogos={brandLogos} />
      <PortfolioSection projects={portfolioProjects} />
      <ServicesSection
        services={services}
        skillsRow1={profile?.skills_row1}
        skillsRow2={profile?.skills_row2}
      />
      <AboutSection profile={profile} tools={designTools} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projectsShowcase} />
    </div>
  );
}
