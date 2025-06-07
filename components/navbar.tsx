"use client";
import {
  Box,
  Button,
  HStack,
  Flex,
  CloseButton,
  Drawer,
  IconButton,
  // Text,
  VStack,
  Stack,
  Portal,
  Separator,
  // Span,
  Link,
  Image,
} from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import Socials from "@/constants/socials";
import { SocialButton } from "./socials";

// const Links = ["About", "Experience", "Education", "Achievements"];

// interface NavLinkProps {
//   index: number;
//   link: string;
// }

// const NavLink = ({ index, link }: NavLinkProps) => {
//   return (
//     <Button as="a" variant="ghost" size="md" rounded="md" textStyle="navlink">
//       <Text color="brand.fgEmph">
//         0{index + 1}. <Span color="fg">{link}</Span>
//       </Text>
//     </Button>
//   );
// };

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
                    <VStack>
                      {/* {Links.map((link, index) => (
                        <NavLink key={link} index={index} link={link} />
                      ))} */}
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
              href="#"
              variant="plain"
              focusRing={"none"}
              _hover={{ textDecoration: "none" }}
              fontFamily={"heading"}
              fontSize={"4xl"}
            >
              <Image
                src={
                  colorMode === "light"
                    ? "../logo_light.png"
                    : "../logo_dark.png"
                }
                alt="logo"
                h={16}
              />
            </Link>
          </Box>
          <HStack gap={8} alignItems={"center"}>
            <HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
              {/* {Links.map((link, index) => (
                <NavLink key={link} index={index} link={link} />
              ))} */}
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
