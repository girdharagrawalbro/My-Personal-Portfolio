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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black"
    >
      {/* Background elements - matching Hero section */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className={`absolute top-0 left-0 w-full h-full bg-black`}></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
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
          className=""
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-indigo-400 mr-2">01.</span>
            <span className="relative inline-block">
              About Me
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <div
            >
              <ScrambledText
                radius={100}
                duration={1.2}
                speed={0.5}
                className="scrambled-text-demo m-[0vw] max-w-[300px]"
              >
                <p className="text-lg leading-relaxed">
                  Hello! I'm <span className="text-indigo-300 font-medium">Girdhar</span>, a passionate Full Stack Developer currently pursuing my
                  Master of Computer Applications (MCA) from Rungta Group of Institutions.
                </p>
                <p className="text-lg leading-relaxed">
                  I specialize in building exceptional digital experiences with clean, efficient code.
                  My journey in web development started when I built my first website, and I've been
                  hooked ever since.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me contributing to open-source projects,
                  learning new technologies, or sharing my knowledge through blog posts.
                </p>
              </ScrambledText>
            </div>

          </div>

          {/* Terminal */}
          <div className="lg:w-1/2 w-full">
            <div
            >
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
                {/* Terminal Header */}
                <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-700">
                  <div className="flex space-x-2 mr-4">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">girdhar@portfolio:~</div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 font-mono text-gray-300">
                  {/* Whoami Section with Icons */}
                  <div className="mb-6">
                    <div className="flex items-center text-green-400 mb-1">
                      <span className="mr-2">$</span> whoami
                    </div>
                    <div className="ml-6 mt-2">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2 bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2">
                          <FaCode className="text-indigo-400" />
                          <span>Full Stack Developer</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2">
                          <FaGraduationCap className="text-indigo-400" />
                          <span>MCA Student</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2">
                          <FaLaptopCode className="text-indigo-400" />
                          <span>Tech Enthusiast</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-6">
                    <div className="flex items-center text-green-400 mb-1">
                      <span className="mr-2">$</span> cat skills.txt
                    </div>
                    <div className="ml-6 mt-2">
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-gray-700/50 border border-gray-600 rounded-full px-3 py-1"
                          >
                            {skill.icon}
                            <span>{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div>
                    <div className="flex items-center text-green-400 mb-1">
                      <span className="mr-2">$</span> ./current_status.sh
                    </div>
                    <div className="ml-6 mt-2 flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Currently building awesome web experiences</span>
                    </div>
                  </div>

                  {/* Cursor */}
                  <div className="flex items-center mt-4">
                    <span className="mr-2">$</span>
                    <span className="w-2 h-5 bg-green-400 animate-blink"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;