"use client";

import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface AnimateInProps extends BoxProps {
  delay?: number;
}

export function AnimateIn({ children, delay = 0, ...props }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
