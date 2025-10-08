import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData, type Education as EducationType } from '../utils/educationData';
import { Calendar, MapPin, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  const [selected, setSelected] = useState<EducationType | null>(null);

  const cardColor = 'border-indigo-400/30 bg-indigo-500/10';

  return (
    <section id="education" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
      {/* Background blob (match Experience) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gray-400 font-mono text-lg">04.</span>
            <span className="relative inline-block ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Education
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">My academic journey in computer science and technology.</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line (match Experience colors) */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block"></div>

          <AnimatePresence mode="wait">
            <motion.div className="space-y-8">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute left-6 top-6 w-4 h-4 bg-indigo-500 rounded-full border-4 border-black z-10 hidden md:block"></div>

                  <div className="md:ml-20 ml-0">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`p-8 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${cardColor}`}
                      onClick={() => setSelected(edu)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl mt-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                              {edu.logo}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                            <p className="text-lg text-indigo-300 font-medium">{edu.institution}</p>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4 mt-2">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>{edu.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>{edu.duration}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* small details on the right for md+ */}
                        <div className="hidden md:block text-sm text-gray-400">
                          {edu.grade && (
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 font-semibold">Grade: {edu.grade}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-gray-300 mb-4 line-clamp-3">{edu.description}</div>

                      <div className="flex flex-wrap gap-2">
                        {edu.skills.slice(0, 5).map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30">
                            {s}
                          </span>
                        ))}
                        {edu.skills.length > 5 && (
                          <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">+{edu.skills.length - 5} more</span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal for selected education (match Experience modal) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border backdrop-blur-sm p-8 ${cardColor}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                        {selected.logo}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selected.degree}</h3>
                      <p className="text-xl text-indigo-300 font-medium">{selected.institution}</p>
                      <div className="flex flex-wrap items-center text-gray-400 gap-4 mt-2">
                        <span className="flex items-center space-x-1"><MapPin className="w-4 h-4 text-blue-400" /><span>{selected.location}</span></span>
                        <span className="flex items-center space-x-1"><Calendar className="w-4 h-4 text-blue-400" /><span>{selected.duration}</span></span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                {selected.description && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                    <div className="text-gray-300 space-y-2"><p>{selected.description}</p></div>
                  </div>
                )}

                {selected.achievements && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                    <div className="text-gray-300 space-y-2">{selected.achievements.map((a, i) => <p key={i}>🏆 {a}</p>)}</div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Education;