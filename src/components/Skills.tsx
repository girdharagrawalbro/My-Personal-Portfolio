import { motion } from 'framer-motion';
import { FiDatabase, FiLayers, FiCpu, FiTool } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiPostgresql, SiTailwindcss, SiNextdotjs, SiFirebase, SiGraphql, SiRedux, SiJest, SiFigma, SiPostman, SiGithub, SiSupabase } from 'react-icons/si';

const skillsData = [
  {
    title: 'Frontend',
    icon: <FiLayers className="text-indigo-400" />,
    skills: [
      { name: 'React', percent: 90, icon: <FaReact className="text-blue-400" /> },
      { name: 'Next.js', percent: 85, icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: 'TypeScript', percent: 80, icon: <SiTypescript className="text-blue-600" /> },
      { name: 'JavaScript', percent: 85, icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'Tailwind CSS', percent: 95, icon: <SiTailwindcss className="text-cyan-400" /> }
    ]
  },
  {
    title: 'Backend',
    icon: <FiCpu className="text-purple-400" />,
    skills: [
      { name: 'Node.js', percent: 85, icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Python', percent: 75, icon: <FaPython className="text-blue-500" /> },
      // { name: 'Java', percent: 70, icon: <FaJava className="text-red-500" /> }
    ]
  },
  {
    title: 'Database',
    icon: <FiDatabase className="text-green-400" />,
    skills: [
      { name: 'MongoDB', percent: 80, icon: <SiMongodb className="text-green-400" /> },
      { name: 'PostgreSQL', percent: 50, icon: <SiPostgresql className="text-blue-600" /> },
      { name: 'SupaBase', percent: 50, icon: <SiSupabase className="text-blue-600" /> },  
    ]
  }
];

const toolsData = [
  {
    category: 'Development Tools',
    items: [
      { name: 'VS Code', icon: <FaReact className="text-blue-500" /> },
      { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'GitHub', icon: <SiGithub className="text-gray-800 dark:text-gray-200" /> },
      { name: 'Postman', icon: <SiPostman className="text-orange-400" /> }
    ]
  },
  {
    category: 'DevOps & Cloud',
    items: [
      { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
      { name: 'AWS', icon: <FaAws className="text-yellow-500" /> },
      { name: 'Firebase', icon: <SiFirebase className="text-yellow-400" /> }
    ]
  },
  {
    category: 'Design & Testing',
    items: [
      { name: 'Figma', icon: <SiFigma className="text-purple-500" /> },
      { name: 'Jest', icon: <SiJest className="text-red-400" /> },
      { name: 'GraphQL', icon: <SiGraphql className="text-pink-500" /> },
      { name: 'Redux', icon: <SiRedux className="text-purple-400" /> }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-indigo-400 mr-2">02.</span>
            <span className="relative inline-block">
              Skills & Tools
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm"
            >
              
              <div className="flex items-center mb-6 ">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="skill-item"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {skill.icon}
                        </div>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-indigo-400 font-medium">{skill.percent}%</span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <FiTool className="text-indigo-400 mr-3" />
            Tools & Technologies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolsData.map((toolCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm"
              >
                <h4 className="text-lg font-semibold text-white mb-4">{toolCategory.category}</h4>
                <div className="space-y-3">
                  {toolCategory.items.map((tool, toolIndex) => (
                    <motion.div
                      key={toolIndex}
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: toolIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="mr-3 text-xl">
                        {tool.icon}
                      </div>
                      <span className="text-gray-300">{tool.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;