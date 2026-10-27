import type { Metadata } from "next";
import NeuralCanvas from "@/components/ui/NeuralCanvas";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SkillsSection from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import ProjectsSection from "@/components/sections/Projects";
import AchievementsSection from "@/components/sections/Achievements";
import BlogWrapper from "@/components/sections/BlogWrapper";
import Contact from "@/components/sections/Contact";
import FullpageScroll from "@/components/ui/FullpageScroll";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <NeuralCanvas />
      <Navbar />
      <FullpageScroll
        slides={[
          <Hero key="hero" />,
          <SkillsSection key="skills" />,
          <Timeline key="timeline" />,
          <ProjectsSection key="projects" />,
          <AchievementsSection key="achievements" />,
          <BlogWrapper key="blog" />,
          <Contact key="contact" />,
        ]}
      />
    </>
  );
}
