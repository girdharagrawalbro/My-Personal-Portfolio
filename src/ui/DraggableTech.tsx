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
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: tech.name,
    disabled: isDropped, // Disable dragging if already dropped
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1000 : 'auto',
  } : undefined;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click if dragging
    if (isDragging) return;
    
    if (onMobileClick && !isDropped) {
      e.preventDefault();
      e.stopPropagation();
      onMobileClick(tech.name);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...(!isMobile && !isDropped ? { ...listeners, ...attributes } : {})}
      onClick={handleClick}
      className={`p-3 rounded-full bg-gray-800 shadow-lg transition-all duration-200 ${
        isDropped 
          ? 'cursor-not-allowed opacity-30' 
          : isMobile 
            ? 'cursor-pointer hover:bg-gray-700' 
            : 'cursor-grab hover:bg-gray-700'
      } ${isDragging ? 'z-50' : ''}`}
      whileHover={{ scale: isDropped ? 1 : 1.1 }}
      whileTap={{ scale: isDropped ? 0.95 : 1.05 }}
    >
      <img 
        src={tech.icon} 
        alt={tech.name} 
        className="w-10 h-10 pointer-events-none" 
      />
    </motion.div>
  );
};

export default DraggableTech;
