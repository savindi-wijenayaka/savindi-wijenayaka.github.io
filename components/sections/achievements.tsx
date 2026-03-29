"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { SectionTitle } from "@/components/shared/section-title";
import { CardPanel } from "@/components/shared/card-panel";
import { AnimateIn } from "@/components/shared/animate-in";
import Achievements, { AchievementCategories } from "@/data/achievements";
import type { Achievement } from "@/data/achievements";

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [hovered, setHovered] = useState(false);

  return (
    <CardPanel
      p={0}
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <Box h="240px" overflow="hidden" bg="bg.subtle">
        <Image
          src={achievement.photo}
          alt={achievement.award}
          w="full"
          h="full"
          objectFit="cover"
        />
      </Box>

      {/* Text below photo */}
      <Box px={4} py={4} borderTop="1px solid" borderColor="border.subtle">
        <Heading as="h3" fontFamily="heading" fontSize="sm" mb={1}>
          {achievement.title}
        </Heading>
        <Text fontFamily="body" fontSize="xs" color="fg.default" letterSpacing="wide" mb={0.5}>
          {achievement.award}
          {achievement.level && (
            <Text as="span" fontSize="2xs" color="fg.default" fontStyle="italic" letterSpacing="wider">
              {" "}· {achievement.level}
            </Text>
          )}
        </Text>
        <Text fontFamily="body" fontSize="xs" color="fg.subtle" letterSpacing="wider" mb={0.5}>
          {achievement.year}{achievement.issuer && ` · ${achievement.issuer}`}
        </Text>
        {achievement.representing && (
          <Text fontFamily="body" fontSize="xs" color="fg.subtle" letterSpacing="wider" mt={0.5}>
            Rep. {achievement.representing}
          </Text>
        )}
      </Box>

      {/* Full-card hover overlay */}
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.800"
        zIndex={1}
        opacity={hovered ? 1 : 0}
        transition="opacity 0.25s ease-out"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={6}
        pointerEvents={hovered ? "auto" : "none"}
      >
        <Text
          fontFamily="body"
          fontSize="xs"
          color="white"
          textAlign="center"
          lineHeight="1.7"
          letterSpacing="wide"
          mb={achievement.projectUrl ? 3 : 0}
        >
          {achievement.description}
        </Text>
        {achievement.projectUrl && (
          <Link
            href={achievement.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            fontFamily="body"
            fontSize="2xs"
            color="accent.solid"
            letterSpacing="wider"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="center"
            gap={1}
            pointerEvents="auto"
            _hover={{ textDecoration: "underline" }}
          >
            View Project <TbExternalLink />
          </Link>
        )}
      </Box>
    </CardPanel>
  );
}

export default function AchievementsSection() {
  return (
    <Box as="section" id="achievements" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Achievements"
          subtitle="Highlights from engineering competitions and extracurricular activities"
        />

        <Tabs.Root defaultValue="Engineering" variant="enclosed" size="sm">
          <Tabs.List mb={8} borderColor="border.default">
            {AchievementCategories.map((cat) => (
              <Tabs.Trigger
                key={cat}
                value={cat}
                fontFamily="body"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                flexShrink={0}
                _selected={{
                  color: "accent.solid",
                  borderColor: "accent.border",
                  bg: "bg.emphasized",
                  boxShadow: "none",
                }}
                _hover={{ color: "fg.default" }}
              >
                {cat}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {AchievementCategories.map((cat) => {
            const items = Achievements.filter((a) => a.category === cat);
            return (
              <Tabs.Content key={cat} value={cat}>
                <AnimateIn>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {items.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </SimpleGrid>
                </AnimateIn>
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </Container>
    </Box>
  );
}
