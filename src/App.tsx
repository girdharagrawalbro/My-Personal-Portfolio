import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import useTheme from './hooks/useTheme';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import BlurText from './ui/BlurText';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const introTimer = setTimeout(() => {
        setShowIntro(false);
      }, 2000); // Show BlurText for 3 seconds before showing Hero

      return () => clearTimeout(introTimer);
    }
  }, [isLoading]);

  return (
    <Router>
      <div className="app">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header />
            <main className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">

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

              <AnimatePresence mode="wait">
                {showIntro ? (

                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center "
                  >
                    <BlurText
                      text="Crafting digital experiences"
                      delay={150}
                      animateBy="words"
                      direction="top"
                      className="text-5xl md:text-8xl font-medium text-center px-4"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default App; 