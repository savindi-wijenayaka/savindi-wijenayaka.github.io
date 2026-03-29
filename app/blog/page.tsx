import type { Metadata } from "next";
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
import BlogLinks from "@/data/blog-links";
import { getAllMdxPosts } from "@/lib/mdx";
import { TbExternalLink, TbArrowRight } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and technical writing by Savindi Wijenayaka on machine learning, deep learning, computer vision, and software engineering.",
  openGraph: {
    title: "Blog | Savindi Wijenayaka",
    description:
      "Articles and technical writing by Savindi Wijenayaka on machine learning, deep learning, computer vision, and software engineering.",
    url: "https://savindi.com/blog",
  },
  alternates: { canonical: "https://savindi.com/blog" },
};

export default function BlogPage() {
  const mdxPosts = getAllMdxPosts();
  const mediumPosts = BlogLinks;

  type LocalPost = (typeof mdxPosts)[number] & { isLocal: true };
  type ExternalPost = (typeof mediumPosts)[number] & { isLocal: false; slug?: undefined };

  const allPosts: (LocalPost | ExternalPost)[] = [
    ...mdxPosts.map((p): LocalPost => ({ ...p, isLocal: true })),
    ...mediumPosts.map((p): ExternalPost => ({ ...p, isLocal: false, slug: undefined })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hasContent = allPosts.length > 0;

  return (
    <Box bg="bg.canvas" minH="100dvh" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl" px={{ base: 6, md: 10 }}>
        <SectionTitle
          title="Blog"
          subtitle="Technical writing on machine learning, deep learning, and software engineering"
        />

        {!hasContent ? (
          <Box textAlign="center" py={16}>
            <Text fontFamily="body" fontSize="sm" color="fg.subtle" fontStyle="italic" mb={4}>
              No posts yet — check back soon, or follow on Medium for updates.
            </Text>
            <Link
              href="https://savindi-wijenayaka.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              fontFamily="body"
              fontSize="sm"
              color="accent.solid"
              letterSpacing="wider"
              textTransform="uppercase"
              _hover={{ textDecoration: "underline" }}
            >
              Follow on Medium ━━▶
            </Link>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {allPosts.map((post) => {
              const isLocal = post.isLocal;
              const href =
                isLocal && "slug" in post && post.slug
                  ? `/blog/${post.slug}`
                  : "url" in post
                  ? post.url
                  : "#";

              return (
                <CardPanel
                  key={`${isLocal ? "local" : "medium"}-${post.title}`}
                  p={6}
                  h="full"
                  display="flex"
                  flexDirection="column"
                  as="article"
                >
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

                  <Heading as="h2" size="sm" fontFamily="heading" mb={2} lineHeight="1.4" flex={1}>
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

                  {post.excerpt && (
                    <Text fontFamily="body" fontSize="sm" color="fg.muted" lineHeight="1.7" mb={4}>
                      {post.excerpt}
                    </Text>
                  )}

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
              );
            })}
          </SimpleGrid>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Savindi Wijenayaka — Blog",
            url: "https://savindi.com/blog",
            author: {
              "@type": "Person",
              name: "Savindi Wijenayaka",
              url: "https://savindi.com",
            },
            description:
              "Technical writing on machine learning, deep learning, computer vision, and software engineering.",
          }),
        }}
      />
    </Box>
  );
}
