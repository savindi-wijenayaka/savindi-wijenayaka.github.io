import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Machine learning and software engineering projects by Savindi Wijenayaka, including AI-based anomaly detection, medical image analysis, and cloud-native AI systems.",
  openGraph: {
    title: "Projects | Savindi Wijenayaka",
    description:
      "Machine learning and software engineering projects by Savindi Wijenayaka.",
    url: "https://savindi.com/projects",
  },
  alternates: { canonical: "https://savindi.com/projects" },
};

/**
 * TO POPULATE THIS PAGE:
 * 1. Edit data/projects.ts — add real project objects following the schema below
 * 2. Set featured: true on up to 3 projects (shown on home page)
 * 3. Replace <ComingSoon> below with <ProjectsGrid /> (create that component)
 *
 * Schema: { id, title, description, longDescription?, techStack[], githubUrl?, liveUrl?, featured, status }
 */
export default function ProjectsPage() {
  return (
    <Box bg="bg.canvas">
      <ComingSoon
        title="Projects"
        description="A curated selection of machine learning research projects, cloud-native AI systems, and software engineering work. Coming soon."
        dataFile="data/projects.ts"
        dataSchema={{
          id: "string — unique slug",
          title: "string — project name",
          description: "string — one-sentence summary",
          techStack: "string[] — technology names",
          githubUrl: "string? — GitHub repo URL",
          liveUrl: "string? — live demo URL",
          featured: "boolean — show on home page if true",
          status: '"Live" | "Research" | "Archived"',
        }}
        componentToUncomment="ProjectsGrid"
      />
    </Box>
  );
}
