"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { RefObject } from "react";

export default function Overlay({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% -> 20% (center)
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3],
    [1, 1, 0, 0],
  );
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 30% -> 50% (left)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const x2 = useTransform(scrollYProgress, [0.2, 0.4], [-50, 0]);

  // Section 3: 60% -> 80% (right)
  const opacity3 = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.8, 0.9],
    [0, 1, 1, 0],
  );
  const x3 = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none text-white overflow-hidden">
      {/* 0% Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
      >
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-2xl">
        Girdhar Agrawal 
        </h1>
        <p className="text-xl md:text-3xl font-light tracking-wide text-zinc-300">
          Creative Developer.
        </p>
      </motion.div>

      {/* 30% Left */}
      <motion.div
        style={{ opacity: opacity2, x: x2 }}
        className="absolute inset-0 flex flex-col items-start justify-center p-12 md:p-32"
      >
        <h2 className="text-4xl md:text-7xl font-bold max-w-2xl leading-tight text-white drop-shadow-lg">
          I build digital experiences.
        </h2>
      </motion.div>

      {/* 60% Right */}
      <motion.div
        style={{ opacity: opacity3, x: x3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right p-12 md:p-32"
      >
        <h2 className="text-4xl md:text-7xl font-bold max-w-2xl leading-tight text-white drop-shadow-lg">
          Bridging design and engineering.
        </h2>
      </motion.div>
    </div>
  );
}
