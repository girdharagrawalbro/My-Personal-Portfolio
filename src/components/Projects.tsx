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
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [currentPage, currentProjects]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getImageUrl = (imageName: string) => {
    if (!imageName || imageName === "default.jpg") {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23171f33'/%3E%3C/svg%3E";
    }
    return `/siteimage/${imageName}`;
  };

  const setCardRef = (el: HTMLElement | null, idx: number) => {
    cardsRef.current[idx] = el;
  };

  return (
    <section ref={containerRef} className="bg-[#0b1326] text-[#dae2fd] py-24 min-h-screen font-sans relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-[#adc6ff] to-[#4d8eff]">
            Featured Projects
          </h2>
          <p className="text-[#8691a7] text-lg max-w-2xl">
            A curated selection of my digital craftsmanship. Exploring deep tech integrations and beautiful interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => setCardRef(el, index)}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col bg-[#131b2e]/60 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_32px_rgba(6,14,32,0.4)] border border-[#2d3449]/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(77,142,255,0.15)] focus-within:-translate-y-2 focus-within:shadow-[0_16px_48px_rgba(77,142,255,0.15)] cursor-pointer"
            >
              <div className="relative w-full h-48 md:h-56 mb-6 rounded-xl overflow-hidden bg-[#060e20]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#171f33] to-[#060e20] opacity-50"></div>
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23171f33'/%3E%3C/svg%3E";
                  }}
                />
              </div>

              <div className="flex-grow flex flex-col justify-start">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold leading-tight text-[#dae2fd] group-hover:text-[#adc6ff] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-[#c2c6d6] mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#001a42] text-[#adc6ff] border border-[#004395]/30"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#131b2e] text-[#8691a7] border border-[#2d3449]/50">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-[#131b2e] text-[#adc6ff] hover:bg-[#2d3449] disabled:opacity-50 disabled:hover:bg-[#131b2e] transition-colors focus:ring-2 focus:ring-[#adc6ff] outline-none border border-[#2d3449]/50"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 flex-wrap max-w-[60vw] justify-center">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    currentPage === idx + 1
                      ? "bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] text-[#001a42] shadow-[0_0_12px_rgba(77,142,255,0.4)] border-none"
                      : "bg-[#131b2e] text-[#8691a7] hover:bg-[#2d3449] hover:text-[#dae2fd] border border-[#2d3449]/50"
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
              className="p-2 rounded-xl bg-[#131b2e] text-[#adc6ff] hover:bg-[#2d3449] disabled:opacity-50 disabled:hover:bg-[#131b2e] transition-colors focus:ring-2 focus:ring-[#adc6ff] outline-none border border-[#2d3449]/50"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
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
              className="absolute inset-0 bg-[#060e20]/80 backdrop-blur-md" 
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b1326] rounded-2xl shadow-[0_0_60px_rgba(10,18,38,0.8)] border border-[#2d3449]/50 flex flex-col md:flex-row overflow-hidden"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#131b2e]/80 text-[#8691a7] hover:text-white hover:bg-[#2d3449] backdrop-blur transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-[#060e20] shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#171f33] to-[#060e20] opacity-50"></div>
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full opacity-90"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23171f33'/%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1326] hidden md:block" />
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative bg-[#0b1326]">
                <span className="text-[#ddb7ff] text-sm font-semibold tracking-wider uppercase mb-2">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {selectedProject.title}
                </h3>
                
                <p className="text-[#c2c6d6] text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#131b2e] text-[#adc6ff] border border-[#2d3449]/50"
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
                      className="group relative px-6 py-3 rounded-xl overflow-hidden font-semibold flex items-center gap-2 transform transition-transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#adc6ff] to-[#4d8eff] opacity-90 group-hover:opacity-100 transition-opacity" />
                      <span className="relative text-[#001a42]">Visit Project</span>
                      <ExternalLink className="relative w-4 h-4 text-[#001a42]" />
                    </a>
                  )}
                  {selectedProject.github && selectedProject.github !== "" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[#131b2e] text-[#dae2fd] border border-[#2d3449]/80 hover:bg-[#2d3449] hover:-translate-y-1 transition-all flex items-center gap-2 font-semibold shadow-[0_4px_24px_rgba(6,14,32,0.4)]"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
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