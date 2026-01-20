"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";

export default function IntroLoader2() {
  const [show, setShow] = useState(true);

  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const t = setTimeout(() => setShow(false), 3500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center " // max-w 제거
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-label="intro loading overlay"
        >
          <motion.div
            className="flex flex-col justify-center items-center gap-2 max-w-[480px] w-full h-full px-4 z-50 bg-white"
            initial="hidden"
            animate="show"
            style={{
              color: themeFont?.accentColor,
            }}
            variants={{
              hidden: { transition: { staggerChildren: 0.0 } },
              show: {
                transition: { delayChildren: 0.4, staggerChildren: 0.9 },
              },
            }}
          >
            <Line>
              {weddingInfo?.groomLastName ?? ""}
              {weddingInfo?.groomFirstName ?? ""}
              <span className="mx-4 text-[14px]">그리고</span>
              {weddingInfo?.brideLastName ?? ""}
              {weddingInfo?.brideFirstName ?? ""}
            </Line>
            <Line>저희 결혼합니다</Line>
            <Line>
              <Heart
                className="w-6 h-6 inline"
                style={{
                  color: themeFont?.accentColor,
                  fill: themeFont?.accentColor,
                }}
              />
            </Line>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="text-[20px] tracking-widest"
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
}
