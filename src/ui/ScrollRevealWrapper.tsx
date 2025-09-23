import React, { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const ScrollRevealWrapper: React.FC<ScrollRevealWrapperProps> = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealWrapper;
