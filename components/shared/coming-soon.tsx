import { Box, Container, Text, Link, VStack, List } from "@chakra-ui/react";
import { SectionTitle } from "./section-title";

interface ComingSoonProps {
  title: string;
  description: string;
  dataFile: string;
  dataSchema: Record<string, string>;
  componentToUncomment?: string;
}

/**
 * Placeholder component for sections not yet populated with real content.
 *
 * TO REPLACE THIS WITH REAL CONTENT:
 * 1. Populate the data file listed in `dataFile` prop
 * 2. Replace <ComingSoon> with the real section component shown in `componentToUncomment`
 * 3. Delete this file import once no longer used
 */
export function ComingSoon({
  title,
  description,
  dataFile,
  dataSchema,
  componentToUncomment,
}: ComingSoonProps) {
  return (
    <Box bg="bg.canvas" minH="60vh" display="flex" alignItems="center">
      <Container maxW="3xl" py={20} textAlign="center">
        <SectionTitle title={title} />

        <VStack gap={6} mt={4}>
          <Text color="fg.muted" fontSize={{ base: "sm", md: "md" }} maxW="lg">
            {description}
          </Text>

          {/* Developer instructions */}
          <Box
            bg="bg.surface"
            border="1px solid"
            borderColor="border.default"
            borderRadius="sm"
            p={6}
            textAlign="left"
            fontFamily="body"
            fontSize="xs"
            color="fg.subtle"
            w="full"
            maxW="lg"
          >
            <Text color="accent.solid" mb={3} fontWeight="medium">
              ▸ Developer Notes — to populate this section:
            </Text>
            <Text mb={2}>
              Edit:{" "}
              <Text as="span" color="fg.accent" fontFamily="body">
                {dataFile}
              </Text>
            </Text>
            <Text mb={2}>Schema:</Text>
            <List.Root gap={1} pl={4}>
              {Object.entries(dataSchema).map(([key, type]) => (
                <List.Item key={key}>
                  <Text as="span" color="fg.accent">
                    {key}
                  </Text>
                  :{" "}
                  <Text as="span" color="fg.muted">
                    {type}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
            {componentToUncomment && (
              <Text mt={3}>
                Then replace{" "}
                <Text as="span" color="fg.accent">
                  &lt;ComingSoon /&gt;
                </Text>{" "}
                with{" "}
                <Text as="span" color="fg.accent">
                  &lt;{componentToUncomment} /&gt;
                </Text>
              </Text>
            )}
          </Box>

          <Link
            href="/"
            color="accent.solid"
            fontFamily="body"
            fontSize="sm"
            _hover={{ textDecoration: "underline" }}
          >
            ← Back to home
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
