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
} from "@chakra-ui/react";
import { TbFileCv } from "react-icons/tb";
import Socials from "@/constants/socials";
import { SocialButton } from "@/components/socials";
import { ImageAssets } from "@/constants/images";

export default function Home() {
  return (
    <Container p={4} h="calc(100dvh - 64px)">
      <Center p={4} h="100%">
        <VStack>
          <Image
            src={ImageAssets.ProfilePhoto.src}
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
            Machine Learning Engineer & Researcher
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
          <HStack>
          <Link
            href="https://savindi.com/CV_SavindiWijenayaka_ML.pdf"
            target="blank"
          >
            <Button p={2} margin={1}>
              <TbFileCv /> View CV
            </Button>
          </Link>

          {/* <Link
            href="https://savindi.com/CV_SavindiWijenayaka_SE.pdf"
            target="blank"
          >
            <Button p={2} margin={1}>
              <TbFileCv /> CV (SE)
            </Button>
          </Link> */}

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
