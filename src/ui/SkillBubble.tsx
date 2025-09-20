import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillBubbleProps {
  name: string;
  level: number;
  icon: string;
  color: string;
  delay?: number;
}

const SkillBubble = ({ name, level, icon, color, delay = 0 }: SkillBubbleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate bubble size based on skill level (min 60px, max 120px)
  const baseSize = 60 + (level / 100) * 60;
  
  // Floating animation variants
  const floatingVariants = {
    initial: { y: 0, x: 0 },
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: {
        duration: 4 + Math.random() * 2, // Random duration between 4-6s
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }
    }
  };

  return (
    <motion.div
      className="relative will-change-transform"
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      viewport={{ once: false }}
      whileHover={{ 
        scale: 1.2,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 20 : 1 }}
    >
      <motion.div
        className={`
          relative rounded-full cursor-pointer shadow-lg
          flex items-center justify-center
          backdrop-blur-sm border-2
          ${color}
        `}
        style={{
          width: `${baseSize}px`,
          height: `${baseSize}px`,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Skill Icon */}
        {icon.startsWith('http') ? (
          <img 
            src={icon} 
            alt={name}
            className="w-8 h-8 object-contain filter drop-shadow-sm"
          />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}
        
        {/* Hover Overlay with Percentage */}
        <motion.div
          className="absolute inset-0 bg-black/70 rounded-full flex flex-col items-center justify-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-lg font-bold">{level}%</span>
          <span className="text-xs text-center px-2">{name}</span>
        </motion.div>

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${color.includes('blue') ? '#3B82F6' : color.includes('green') ? '#10B981' : '#8B5CF6'} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SkillBubble;