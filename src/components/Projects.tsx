"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  url: string;
  repo: string;
  github: string;
  tags: string[];
  category: string;
  forSale?: boolean;
  price?: number;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset" };
  }, [selectedProject]);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentProjects.length > 0 && containerRef.current) {
      const validElements = cardsRef.current.slice(0, currentProjects.length).filter(Boolean);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          validElements,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [currentPage, currentProjects.length]); // Track length instead of object

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getImageUrl = (imageName: string) => {
    if (!imageName || imageName === "default.jpg") {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%231c1b1d'/%3E%3C/svg%3E";
    }
    return `/siteimage/${imageName}`;
  };

  const setCardRef = (el: HTMLElement | null, idx: number) => {
    cardsRef.current[idx] = el;
  };

  return (
    <section ref={containerRef} className="bg-black text-[#e5e1e4] py-24 min-h-screen font-sans relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c0c1ff] via-[#e0b6ff] to-[#c0c1ff] drop-shadow-sm">
              Featured Work
            </h2>
            <p className="text-[#cbc3d9] text-lg leading-relaxed">
              A curated selection of my digital craftsmanship. Exploring deep tech integrations and beautiful interfaces designed with immaculate precision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {currentProjects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => setCardRef(el, index)}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col bg-[#131315]/80 backdrop-blur-2xl rounded-[2rem] p-4 shadow-[0_0_30px_rgba(52,48,234,0.05)] border border-[#494456]/40 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(52,48,234,0.25)] focus-within:-translate-y-3 focus-within:shadow-[0_0_60px_rgba(52,48,234,0.25)] cursor-pointer overflow-hidden relative"
            >
              {/* Subtle top glare effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>

              <div className="relative w-full h-56 md:h-64 mb-6 rounded-2xl overflow-hidden bg-[#1c1b1d]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2c] to-[#1c1b1d] opacity-50 z-0"></div>
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-85 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105 relative z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%231c1b1d'/%3E%3C/svg%3E";
                  }}
                />
              </div>

              <div className="flex-grow flex flex-col justify-start px-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold leading-tight text-[#e5e1e4] group-hover:text-[#c0c1ff] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-[#cbc3d9] mb-8 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto px-2 pb-2">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-black text-[#c0c1ff] border border-[#494456]/50 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#1c1b1d] text-[#cbc3d9] border border-[#494456]/30 uppercase tracking-wider">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-[#1c1b1d] text-[#c0c1ff] hover:bg-[#2a2a2c] hover:text-[#e0b6ff] disabled:opacity-40 disabled:hover:bg-[#1c1b1d] transition-all focus:ring-2 focus:ring-[#c0c1ff] outline-none border border-[#494456]/40 shadow-[0_0_15px_rgba(52,48,234,0.1)]"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 flex-wrap max-w-[60vw] justify-center px-4 py-2 bg-[#131315]/90 backdrop-blur-md rounded-full border border-[#494456]/30 shadow-[0_0_20px_rgba(52,48,234,0.05)]">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentPage === idx + 1
                      ? "bg-gradient-to-tr from-[#3430ea] to-[#6d11ad] text-[#fff] shadow-[0_0_20px_rgba(109,17,173,0.6)] border-none"
                      : "bg-black text-[#cbc3d9] hover:bg-[#2a2a2c] hover:text-[#e5e1e4] border border-[#494456]/40"
                  }`}
                  aria-label={`Page ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-[#1c1b1d] text-[#c0c1ff] hover:bg-[#2a2a2c] hover:text-[#e0b6ff] disabled:opacity-40 disabled:hover:bg-[#1c1b1d] transition-all focus:ring-2 focus:ring-[#c0c1ff] outline-none border border-[#494456]/40 shadow-[0_0_15px_rgba(52,48,234,0.1)]"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0e0e10] rounded-[2.5rem] shadow-[0_0_100px_rgba(52,48,234,0.2)] border border-[#494456]/30 flex flex-col md:flex-row overflow-hidden"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-[#1c1b1d]/80 text-[#cbc3d9] hover:text-[#e5e1e4] hover:bg-[#39393b] backdrop-blur-md transition-all border border-[#494456]/40 shadow-lg group"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full md:w-[45%] h-72 md:h-auto relative bg-black shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1c1b1d] to-black opacity-50"></div>
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full opacity-90"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%231c1b1d'/%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/40 to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0e0e10]/40 to-[#0e0e10] hidden md:block" />
              </div>

              <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center relative bg-[#0e0e10] z-10">
                <span className="inline-block px-3 py-1 bg-[#2a064b] text-[#dbb8ff] text-xs font-bold tracking-widest uppercase mb-4 rounded-full border border-[#654588]/50 w-max">
                  {selectedProject.category}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-bold text-[#e5e1e4] mb-6 leading-[1.15] tracking-tight">
                  {selectedProject.title}
                </h3>

                <p className="text-[#cbc3d9] text-lg leading-relaxed mb-10">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-black text-[#c0c1ff] border border-[#494456]/40 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-auto">
                  {selectedProject.url && selectedProject.url !== "" && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-8 py-4 rounded-full overflow-hidden font-bold flex items-center gap-3 transform transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(52,48,234,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3430ea] to-[#6d11ad] opacity-100 group-hover:opacity-90 transition-opacity" />
                      <span className="relative text-[#e5e1e4]">Launch Experience</span>
                      <ExternalLink className="relative w-4 h-4 text-[#e5e1e4] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {selectedProject.github && selectedProject.github !== "" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-[#1c1b1d] text-[#e5e1e4] border border-[#494456]/60 hover:bg-[#2a2a2c] hover:border-[#c0c1ff]/40 hover:-translate-y-1 transition-all flex items-center gap-3 font-bold shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}