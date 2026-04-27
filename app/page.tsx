import NeuralCanvas from "@/components/ui/NeuralCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SkillsSection from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import ProjectsSection from "@/components/sections/Projects";
import AchievementsSection from "@/components/sections/Achievements";
import BlogWrapper from "@/components/sections/BlogWrapper";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NeuralCanvas />
      <Navbar />
      <main>
        <Hero />
        <SkillsSection />
        <Timeline />
        <ProjectsSection />
        <AchievementsSection />
        <BlogWrapper />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
