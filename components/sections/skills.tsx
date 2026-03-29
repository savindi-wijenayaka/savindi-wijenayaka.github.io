import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/section-title";
import { CardPanel } from "@/components/shared/card-panel";
import { AnimateIn } from "@/components/shared/animate-in";
import Skills, { SkillCategories } from "@/data/skills";

function SkillItem({ name, icon: Icon }: { name: string; icon: React.ElementType }) {
  return (
    <VStack
      gap={2}
      p={3}
      w="full"
      h="full"
      borderRadius="sm"
      border="1px solid"
      borderColor="border.subtle"
      bg="bg.surface"
      transition="all 0.25s ease-out"
      cursor="default"
      _hover={{
        borderColor: "accent.border",
        bg: "bg.subtle",
        transform: "translateY(-2px)",
        boxShadow: "accent-glow",
      }}
      align="center"
    >
      <Box color="fg.accent" fontSize="2xl">
        <Icon />
      </Box>
      <Text
        fontFamily="body"
        fontSize="2xs"
        color="fg.muted"
        textAlign="center"
        letterSpacing="wider"
        textTransform="uppercase"
        lineHeight="1.3"
      >
        {name}
      </Text>
    </VStack>
  );
}

export default function SkillsSection() {
  return (
    <Box as="section" id="skills" py={{ base: 16, md: 24 }} bg="bg.surface">
      <Container maxW="5xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with regularly"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {SkillCategories.map((cat, i) => {
            const categorySkills = Skills.filter((s) => s.category === cat);
            return (
              <AnimateIn key={cat} delay={i * 80}>
                <CardPanel glowOnHover={false} p={5} h="full">
                  <Text
                    fontFamily="heading"
                    fontSize="sm"
                    color="fg.accent"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    mb={4}
                  >
                    {cat}
                  </Text>
                  <Flex flexWrap="wrap" justify="center" gap={2}>
                    {categorySkills.map((skill) => (
                      <Box key={skill.name} w="calc(33.33% - 5.5px)" flexShrink={0}>
                        <SkillItem
                          name={skill.name}
                          icon={skill.icon as React.ElementType}
                        />
                      </Box>
                    ))}
                  </Flex>
                </CardPanel>
              </AnimateIn>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
