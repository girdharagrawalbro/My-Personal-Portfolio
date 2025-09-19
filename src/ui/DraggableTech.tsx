import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

interface DraggableTechProps {
  tech: {
    name: string;
    icon: string;
  };
  isDropped: boolean;
}

const DraggableTech = ({ tech, isDropped }: DraggableTechProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tech.name,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-full bg-gray-800 shadow-lg cursor-grab ${isDropped ? 'opacity-30' : 'opacity-100'}`}
      whileHover={{ scale: isDropped ? 1 : 1.1 }}
      whileTap={{ scale: isDropped ? 0.95 : 1.05, cursor: 'grabbing' }}
    >
      <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
    </motion.div>
  );
};

export default DraggableTech;
