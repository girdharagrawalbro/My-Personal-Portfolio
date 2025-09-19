import { useState, useEffect } from 'react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaStar,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaSpinner,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types/project.d.ts';
import { getLanguageColor } from '../utils/helpers';

interface ProjectsProps {
  filter: string;
  setFilter: (filter: string) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const Projects: React.FC<ProjectsProps> = ({ filter, setFilter, projects, setProjects }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [errorProjects, setErrorProjects] = useState('');
  const [errorRepos, setErrorRepos] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        const data = await response.json();
        const projectsWithDates = data.map((project: Project) => ({
          ...project,
          date: project.date || new Date().toISOString().split('T')[0],
          lastUpdated: project.lastUpdated || new Date().toISOString().split('T')[0]
        }));
        setProjects(projectsWithDates);
      } catch (err) {
        setErrorProjects(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/girdharagrawalbro/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('GitHub API limit exceeded');
        const data = await response.json();
        setRepos(data.filter((repo: any) => !repo.fork));
      } catch (err) {
        console.error('GitHub API error:', err);
        setErrorRepos(err instanceof Error ? err.message : 'Failed to load GitHub repositories');
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchProjects();
    fetchRepos();
  }, [setProjects]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderLoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="animate-spin text-4xl text-indigo-400 mb-4" />
      <span className="text-gray-300">Loading...</span>
    </div>
  );

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
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
            <span className="text-indigo-400 mr-2">03.</span>
            <span className="relative inline-block">
              My Projects
            </span>
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {['all', 'frontend', 'backend', 'fullstack'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loadingProjects ? (
          renderLoadingSpinner()
        ) : errorProjects ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center"
          >
            <FaExclamationTriangle className="text-red-400 text-3xl mx-auto mb-4" />
            <p className="text-gray-300">{errorProjects}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-indigo-500/20 transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/siteimage/${project.image || 'default.jpg'}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-gray-900/80 text-gray-300 text-xs px-2 py-1 rounded flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(project.date ?? '')}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-xs text-gray-400">
                      Updated: {formatDate(project.lastUpdated ?? '')}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag: any) => {
                      const tagStr = typeof tag === 'string' ? tag : String(tag ?? '');
                      return (
                        <span
                          key={tagStr}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${getLanguageColor(tagStr)}20`,
                            border: `1px solid ${getLanguageColor(tagStr)}`,
                            color: getLanguageColor(tagStr)
                          }}
                        >
                          {tagStr}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.url && project.url !== 'no link' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      >
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {(project.github || project.repo) && (
                      <a
                        href={project.github || `https://github.com/girdharagrawalbro/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                      >
                        <FaGithub />
                        <span>Code</span>
                      </a>
                    )}
                    {project.caseStudy && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1 text-sm px-3 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                      >
                        <span>Show Case Study</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center items-center gap-4 mb-12"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded text-sm transition-colors ${currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full relative text-white shadow-2xl"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                  onClick={() => setSelectedProject(null)}
                >
                  <FaTimes size={20} />
                </button>
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-indigo-400 font-semibold">Problem</h4>
                    <p className="text-gray-300">
                      {typeof selectedProject.caseStudy === 'object' && selectedProject.caseStudy?.problem
                        ? selectedProject.caseStudy.problem
                        : ''}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold">Solution</h4>
                    <p className="text-gray-300">
                      {typeof selectedProject.caseStudy === 'object' && selectedProject.caseStudy?.solution
                        ? selectedProject.caseStudy.solution
                        : ''}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold">Impact</h4>
                    <p className="text-gray-300">
                      {typeof selectedProject.caseStudy === 'object' && selectedProject.caseStudy?.impact
                        ? selectedProject.caseStudy.impact
                        : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GitHub Repos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <FaGithub className="text-indigo-400 mr-3" />
            <span>My GitHub Repositories</span>
          </h3>

          {loadingRepos ? (
            renderLoadingSpinner()
          ) : errorRepos ? (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
              <FaExclamationTriangle className="text-red-400 text-3xl mx-auto mb-4" />
              <p className="text-gray-300 mb-4">{errorRepos}</p>
              <a
                href="https://github.com/girdharagrawalbro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                View GitHub Profile
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-700/30 border border-gray-600 rounded-lg p-5 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-400 transition-colors"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <div className="text-xs text-gray-400 flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatDate(repo.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {repo.description || 'No description provided'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center">
                      <FaStar className="mr-1 text-yellow-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center">
                      <FaCodeBranch className="mr-1 text-blue-400" />
                      {repo.forks_count}
                    </span>
                    {repo.language && (
                      <span className="flex items-center">
                        <span
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Updated: {formatDate(repo.updated_at)}
                  </div>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-1" />
                      View Demo
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
