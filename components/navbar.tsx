import { GridItem, Grid, Box, Button, HStack, Flex, Spacer } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" p="4">
      <Button variant={"ghost"} size={"xl"}>Logo</Button>
      <Spacer /> {/* Pushes subsequent items to the right */}
      <HStack gap={4}> {/* HStack is a Flex with direction="row" */}
        <Button variant={"ghost"} size={"xl"}>01. About</Button>
        <Button variant={"ghost"} size={"xl"}>02. Experience</Button>
        <Button variant={"ghost"} size={"xl"}>03. Education</Button>
        <Button variant={"ghost"} size={"xl"}>04. Achievements</Button>
      </HStack>
    </Flex>
  )
}
