import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Badge,
} from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/section-title";
import { CardPanel } from "@/components/shared/card-panel";
import { AnimateIn } from "@/components/shared/animate-in";
import Publications from "@/data/publications";
import NextLink from "next/link";
import { TbExternalLink } from "react-icons/tb";

export default function PublicationsPreview() {
  const featured = Publications.filter((p) => p.featured).slice(0, 2);

  return (
    <Box as="section" id="publications" py={{ base: 16, md: 24 }} bg="bg.surface">
      <Container maxW="5xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Publications"
          subtitle="Peer-reviewed research in machine learning and bioengineering"
        />

        {featured.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text fontFamily="body" fontSize="sm" color="fg.subtle" fontStyle="italic">
              Publications coming soon — research is in progress.
            </Text>
          </Box>
        ) : (
          <VStack gap={5} align="stretch">
            {featured.map((pub, i) => (
              <AnimateIn key={pub.id} delay={i * 100}>
                <CardPanel p={6}>
                  {/* Year + venue */}
                  <HStack gap={3} mb={3} flexWrap="wrap">
                    <Badge
                      bg="bg.emphasized"
                      color="fg.accent"
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
                      {pub.year}
                    </Badge>
                    <Text fontFamily="body" fontSize="xs" color="fg.subtle">
                      {pub.venue}
                    </Text>
                  </HStack>

                  {/* Title */}
                  <Heading as="h3" size="sm" fontFamily="heading" mb={2} lineHeight="1.4">
                    {pub.doiUrl ? (
                      <Link
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="fg.default"
                        _hover={{ color: "accent.solid", textDecoration: "underline" }}
                      >
                        {pub.title}
                      </Link>
                    ) : (
                      pub.title
                    )}
                  </Heading>

                  {/* Authors */}
                  <Text fontFamily="body" fontSize="xs" color="fg.subtle" mb={3}>
                    {pub.authors.join(", ")}
                  </Text>

                  {/* Abstract excerpt */}
                  <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="fg.muted"
                    lineHeight="1.7"
                    mb={4}
                    css={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {pub.abstract}
                  </Text>

                  {/* DOI link */}
                  {pub.doiUrl && (
                    <Link
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fontFamily="body"
                      fontSize="xs"
                      color="accent.solid"
                      letterSpacing="wider"
                      textTransform="uppercase"
                      _hover={{ textDecoration: "underline" }}
                      display="inline-flex"
                      alignItems="center"
                      gap={1}
                    >
                      View paper <TbExternalLink />
                    </Link>
                  )}
                </CardPanel>
              </AnimateIn>
            ))}
          </VStack>
        )}

        <Box mt={10} textAlign="center">
          <Link
            as={NextLink}
            href="/publications"
            fontFamily="body"
            fontSize="sm"
            color="accent.solid"
            letterSpacing="wider"
            textTransform="uppercase"
            _hover={{ textDecoration: "underline", color: "fg.accent" }}
            transition="color 0.2s"
          >
            View all publications ━━▶
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
