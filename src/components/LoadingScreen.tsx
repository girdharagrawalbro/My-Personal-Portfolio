import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-indigo-900 to-black overflow-hidden">
      {/* Background elements matching Hero section */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl"
        />
      </div>

      {/* Loading content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <div className="font-mono text-2xl md:text-3xl text-indigo-400 mb-6">
          <span className="text-white">Girdhar</span>.<span className="text-purple-400">portfolio</span>
        </div>

        <div className="loader-code text-lg md:text-xl text-gray-300 mb-4">
          LoadingPortfolio<span className="animate-pulse">()</span>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          />
        </div>
      </motion.div>

      {/* Floating tech icons (optional) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="text-xs text-gray-500 mb-2">Loading assets</div>
        <div className="flex space-x-4">
          {['react', 'nextjs', 'nodejs', 'mongodb'].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
                alt={tech}
                className="w-8 h-8 opacity-70"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;