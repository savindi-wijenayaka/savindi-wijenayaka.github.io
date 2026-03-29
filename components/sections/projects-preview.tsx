import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Link,
  Badge,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/section-title";
import { CardPanel } from "@/components/shared/card-panel";
import { AnimateIn } from "@/components/shared/animate-in";
import Projects from "@/data/projects";
import NextLink from "next/link";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";

const statusColor: Record<string, string> = {
  Live: "state.success",
  Research: "state.info",
  Archived: "fg.subtle",
};

export default function ProjectsPreview() {
  const featured = Projects.filter((p) => p.featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <Box as="section" id="projects" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Projects"
          subtitle="Selected work across research and industry"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 100}>
              <CardPanel p={6} h="full" display="flex" flexDirection="column">
                {/* Status badge */}
                <Flex justify="space-between" align="start" mb={3}>
                  <Badge
                    bg="bg.tag"
                    color={statusColor[project.status]}
                    fontFamily="body"
                    fontSize="2xs"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    px={2}
                    py={0.5}
                    borderRadius="none"
                    border="1px solid"
                    borderColor="border.rune"
                  >
                    {project.status}
                  </Badge>
                  <HStack gap={2}>
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="fg.subtle"
                        _hover={{ color: "accent.solid" }}
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <TbBrandGithub size={16} />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="fg.subtle"
                        _hover={{ color: "accent.solid" }}
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <TbExternalLink size={16} />
                      </Link>
                    )}
                  </HStack>
                </Flex>

                {/* Title + description */}
                <VStack align="start" gap={2} flex={1}>
                  <Heading
                    as="h3"
                    size="sm"
                    fontFamily="heading"
                    lineHeight="1.3"
                  >
                    {project.title}
                  </Heading>
                  <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="fg.muted"
                    lineHeight="1.7"
                    flex={1}
                  >
                    {project.description}
                  </Text>
                </VStack>

                {/* Tech stack */}
                <HStack gap={1.5} flexWrap="wrap" mt={4}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      bg="bg.subtle"
                      color="fg.subtle"
                      fontFamily="body"
                      fontSize="2xs"
                      letterSpacing="wider"
                      textTransform="uppercase"
                      px={2}
                      py={0.5}
                      borderRadius="none"
                    >
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </CardPanel>
            </AnimateIn>
          ))}
        </SimpleGrid>

        <Box mt={10} textAlign="center">
          <Link
            as={NextLink}
            href="/projects"
            fontFamily="body"
            fontSize="sm"
            color="accent.solid"
            letterSpacing="wider"
            textTransform="uppercase"
            _hover={{ textDecoration: "underline", color: "fg.accent" }}
            transition="color 0.2s"
          >
            View all projects ━━▶
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
