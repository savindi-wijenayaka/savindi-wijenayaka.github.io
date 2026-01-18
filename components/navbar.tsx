"use client";
import {
  Box,
  Button,
  HStack,
  Flex,
  CloseButton,
  Drawer,
  IconButton,
  VStack,
  Stack,
  Portal,
  Separator,
  Link,
  Image,
} from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import Socials from "@/constants/socials";
import { SocialButton } from "./socials";
import { Logos } from "@/constants/logos";



export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box px={4} bg="brand.subtle">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <IconButton
                size={"md"}
                aria-label={"Open Menu"}
                display={{ md: "none", lg: "none", xl: "none", "2xl": "none" }}
                variant="surface"
              >
                <GiHamburgerMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title></Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <VStack gap={4} alignItems="start">
                    </VStack>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Separator />
                    {Socials.map((social) => (
                      <SocialButton
                        key={social.link}
                        social={social}
                      ></SocialButton>
                    ))}
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <Box h={16}>
            <Link
              href="/"
              variant="plain"
              focusRing={"none"}
              _hover={{ textDecoration: "none" }}
              fontFamily={"heading"}
              fontSize={"4xl"}
            >
              <Image
                src={
                  colorMode === "light"
                    ? Logos.BrandLogo.src.light
                    : Logos.BrandLogo.src.dark
                }
                alt={Logos.BrandLogo.alt}
                h={16}
              />
            </Link>
          </Box>
          <HStack gap={8} alignItems={"center"}>
            <HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
            </HStack>
            <Stack direction={"row"} gap={7}>
              <Button onClick={toggleColorMode} variant="surface">
                {colorMode === "light" ? <BsMoonStarsFill /> : <IoMdSunny />}
              </Button>
            </Stack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
