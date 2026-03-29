"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/section-title";
import { AnimateIn } from "@/components/shared/animate-in";
import Experience from "@/data/experience";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";

export default function ExperienceSection() {
  const preview = Experience;
  const DISABLED_IDS = ["auror"];
  const [openId, setOpenId] = useState<string | null>("wso2");

  function toggle(id: string) {
    if (DISABLED_IDS.includes(id)) return;
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <Box as="section" id="experience" py={{ base: 16, md: 24 }}>
      <Container maxW="4xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Experience"
          subtitle="A selection of roles across research and industry"
        />

        {/* Timeline */}
        <VStack gap={0} align="stretch" position="relative">
          {/* Vertical line */}
          <Box
            position="absolute"
            left={{ base: "11px", md: "15px" }}
            top="8px"
            bottom="8px"
            width="1px"
            bg="border.default"
          />

          {preview.map((entry, i) => {
            const isOpen = openId === entry.id;
            return (
              <AnimateIn key={entry.id} delay={i * 120}>
                <Flex gap={{ base: 5, md: 8 }} mb={i < preview.length - 1 ? 10 : 0}>
                  {/* Diamond node */}
                  <Box flexShrink={0} pt="3px">
                    <Box
                      w={{ base: "22px", md: "30px" }}
                      h={{ base: "22px", md: "30px" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      zIndex={1}
                    >
                      <Text
                        color="fg.rune"
                        fontSize={{ base: "lg", md: "xl" }}
                        lineHeight="1"
                        className="glow-pulse"
                      >
                        ◈
                      </Text>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box
                    flex={1}
                    pb={2}
                    onClick={() => toggle(entry.id)}
                    cursor={DISABLED_IDS.includes(entry.id) ? "default" : "pointer"}
                  >
                    {/* Header row: date + chevron */}
                    <Flex justify="space-between" align="start">
                      <Text
                        fontFamily="body"
                        fontSize="xs"
                        color="fg.subtle"
                        letterSpacing="wider"
                        mb={1}
                      >
                        {entry.dateRange}
                      </Text>
                      {!DISABLED_IDS.includes(entry.id) && (
                        <IconButton
                          aria-label={isOpen ? "Collapse" : "Expand"}
                          variant="ghost"
                          size="xs"
                          color="fg.subtle"
                          pointerEvents="none"
                          mt="-2px"
                        >
                          {isOpen ? <TbChevronDown /> : <TbChevronRight />}
                        </IconButton>
                      )}
                    </Flex>

                    {/* Role + Company */}
                    <Heading
                      as="h3"
                      size={{ base: "md", md: "lg" }}
                      fontFamily="heading"
                      mb={0.5}
                    >
                      {entry.role}
                    </Heading>
                    <Text
                      fontFamily="body"
                      fontSize="sm"
                      color="accent.solid"
                      fontWeight="medium"
                      mb={3}
                    >
                      {entry.company}
                    </Text>

                    {/* Description — only when open */}
                    {isOpen && (
                      <VStack align="start" gap={2} mb={4}>
                        {entry.description.map((highlight, j) => (
                          <Flex key={j} gap={2} align="start">
                            <Text color="fg.subtle" mt="2px" flexShrink={0} fontSize="xs">
                              ▸
                            </Text>
                            <Text
                              fontFamily="body"
                              fontSize="sm"
                              color="fg.muted"
                              lineHeight="1.7"
                            >
                              {highlight}
                            </Text>
                          </Flex>
                        ))}
                      </VStack>
                    )}

                    {/* Tech stack badges — always visible */}
                    <HStack gap={2} flexWrap="wrap">
                      {entry.techStack.slice(0, 5).map((tech) => (
                        <Badge
                          key={tech}
                          bg="bg.tag"
                          color="fg.accent"
                          fontFamily="body"
                          fontSize="2xs"
                          letterSpacing="wider"
                          px={2}
                          py={0.5}
                          borderRadius="none"
                          border="1px solid"
                          borderColor="border.rune"
                          textTransform="uppercase"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                </Flex>
              </AnimateIn>
            );
          })}
        </VStack>

      </Container>
    </Box>
  );
}
