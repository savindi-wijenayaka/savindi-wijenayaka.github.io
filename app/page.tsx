import { Box, Separator } from "@chakra-ui/react";
import Hero from "@/components/sections/hero";
import ExperienceSection from "@/components/sections/experience";
import SkillsSection from "@/components/sections/skills";
import AchievementsSection from "@/components/sections/achievements";
import ProjectsPreview from "@/components/sections/projects-preview";
import PublicationsPreview from "@/components/sections/publications-preview";
import BlogPreview from "@/components/sections/blog-preview";

export default function Home() {
  return (
    <Box bg="bg.canvas" color="fg.default">
      <Hero />
      <Separator borderColor="border.subtle" />
      <ExperienceSection />
      <Separator borderColor="border.subtle" />
      <SkillsSection />
      <Separator borderColor="border.subtle" />
      <AchievementsSection />
      <Separator borderColor="border.subtle" />
      <ProjectsPreview />
      <Separator borderColor="border.subtle" />
      <PublicationsPreview />
      <Separator borderColor="border.subtle" />
      <BlogPreview />
    </Box>
  );
}
