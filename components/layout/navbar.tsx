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
  Text,
} from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import Socials from "@/data/socials";
import { SocialButton } from "../shared/social-button";
import { Logos } from "@/data/logos";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    href.startsWith("/") && !href.startsWith("/#")
      ? pathname === href
      : false;

  return (
    <Link
      as={NextLink}
      href={href}
      fontFamily="body"
      fontSize="xs"
      letterSpacing="wider"
      textTransform="uppercase"
      color={isActive ? "accent.solid" : "fg.muted"}
      textDecoration="none"
      position="relative"
      px={1}
      py={1}
      transition="color 0.2s ease-out"
      _hover={{ color: "fg.default", textDecoration: "none" }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: "0",
        right: "0",
        height: "1px",
        bg: isActive ? "accent.solid" : "transparent",
        transition: "background 0.2s ease-out",
      }}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        as="header"
        px={{ base: 4, md: 8 }}
        bg="bg.surface"
        borderBottomWidth="1px"
        borderColor="border.subtle"
        position="sticky"
        top={0}
        zIndex={100}
        backdropFilter="blur(8px)"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Mobile: hamburger */}
          <Drawer.Root placement="start">
            <Drawer.Trigger asChild>
              <IconButton
                size="md"
                aria-label="Open navigation menu"
                display={{ base: "flex", md: "none" }}
                variant="ghost"
                color="fg.muted"
                _hover={{ bg: "bg.subtle", color: "fg.default" }}
              >
                <GiHamburgerMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg="bg.surface">
                  <Drawer.Header borderBottomWidth="1px" borderColor="border.subtle">
                    <Drawer.Title>
                      <Text fontFamily="heading" fontSize="lg" color="fg.accent">
                        Navigation
                      </Text>
                    </Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body py={6}>
                    <VStack gap={6} alignItems="start">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          as={NextLink}
                          href={link.href}
                          fontFamily="body"
                          fontSize="sm"
                          letterSpacing="wider"
                          textTransform="uppercase"
                          color="fg.muted"
                          _hover={{ color: "accent.solid", textDecoration: "none" }}
                          transition="color 0.2s"
                        >
                          ▸ {link.label}
                        </Link>
                      ))}
                    </VStack>
                  </Drawer.Body>
                  <Drawer.Footer borderTopWidth="1px" borderColor="border.subtle">
                    <VStack gap={3} w="full" alignItems="start">
                      <Separator />
                      <HStack gap={2}>
                        {Socials.map((social) => (
                          <SocialButton key={social.link} social={social} />
                        ))}
                      </HStack>
                    </VStack>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" position="absolute" top={3} right={3} />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>

          {/* Logo */}
          <Box h={16} display="flex" alignItems="center">
            <Link
              as={NextLink}
              href="/"
              variant="plain"
              focusRing="none"
              _hover={{ textDecoration: "none", opacity: 0.85 }}
              transition="opacity 0.2s"
            >
              <Image
                src={
                  colorMode === "light"
                    ? Logos.BrandLogo.src.light
                    : Logos.BrandLogo.src.dark
                }
                alt={Logos.BrandLogo.alt}
                h={10}
              />
            </Link>
          </Box>

          {/* Desktop nav links */}
          <HStack
            as="nav"
            gap={6}
            display={{ base: "none", md: "flex" }}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </HStack>

          {/* Theme toggle */}
          <Stack direction="row" gap={2} alignItems="center">
            <Button
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color="fg.muted"
              aria-label="Toggle dark/light mode"
              _hover={{ bg: "bg.subtle", color: "fg.default" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "focus.ring",
                outlineOffset: "2px",
              }}
            >
              {colorMode === "light" ? <BsMoonStarsFill /> : <IoMdSunny />}
            </Button>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
