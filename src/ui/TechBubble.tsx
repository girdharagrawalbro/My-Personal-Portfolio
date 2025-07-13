// src/components/ui/TechBubble.tsx
import { motion } from 'framer-motion';

interface TechBubbleProps {
  tech: {
    name: string;
    icon: string;
  };
  delay?: number;
}

const TechBubble = ({ tech, delay = 0 }: TechBubbleProps) => {
  return (
    <motion.div
      className="rounded-full bg-white dark:bg-gray-800 p-2 shadow-lg flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: 1,
        y: [0, -10, 0]
      }}
      transition={{
        delay,
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.2 }}
    >
      <img
        src={tech.icon}
        alt={tech.name}
        className="w-8 h-8"
      />
    </motion.div>
  );
};

export default TechBubble;