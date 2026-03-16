"use client";

import { motion } from "framer-motion";

export default function NanoBanana({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-help ${className}`}
      animate={{
        y: [0, -5, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      title="Nano Banana Extra UI"
    >
      <span className="text-xl">🍌</span>
    </motion.div>
  );
}
