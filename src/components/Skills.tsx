import { motion } from 'framer-motion';
import SkillBubble from '../ui/SkillBubble';

const Skills = () => {
  const skillsData = {
    frontend: [
      { name: 'React', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'bg-blue-500/20 border-blue-400' },
      { name: 'Next.js', level: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: 'bg-gray-500/20 border-gray-400' },
      { name: 'TypeScript', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 'bg-blue-600/20 border-blue-500' },
      { name: 'Tailwind CSS', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: 'bg-cyan-500/20 border-cyan-400' },
    ],
    backend: [
      { name: 'Node.js', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'bg-green-500/20 border-green-400' },
      { name: 'Python', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-blue-500/20 border-blue-400' },
      { name: 'Express.js', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'bg-gray-500/20 border-gray-400' },
    ],
    database: [
      { name: 'MongoDB', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'bg-green-600/20 border-green-500' },
      { name: 'PostgreSQL', level: 50, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: 'bg-blue-700/20 border-blue-600' },
      { name: 'SupaBase', level: 50, icon: '🗄️', color: 'bg-emerald-500/20 border-emerald-400' },
      { name: 'MySQL', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'bg-blue-500/20 border-blue-400' }
    ],
  };
  
  return (
    <section id="skills" className="py-20 bg-black relative z-10">
      <div className="container mx-auto px-6">
        {/* Header - Static for testing */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            <span className="text-indigo-400">02.</span> Skills & Tools
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Hover over the bubbles to see my proficiency levels. The size of each bubble represents my skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center relative z-10"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Frontend</h3>
            </div>
            
            <div className="relative min-h-[300px] bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
              <div className="flex flex-wrap items-center justify-center gap-6 h-full">
                {skillsData.frontend.map((skill, index) => (
                  <SkillBubble
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    color={skill.color}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center relative z-10"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Backend</h3>
            </div>
            
            <div className="relative min-h-[300px] bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
              <div className="flex flex-wrap items-center justify-center gap-6 h-full">
                {skillsData.backend.map((skill, index) => (
                  <SkillBubble
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    color={skill.color}
                    delay={index * 0.2 + 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Database Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center relative z-10"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Database</h3>
            </div>
            
            <div className="relative min-h-[300px] bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
              <div className="flex flex-wrap items-center justify-center gap-6 h-full">
                {skillsData.database.map((skill, index) => (
                  <SkillBubble
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    color={skill.color}
                    delay={index * 0.2 + 2}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Git', 'Docker', 'AWS', 'Vercel', 'Firebase', 'REST APIs', 'GraphQL'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 1 }}
                className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-indigo-500 hover:text-white transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;