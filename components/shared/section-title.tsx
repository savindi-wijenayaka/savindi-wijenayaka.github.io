import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
  id?: string;
  subtitle?: string;
}

export function SectionTitle({ title, id, subtitle }: SectionTitleProps) {
  return (
    <Box textAlign="center" mb={{ base: 10, md: 14 }}>
      <Flex align="center" justify="center" gap={3} mb={subtitle ? 3 : 0}>
        <Text
          as="span"
          color="fg.rune"
          fontFamily="body"
          fontSize={{ base: "lg", md: "xl" }}
          className="glow-pulse"
          aria-hidden="true"
          userSelect="none"
        >
          ━━◈
        </Text>
        <Heading
          as="h2"
          id={id}
          size={{ base: "xl", md: "2xl" }}
          fontFamily="heading"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          {title}
        </Heading>
        <Text
          as="span"
          color="fg.rune"
          fontFamily="body"
          fontSize={{ base: "lg", md: "xl" }}
          className="glow-pulse"
          aria-hidden="true"
          userSelect="none"
        >
          ◈━━
        </Text>
      </Flex>
      {subtitle && (
        <Text color="fg.muted" fontFamily="body" fontSize="sm" mt={2}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
