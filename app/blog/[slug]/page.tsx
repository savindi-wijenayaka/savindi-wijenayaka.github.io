import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  Badge,
  Link,
  Separator,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { getAllMdxSlugs, getMdxPost } from "@/lib/mdx";

export const dynamicParams = false;

// output: export requires at least one entry — real slugs are added as MDX
// posts are created in content/blog/. The "_placeholder" slug 404s gracefully.
export function generateStaticParams() {
  const slugs = getAllMdxSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "_placeholder" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getMdxPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Savindi Wijenayaka`,
      description: post.excerpt,
      url: `https://savindi.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Savindi Wijenayaka"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Savindi Wijenayaka`,
      description: post.excerpt,
    },
    alternates: { canonical: `https://savindi.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getMdxPost(slug);
  if (!post) notFound();

  return (
    <Container maxW="3xl" px={{ base: 6, md: 10 }} py={{ base: 16, md: 24 }}>
      <Link
        as={NextLink}
        href="/blog"
        fontFamily="body"
        fontSize="xs"
        color="accent.solid"
        letterSpacing="wider"
        textTransform="uppercase"
        _hover={{ textDecoration: "underline" }}
        display="inline-flex"
        alignItems="center"
        gap={1}
        mb={8}
      >
        ← Back to Blog
      </Link>

      <Box mb={8}>
        <HStack gap={2} mb={4} flexWrap="wrap">
          <Text fontFamily="body" fontSize="xs" color="fg.subtle" letterSpacing="wider">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          {post.tags.map((tag) => (
            <Badge
              key={tag}
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
              {tag}
            </Badge>
          ))}
        </HStack>

        <Heading
          as="h1"
          size={{ base: "2xl", md: "4xl" }}
          fontFamily="heading"
          lineHeight="1.2"
          mb={4}
        >
          {post.title}
        </Heading>

        {post.excerpt && (
          <Text fontFamily="body" fontSize="lg" color="fg.muted" lineHeight="1.7">
            {post.excerpt}
          </Text>
        )}
      </Box>

      <Separator borderColor="border.subtle" mb={10} />

      {/*
       * MDX RENDERING — to enable full MDX support once you have posts:
       * 1. Run: npm install next-mdx-remote
       * 2. Add at top: import { MDXRemote } from "next-mdx-remote/rsc";
       * 3. Replace the <Box> below with: <MDXRemote source={post.content} />
       */}
      <Box
        fontFamily="body"
        fontSize="sm"
        lineHeight="1.9"
        color="fg.default"
        whiteSpace="pre-wrap"
      >
        {post.content}
      </Box>

      <Separator borderColor="border.subtle" mt={12} mb={6} />
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <Link
          as={NextLink}
          href="/blog"
          fontFamily="body"
          fontSize="xs"
          color="accent.solid"
          letterSpacing="wider"
          textTransform="uppercase"
          _hover={{ textDecoration: "underline" }}
        >
          ← All Posts
        </Link>
        <Text fontFamily="body" fontSize="xs" color="fg.subtle">
          By Savindi Wijenayaka
        </Text>
      </HStack>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: "Savindi Wijenayaka", url: "https://savindi.com" },
            datePublished: post.date,
            url: `https://savindi.com/blog/${slug}`,
          }),
        }}
      />
    </Container>
  );
}
