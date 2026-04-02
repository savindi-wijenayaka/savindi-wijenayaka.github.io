import {
  Box,
  Container,
  Heading,
  VStack,
  Span,
  Text,
  Button,
  Link,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { TbFileCv } from "react-icons/tb";
import Socials from "@/data/socials";
import { SocialButton } from "@/components/shared/social-button";
import { ImageAssets } from "@/data/images";
import Image from "next/image";

export default function Hero() {
  return (
    <Box
      as="section"
      id="about"
      minH="calc(100dvh - 64px)"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        // Light: dark scanlines at very low opacity — subtle paper texture / old-print feel
        // Dark: white scanlines — classic CRT phosphor effect
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.018) 2px, rgba(0,0,0,0.018) 4px)",
        _dark: {
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
        },
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Container maxW="6xl" px={{ base: 6, md: 10 }} position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={{ base: 10, md: 16 }}
          py={{ base: 16, md: 0 }}
        >
          {/* Profile photo */}
          <Box flexShrink={0}>
            <Box
              position="relative"
              width={{ base: "130px", sm: "220px", md: "260px" }}
              height={{ base: "130px", sm: "220px", md: "260px" }}
            >
              {/* Rune corner decorations on photo */}
              <Box
                position="absolute"
                top="-6px"
                left="-6px"
                w="5"
                h="5"
                borderTop="2px solid"
                borderLeft="2px solid"
                borderColor="accent.border"
                zIndex={2}
              />
              <Box
                position="absolute"
                top="-6px"
                right="-6px"
                w="5"
                h="5"
                borderTop="2px solid"
                borderRight="2px solid"
                borderColor="accent.border"
                zIndex={2}
              />
              <Box
                position="absolute"
                bottom="-6px"
                left="-6px"
                w="5"
                h="5"
                borderBottom="2px solid"
                borderLeft="2px solid"
                borderColor="accent.border"
                zIndex={2}
              />
              <Box
                position="absolute"
                bottom="-6px"
                right="-6px"
                w="5"
                h="5"
                borderBottom="2px solid"
                borderRight="2px solid"
                borderColor="accent.border"
                zIndex={2}
              />
              <Box
                overflow="hidden"
                width="100%"
                height="100%"
                borderRadius="sm"
                border="1px solid"
                borderColor="border.default"
              >
                <Image
                  src={ImageAssets.ProfilePhoto.src}
                  alt="Savindi Wijenayaka — Machine Learning Engineer and PhD Researcher"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
            </Box>
          </Box>

          {/* Text content */}
          <VStack
            align={{ base: "center", md: "start" }}
            gap={4}
            maxW={{ base: "full", md: "xl" }}
          >
            {/* Terminal-style label */}
            <Text
              fontFamily="body"
              fontSize="xs"
              color="accent.solid"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              ▸ Machine Learning Engineer
            </Text>

            {/* Main name heading */}
            <Heading
              as="h1"
              size={{ base: "5xl", sm: "5xl", md: "7xl" }}
              fontWeight="700"
              lineHeight="1.1"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
            >
              <Span display="block" color="fg.accent">Savindi</Span>
              <Span
                display="block"
                fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
                css={{
                  "&::after": {
                    content: '"_"',
                    color: "var(--chakra-colors-accent-solid)",
                    animation: "cursor-blink 1.2s ease-in-out infinite",
                    marginLeft: "2px",
                    fontWeight: "300",
                  },
                }}
              >Wijenayaka,<Span fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }} fontWeight="500" fontStyle="italic" color="fg.muted"> PhD</Span></Span>
            </Heading>

            {/* Bio */}
            <Text
              color="fg.muted"
              fontFamily="body"
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="1.8"
              textAlign={{ base: "center", md: "left" }}
              maxW="lg"
            >
              I&apos;m an ML Engineer with 6+ years of applied machine learning
              experience across industry and research. I have been accountable for 
              the full ML lifecycle, from problem framing and data construction to
              architecture, deployment, and maintenance, with a focus on
              real-world impact and engineering rigour.
            </Text>

            {/* CTAs */}
            <HStack gap={3} flexWrap="wrap" justify={{ base: "center", md: "start" }}>
              <Link
                href="https://savindi.com/CV_SavindiWijenayaka_ML.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  bg="accent.solid"
                  color="accent.fg"
                  size="sm"
                  fontFamily="body"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  fontSize="xs"
                  px={5}
                  _hover={{ opacity: 0.85 }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "focus.ring",
                    outlineOffset: "2px",
                  }}
                >
                  <TbFileCv /> View CV
                </Button>
              </Link>
            </HStack>

            {/* Socials */}
            <HStack gap={2} justify={{ base: "center", md: "start" }}>
              {Socials.map((social) => (
                <SocialButton key={social.link} social={social} />
              ))}
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
