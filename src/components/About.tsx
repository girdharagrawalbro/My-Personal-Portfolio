import { FaCode, FaGraduationCap, FaLaptopCode } from 'react-icons/fa';
import { SiJavascript, SiReact, SiNodedotjs, SiPython, SiMongodb, SiPostgresql } from 'react-icons/si';
import { motion } from "framer-motion";
import ScrambledText from '../ui/ScrambledText'
const About = () => {


  const skills = [
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
    { name: 'React', icon: <SiReact className="text-blue-400" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" /> },
    { name: 'Python', icon: <SiPython className="text-blue-500" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-600" /> }
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Background elements - matching Hero section */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className={`absolute top-0 left-0 w-full h-full bg-black`}></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-3xl"
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
            <span className="text-gray-400 font-mono text-lg">01.</span>
            <span className="relative inline-block ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A brief introduction to my background and passion for technology.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ScrambledText
                radius={100}
                duration={1.2}
                speed={0.5}
                className="scrambled-text-demo m-[0vw] max-w-[400px]"
              >
                <div className="text-lg text-gray-300 leading-relaxed mb-4">
                  Hello! I'm <span className="text-blue-300 font-medium">Girdhar</span>, a passionate Full Stack Developer currently pursuing my
                  Master of Computer Applications (MCA) from Rungta Group of Institutions.
                </div>
                <div className="text-lg text-gray-300 leading-relaxed mb-4">
                  I specialize in building exceptional digital experiences with clean, efficient code.
                  My journey in web development started when I built my first website, and I've been
                  hooked ever since.
                </div>
                <div className="text-lg text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me contributing to open-source projects,
                  learning new technologies, or sharing my knowledge through blog posts.
                </div>
              </ScrambledText>
            </motion.div>
          </div>

          {/* Interactive Terminal */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-slate-900/70 px-4 py-3 flex items-center justify-between border-b border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-gray-400 text-sm font-mono flex items-center">
                      <span className="text-blue-400">girdhar</span>
                      <span className="text-gray-500">@</span>
                      <span className="text-green-400">portfolio</span>
                      <span className="text-gray-500">:~</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">zsh</div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm text-gray-300 space-y-6">
                  
                  {/* Whoami Command */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center text-green-400 mb-3">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span className="text-white">whoami</span>
                    </div>
                    <div className="ml-6 space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3 bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-2 hover:border-blue-400/50 transition-colors"
                        >
                          <FaCode className="text-blue-400 text-lg" />
                          <span className="text-gray-200">Full Stack Developer</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3 bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-2 hover:border-green-400/50 transition-colors"
                        >
                          <FaGraduationCap className="text-green-400 text-lg" />
                          <span className="text-gray-200">MCA Student</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3 bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-2 hover:border-purple-400/50 transition-colors"
                        >
                          <FaLaptopCode className="text-purple-400 text-lg" />
                          <span className="text-gray-200">Tech Enthusiast</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Skills Command */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center text-green-400 mb-3">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span className="text-white">cat</span>
                      <span className="text-yellow-400 ml-2">skills.json</span>
                    </div>
                    <div className="ml-6">
                      <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4">
                        <div className="text-gray-400 text-xs mb-2">// Primary Technologies</div>
                        <div className="grid grid-cols-2 gap-2">
                          {skills.slice(0, 4).map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.6 + index * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-2 bg-slate-600/40 border border-slate-500/50 rounded-md px-3 py-2 hover:border-blue-500/50 transition-all cursor-pointer"
                            >
                              {skill.icon}
                              <span className="text-sm">{skill.name}</span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-gray-400 text-xs mt-3 mb-2">// Databases</div>
                        <div className="grid grid-cols-2 gap-2">
                          {skills.slice(4).map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.0 + index * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-2 bg-slate-600/40 border border-slate-500/50 rounded-md px-3 py-2 hover:border-green-500/50 transition-all cursor-pointer"
                            >
                              {skill.icon}
                              <span className="text-sm">{skill.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Status Command */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center text-green-400 mb-3">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span className="text-white">./check-status.sh</span>
                    </div>
                    <div className="ml-6">
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-green-400 font-semibold">ONLINE</span>
                          </div>
                          <div className="text-gray-400">|</div>
                          <div className="text-sm text-gray-300">Available for projects</div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Currently: <span className="text-blue-300">Building awesome web experiences</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Interactive Cursor */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2.4 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <span className="text-blue-400 mr-2">❯</span>
                    <motion.div
                      className="w-2 h-5 bg-blue-400"
                      animate={{
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Terminal Footer */}
                <div className="bg-slate-900/70 px-4 py-2 border-t border-slate-600/50">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>zsh 5.9</span>
                      <span>•</span>
                      <span>Node v18.17.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;