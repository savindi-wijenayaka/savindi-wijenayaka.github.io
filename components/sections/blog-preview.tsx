import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Link,
  Badge,
} from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/section-title";
import { CardPanel } from "@/components/shared/card-panel";
import { AnimateIn } from "@/components/shared/animate-in";
import BlogLinks from "@/data/blog-links";
import { getAllMdxPosts } from "@/lib/mdx";
import NextLink from "next/link";
import { TbExternalLink, TbArrowRight } from "react-icons/tb";

export default function BlogPreview() {
  const mdxPosts = getAllMdxPosts().slice(0, 3);
  const mediumPosts = BlogLinks.slice(0, 3);

  type LocalPost = (typeof mdxPosts)[number] & { isLocal: true };
  type ExternalPost = (typeof mediumPosts)[number] & { isLocal: false; slug?: undefined };

  // Merge and sort by date, take top 3
  const allPosts: (LocalPost | ExternalPost)[] = [
    ...mdxPosts.map((p): LocalPost => ({ ...p, isLocal: true })),
    ...mediumPosts.map((p): ExternalPost => ({ ...p, isLocal: false, slug: undefined })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const hasContent = allPosts.length > 0;

  return (
    <Box as="section" id="blog" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Blog"
          subtitle="Thoughts on machine learning, research, and engineering"
        />

        {!hasContent ? (
          <Box textAlign="center" py={8}>
            <Text fontFamily="body" fontSize="sm" color="fg.subtle" fontStyle="italic">
              Blog posts coming soon — check back or follow on Medium.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {allPosts.map((post, i) => {
              const isLocal = post.isLocal;
              const href = isLocal ? `/blog/${post.slug}` : post.url;

              return (
                <AnimateIn key={`${"source" in post ? post.source : "local"}-${post.slug ?? post.title}`} delay={i * 100}>
                  <CardPanel
                    p={6}
                    h="full"
                    display="flex"
                    flexDirection="column"
                    as="article"
                  >
                    {/* Date + source */}
                    <HStack gap={2} mb={3} justify="space-between">
                      <Text fontFamily="body" fontSize="2xs" color="fg.subtle" letterSpacing="wider">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                      {!isLocal && (
                        <Badge
                          bg="bg.emphasized"
                          color="fg.subtle"
                          fontFamily="body"
                          fontSize="2xs"
                          letterSpacing="wider"
                          textTransform="uppercase"
                          px={2}
                          py={0.5}
                          borderRadius="none"
                        >
                          Medium
                        </Badge>
                      )}
                    </HStack>

                    {/* Title */}
                    <Heading as="h3" size="sm" fontFamily="heading" mb={2} lineHeight="1.4" flex={1}>
                      <Link
                        href={href}
                        target={isLocal ? undefined : "_blank"}
                        rel={isLocal ? undefined : "noopener noreferrer"}
                        color="fg.default"
                        _hover={{ color: "accent.solid", textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </Heading>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <Text fontFamily="body" fontSize="sm" color="fg.muted" lineHeight="1.7" mb={4}>
                        {post.excerpt}
                      </Text>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <HStack gap={1.5} flexWrap="wrap" mb={4}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
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
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
                    )}

                    {/* Read link */}
                    <Link
                      href={href}
                      target={isLocal ? undefined : "_blank"}
                      rel={isLocal ? undefined : "noopener noreferrer"}
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
                      Read {isLocal ? <TbArrowRight /> : <TbExternalLink />}
                    </Link>
                  </CardPanel>
                </AnimateIn>
              );
            })}
          </SimpleGrid>
        )}

        <Box mt={10} textAlign="center">
          <Link
            as={NextLink}
            href="/blog"
            fontFamily="body"
            fontSize="sm"
            color="accent.solid"
            letterSpacing="wider"
            textTransform="uppercase"
            _hover={{ textDecoration: "underline", color: "fg.accent" }}
            transition="color 0.2s"
          >
            Read all posts ━━▶
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
