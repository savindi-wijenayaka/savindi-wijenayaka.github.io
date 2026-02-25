import {
  Center,
  Container,
  Heading,
  VStack,
  Span,
  Text,
  Button,
  Link,
  HStack,
  Box,
} from "@chakra-ui/react";
import { TbFileCv } from "react-icons/tb";
import Socials from "@/data/socials";
import { SocialButton } from "@/components/shared/social-button";
import { ImageAssets } from "@/data/images";
import Image from "next/image";

export default function Home() {
  return (
    <Container p={4} h="calc(100dvh - 64px)">
      <Center p={4} h="100%">
        <VStack>
          <Box
            borderRadius="full"
            overflow="hidden"
            width={{ md: "300px", sm: "225px", base: "180px" }}
            height={{ md: "300px", sm: "225px", base: "180px" }}
            position="relative"
          >
            <Image
              src={ImageAssets.ProfilePhoto.src}
              alt="Savindi Wijenayaka"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Heading
            as="h1"
            size={{ lg: "7xl", sm: "5xl", base: "3xl" }}
            fontWeight="medium"
            textAlign="center"
          >
            <Span color="fg.accent">Savindi</Span> Wijenayaka
          </Heading>
          <Heading
            as="h2"
            size={{ lg: "lg", sm: "md", base: "xs" }}
            fontFamily={"body"}
            textAlign="center"
          >
            Machine Learning Engineer & Researcher
          </Heading>
          <Text
            w={{ lg: "1/2", sm: "full", base: "full" }}
            color="fg.muted"
            textAlign="center"
            p={4}
            fontSize={{ sm: "md", base: "xs" }}
          >
            I&apos;m driven by the excitement of turning ideas into tools that
            are useful, meaningful, and make a real difference in the world. My
            work spans deep learning, production-grade cloud-native development,
            and hands-on research, with a focus on computer vision and
            computational analysis.
          </Text>
          <HStack>
            <Link
              href="https://savindi.com/CV_SavindiWijenayaka_ML.pdf"
              target="blank"
            >
              <Button
                p={2}
                margin={1}
                bg="accent.solid"
                color="accent.fg"
                _hover={{ bg: "accent.solid" }}
                _active={{ bg: "accent.solid" }}
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
          <HStack>
            {Socials.map((social) => (
              <SocialButton key={social.link} social={social}></SocialButton>
            ))}
          </HStack>
        </VStack>
      </Center>
    </Container>
  );
}
