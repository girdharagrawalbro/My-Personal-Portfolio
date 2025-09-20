import { useDroppable } from '@dnd-kit/core';

interface Tech {
  name: string;
  icon: string;
}

interface DropZoneProps {
  droppedItems: Tech['name'][]; // Ensures only valid tech names
  techStack: Tech[];
}

const DropZone = ({ droppedItems, techStack }: DropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'drop-zone',
  });

  return (
    <div
      ref={setNodeRef}
      id="drop-zone"
      className={`w-full min-h-[120px] flex flex-wrap items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${
        isOver 
          ? 'border-indigo-300 bg-indigo-100/20 dark:bg-indigo-900/20 scale-105' 
          : 'border-indigo-400 bg-indigo-50 dark:bg-gray-900/40'
      }`}
    >
      {droppedItems.length === 0 ? (
        <div className="text-center">
          <span className="text-gray-400 block">Drop tech icons here!</span>
          <span className="text-gray-500 text-sm mt-2 block">
            {window.innerWidth <= 768 ? 'Or tap them on mobile' : 'Drag and drop from below'}
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {droppedItems.map((name, index) => {
            const tech = techStack.find((t) => t.name === name);

            return tech ? (
              <div
                key={`${name}-${index}`}
                className="relative group"
              >
                <img
                  src={tech.icon}
                  alt={name}
                  title={name}
                  className="w-12 h-12 transition-transform hover:scale-110"
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {name}
                </span>
              </div>
            ) : (
              <span
                key={`${name}-${index}`}
                className="text-red-400 text-sm m-2"
              >
                {name} not found
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropZone;
