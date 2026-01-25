"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  enabled: boolean;
}

export const FadeInSection = ({
  children,
  delay = 0,
  enabled,
}: FadeInSectionProps) => {
  return (
    <>
      {enabled ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        [children]
      )}
    </>
  );
};
