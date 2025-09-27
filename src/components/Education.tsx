import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../utils/educationData';
import { Calendar, MapPin, Award, BookOpen, Code } from 'lucide-react';
import ScrollRevealWrapper from '../ui/ScrollRevealWrapper';

const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
      {/* Background Effects */}
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollRevealWrapper>
          <div className="text-center mb-16">
            
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        <span className="text-gray-400 font-mono text-lg">04.</span>
                        <span className="relative inline-block ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
Education
                        </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              My academic journey in computer science and technology
            </p>
          </div>
        </ScrollRevealWrapper>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block"></div>

          <div className="space-y-8">
            {educationData.map((education, index) => (
              <ScrollRevealWrapper key={education.id} delay={index * 0.2}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-black z-10 hidden md:block"></div>
                  
                  {/* Education Card */}
                  <div className="md:ml-20 ml-0">
                    <motion.div
                      className="group relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
                        <div className="grid lg:grid-cols-12 gap-6 items-start">
                          {/* Logo/Icon */}
                          <div className="lg:col-span-1 flex justify-center lg:justify-start">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                              {education.logo}
                            </div>
                          </div>

                          {/* Main Content */}
                          <div className="lg:col-span-8 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {education.degree}
                              </h3>
                              <h4 className="text-lg text-blue-400 font-semibold mb-2">
                                {education.institution}
                              </h4>
                              <p className="text-gray-400 font-medium">
                                {education.field}
                              </p>
                            </div>

                            {/* Achievements */}
                            {education.achievements && (
                              <div className="flex flex-wrap gap-2">
                                {education.achievements.map((achievement, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 text-yellow-400 text-sm font-semibold flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Award className="w-4 h-4" />
                                    {achievement}
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Skills */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-gray-300">
                                <Code className="w-4 h-4" />
                                <span className="font-medium">Key Skills:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {education.skills.map((skill, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="bg-slate-700/50 border border-slate-600/50 rounded-full px-3 py-1 text-sm text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Details Sidebar */}
                          <div className="lg:col-span-3 space-y-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-400">
                              <Calendar className="w-4 h-4 text-blue-400" />
                              <span>{education.duration}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-gray-400">
                              <MapPin className="w-4 h-4 text-blue-400" />
                              <span>{education.location}</span>
                            </div>

                            {education.grade && (
                              <div className="flex items-center gap-3 text-gray-400">
                                <BookOpen className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-semibold">
                                  Grade: {education.grade}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>

        {/* Timeline Connector */}
        <ScrollRevealWrapper delay={0.4}>
          <div className="mt-16 text-center">
            <motion.div
              className="inline-flex items-center gap-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm font-medium">
                Continuous Learning Journey
              </span>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full animate-pulse"></div>
            </motion.div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default Education;