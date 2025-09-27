import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { MdWork, MdCode } from 'react-icons/md';
import { experienceData, type ExperienceItem } from '../utils/experienceData';

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'education' | 'project'>('all');
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  const filteredExperience = activeFilter === 'all' 
    ? experienceData 
    : experienceData.filter(item => item.type === activeFilter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <MdWork className="text-blue-400" />;
      case 'project': return <MdCode className="text-purple-400" />;
      default: return <FaBriefcase className="text-indigo-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'border-blue-400/30 bg-blue-500/10';
      case 'project': return 'border-purple-400/30 bg-purple-500/10';
      default: return 'border-indigo-400/30 bg-indigo-500/10';
    }
  };

  return (
    <section id="experience" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gray-400 font-mono text-lg">03.</span>
            <span className="relative inline-block ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              My Professional Journey
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            A timeline of my work experience, projects, and educational background.
          </p>
          
          {/* LinkedIn Link */}
          <motion.a
            href="https://www.linkedin.com/in/girdhar-agrawal-124346220/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <FaLinkedin className="text-lg" />
            <span>View Full LinkedIn Profile</span>
            <FaExternalLinkAlt className="text-sm" />
          </motion.a>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'All', icon: <FaBriefcase /> },
            { key: 'work', label: 'Work', icon: <MdWork /> },
            { key: 'project', label: 'Projects', icon: <MdCode /> }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {filteredExperience.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-indigo-500 rounded-full border-4 border-black z-10 hidden md:block"></div>
                  
                  {/* Experience Card */}
                  <div className="md:ml-20 ml-0">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`p-8 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${getTypeColor(item.type)}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl mt-1">
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-lg text-indigo-300 font-medium">{item.company}</p>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4 mt-2">
                              <span className="flex items-center space-x-1">
                                <FaMapMarkerAlt />
                                <span>{item.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <FaCalendarAlt />
                                <span>{item.duration}</span>
                                {item.current && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full ml-2">
                                    Current
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {item.link && (
                          <motion.a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-indigo-400 hover:text-indigo-300 text-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt />
                          </motion.a>
                        )}
                      </div>

                      <div className="text-gray-300 mb-6">
                        {item.description.slice(0, 2).map((desc, i) => (
                          <p key={i} className="mb-2">• {desc}</p>
                        ))}
                        {item.description.length > 2 && (
                          <p className="text-indigo-300 text-sm">Click to view more...</p>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.slice(0, 5).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 5 && (
                          <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">
                            +{item.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Experience Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border backdrop-blur-sm p-8 ${getTypeColor(selectedItem.type)}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">
                      {getIcon(selectedItem.type)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                      <p className="text-xl text-indigo-300 font-medium">{selectedItem.company}</p>
                      <div className="flex flex-wrap items-center text-gray-400 gap-4 mt-2">
                        <span className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{selectedItem.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FaCalendarAlt />
                          <span>{selectedItem.duration}</span>
                          {selectedItem.current && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full ml-2">
                              Current
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Full Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <div className="text-gray-300 space-y-2">
                    {selectedItem.description.map((desc, i) => (
                      <p key={i}>• {desc}</p>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {selectedItem.achievements && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                    <div className="text-gray-300 space-y-2">
                      {selectedItem.achievements.map((achievement, i) => (
                        <p key={i}>🏆 {achievement}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Skills */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedItem.link && (
                  <div className="mt-6 pt-6 border-t border-gray-600/30">
                    <motion.a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-all duration-300"
                    >
                      <span>View More</span>
                      <FaExternalLinkAlt />
                    </motion.a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;