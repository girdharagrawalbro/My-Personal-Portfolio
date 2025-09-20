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
  const { setNodeRef } = useDroppable({
    id: 'drop-zone',
  });

  return (
    <div
      ref={setNodeRef}
      id="drop-zone"
      className="w-full min-h-[120px] flex flex-wrap items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl bg-indigo-50 dark:bg-gray-900/40 p-4 transition-all"
    >
      {droppedItems.length === 0 ? (
        <span className="text-gray-400">Drop tech icons here!</span>
      ) : (
        droppedItems.map((name, index) => {
          const tech = techStack.find((t) => t.name === name);

          return tech ? (
            <img
              key={`${name}-${index}`} // Prevent duplicate key issues
              src={tech.icon}
              alt={name}
              title={name}
              className="w-12 h-12 m-2"
            />
          ) : (
            <span
              key={`${name}-${index}`}
              className="text-red-400 text-sm m-2"
            >
              {name} not found
            </span>
          );
        })
      )}
    </div>
  );
};

export default DropZone;
