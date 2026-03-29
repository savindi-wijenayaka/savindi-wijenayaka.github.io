import { Box, Separator } from "@chakra-ui/react";
import Hero from "@/components/sections/hero";
import ExperiencePreview from "@/components/sections/experience-preview";
import SkillsSection from "@/components/sections/skills";
import ProjectsPreview from "@/components/sections/projects-preview";
import PublicationsPreview from "@/components/sections/publications-preview";
import BlogPreview from "@/components/sections/blog-preview";

export default function Home() {
  return (
    <Box bg="bg.canvas" color="fg.default">
      <Hero />
      <Separator borderColor="border.subtle" />
      <ExperiencePreview />
      <Separator borderColor="border.subtle" />
      <SkillsSection />
      <Separator borderColor="border.subtle" />
      <ProjectsPreview />
      <Separator borderColor="border.subtle" />
      <PublicationsPreview />
      <Separator borderColor="border.subtle" />
      <BlogPreview />
    </Box>
  );
}
