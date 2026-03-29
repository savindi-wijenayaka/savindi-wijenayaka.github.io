import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

interface CardPanelProps extends BoxProps {
  glowOnHover?: boolean;
}

export function CardPanel({ children, glowOnHover = true, ...props }: CardPanelProps) {
  return (
    <Box
      bg="bg.card"
      border="1px solid"
      borderColor="border.default"
      borderRadius="sm"
      position="relative"
      transition="all 0.3s ease-out"
      _hover={
        glowOnHover
          ? {
              borderColor: "accent.border",
              boxShadow: "brand-glow",
              transform: "translateY(-3px)",
            }
          : undefined
      }
      {...props}
    >
      {/* Top-left corner mark */}
      <Box
        position="absolute"
        top="-1px"
        left="-1px"
        w="3"
        h="3"
        borderTop="2px solid"
        borderLeft="2px solid"
        borderColor="accent.border"
        pointerEvents="none"
        aria-hidden="true"
      />
      {/* Top-right corner mark */}
      <Box
        position="absolute"
        top="-1px"
        right="-1px"
        w="3"
        h="3"
        borderTop="2px solid"
        borderRight="2px solid"
        borderColor="accent.border"
        pointerEvents="none"
        aria-hidden="true"
      />
      {/* Bottom-left corner mark */}
      <Box
        position="absolute"
        bottom="-1px"
        left="-1px"
        w="3"
        h="3"
        borderBottom="2px solid"
        borderLeft="2px solid"
        borderColor="accent.border"
        pointerEvents="none"
        aria-hidden="true"
      />
      {/* Bottom-right corner mark */}
      <Box
        position="absolute"
        bottom="-1px"
        right="-1px"
        w="3"
        h="3"
        borderBottom="2px solid"
        borderRight="2px solid"
        borderColor="accent.border"
        pointerEvents="none"
        aria-hidden="true"
      />
      {children}
    </Box>
  );
}
