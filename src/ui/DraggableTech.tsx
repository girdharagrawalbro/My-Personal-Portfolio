import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

interface DraggableTechProps {
  tech: {
    name: string;
    icon: string;
  };
  isDropped: boolean;
  onMobileClick?: (techName: string) => void;
  isMobile?: boolean;
}

const DraggableTech = ({ tech, isDropped, onMobileClick, isMobile }: DraggableTechProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tech.name,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleClick = () => {
    if (isMobile && onMobileClick && !isDropped) {
      onMobileClick(tech.name);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...(isMobile ? {} : { ...listeners, ...attributes })}
      onClick={handleClick}
      className={`p-3 rounded-full bg-gray-800 shadow-lg ${
        isMobile ? 'cursor-pointer' : 'cursor-grab'
      } ${isDropped ? 'opacity-30' : 'opacity-100'} ${
        isMobile && !isDropped ? 'hover:bg-gray-700' : ''
      }`}
      whileHover={{ scale: isDropped ? 1 : 1.1 }}
      whileTap={{ scale: isDropped ? 0.95 : 1.05, cursor: isMobile ? 'pointer' : 'grabbing' }}
    >
      <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
    </motion.div>
  );
};

export default DraggableTech;
