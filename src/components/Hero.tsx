import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';
import useTheme from '../hooks/useTheme';
import ShinyText from '../ui/ShinyText';
import DecryptedText from '../ui/DecryptedText';
import TechBubble from '../ui/TechBubble';

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(mainRef, { once: true });
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const techStack = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  ];

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ['Full Stack Developer', 'Web Designer', 'Open Source Contributor', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
      });

      return () => typed.destroy();
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      ref={mainRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-black' : 'bg-black  '}`}></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            <div className="mb-6">
              <ShinyText
                text="Hi, I'm "
                disabled={false}
                speed={3}
                className="text-2xl md:text-3xl font-medium"
              />
              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Girdhar Agrawal
              </motion.h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6">
                I'm a <span ref={typedRef} className="text-indigo-500 dark:text-indigo-400"></span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
             
                <DecryptedText
                  text="Full Stack Developer specializing in modern web technologies. Building innovative solutions that bridge technology and user needs."
                  animateOn="view"
                  revealDirection="start"
                  speed={190}
                  maxIterations={10}
                  className="text-lg md:text-xl mb-8 leading-relaxed"
                />
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 mt-5">
              <motion.a
                href="#projects"
                className="btn-primary group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Projects</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="/GirdharAgrawal.pdf"
                download
                className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-medium transition-all hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                <span>Download CV</span>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {[
                { icon: <FaGithub className="text-2xl" />, url: "https://github.com/yourusername" },
                { icon: <FaLinkedin className="text-2xl" />, url: "https://linkedin.com/in/yourprofile" },
                { icon: <FaTwitter className="text-2xl" />, url: "https://twitter.com/yourhandle" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md mx-auto text-center">
              {/* Profile Image */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <img
                  src={theme === 'dark' ? "/img.png" : "/img.png"}
                  alt="Girdhar Agrawal"
                  className="w-full h-auto object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0"
                  animate={{ opacity: isHovering ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 opacity-0"
                  animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-xl font-bold">Girdhar Agrawal</h3>
                  <p className="text-gray-300">Full Stack Developer</p>
                </motion.div>
              </motion.div>

              {/* Floating Tech Icons */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24">
                <TechBubble tech={techStack[3]} delay={0.1} />
              </div>
              <div className="absolute -top-10 -right-10 w-20 h-20">
                <TechBubble tech={techStack[4]} delay={0.2} />
              </div>
              <div className="absolute top-1/4 -left-16 w-16 h-16">
                <TechBubble tech={techStack[1]} delay={0.3} />
              </div>
              <div className="absolute bottom-1/4 -right-16 w-18 h-18">
                <TechBubble tech={techStack[5]} delay={0.4} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-sm mb-2">Scroll down</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 dark:border-gray-400 flex justify-center p-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
              animate={{
                y: [0, 10, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;