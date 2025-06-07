import {
  Center,
  Container,
  Heading,
  Image,
  VStack,
  Span,
  Text,
  Button,
  Link,
  HStack,
  IconButton,
  LinkOverlay,
} from "@chakra-ui/react";
import { TbFileCv } from "react-icons/tb";
import { BsMedium } from "react-icons/bs";
import { FaGithubAlt, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Home() {
  return (
    <Container p={4} h="calc(100vh - 64px)">
      <Center p={4} h="100%">
        <VStack>
          <Image
            src="../profile.jpg"
            borderRadius="full"
            alt="Savindi Wijenayaka"
            width={{ md: "xs", sm: "2xs", base: "3xs" }}
            aspectRatio={1 / 1}
          />
          <Heading
            size={{ lg: "7xl", sm: "5xl", base: "3xl" }}
            fontWeight="light"
            textAlign="center"
          >
            <Span color="brand.fgEmph">Savindi</Span> Wijenayaka
          </Heading>
          <Heading
            size={{ lg: "lg", sm: "md", base: "xs" }}
            fontFamily={"body"}
            textAlign="center"
          >
            Software Engineer & Researcher
          </Heading>
          <Text
            w={{ lg: "1/2", sm: "full", base: "full" }}
            color="brand.fgMuted"
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
          <Link
            href="https://docs.google.com/gview?url=https://github.com/savindi-wijenayaka/savindi-wijenayaka.github.io/raw/main/cv_savindi_wijenayaka.pdf&embedded=true"
            target="blank"
          >
            <Button p={4}>
              <TbFileCv /> View CV
            </Button>
          </Link>
          <HStack>
              <IconButton variant="outline">
                <LinkOverlay
                  href="https://www.linkedin.com/in/savindi/"
                  target="blank"
                >
                  <FaLinkedinIn />
                </LinkOverlay>
              </IconButton>
              <IconButton variant="outline">
                <LinkOverlay
                  href="https://github.com/savindi-wijenayaka"
                  target="blank"
                >
                  <FaGithubAlt />
                </LinkOverlay>
              </IconButton>
              <IconButton variant="outline">
                <LinkOverlay
                  href="https://savindi-wijenayaka.medium.com"
                  target="blank"
                >
                  <BsMedium />
                </LinkOverlay>
              </IconButton>
              <IconButton variant="outline">
                <LinkOverlay
                  href="https://www.instagram.com/vindy_stories"
                  target="blank"
                >
                  <FaInstagram />
                </LinkOverlay>
              </IconButton>
            </HStack>
        </VStack>
      </Center>
    </Container>
  );
}
