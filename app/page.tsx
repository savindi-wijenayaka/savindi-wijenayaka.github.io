import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import ExperienceSection from "@/components/sections/Experience";
import ResearchSection from "@/components/sections/Research";
import SkillsSection from "@/components/sections/Skills";
import AchievementsSection from "@/components/sections/Achievements";
import BlogWrapper from "@/components/sections/BlogWrapper";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchSection />
        <SkillsSection />
        <AchievementsSection />
        <BlogWrapper />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
