import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaSave, FaTimes, FaTag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  github?: string;
  image?: string;
  date: string;
  lastUpdated: string;
  // selling fields
  forSale?: boolean;
  price?: number;
}

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    category: 'fullstack',
    tags: [],
    url: '',
    github: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    forSale: false,
    price: 0,
    ...project
  });
  const [tagsInput, setTagsInput] = useState(project?.tags.join(', ') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const projectData = {
      ...formData,
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag),
      forSale: formData.forSale,
      price: Number(formData.price) || 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    onSave(projectData);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
                <option value="mobile">Mobile</option>
                <option value="ai">AI/ML</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Node.js, MongoDB, etc."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Live URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="e.g., project-name.jpg (will be loaded from /siteimage/)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!formData.forSale}
                  onChange={(e) => setFormData({ ...formData, forSale: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 bg-gray-800 border-gray-700 rounded"
                />
                <span className="text-gray-300">List this project for sale</span>
              </label>
            </div>

            {formData.forSale && (
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-medium mb-2">Price (INR)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  min={0}
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}
        </div>

        <div className="flex gap-4 mt-8">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-70"
          >
            <FaSave />
            {loading ? 'Saving...' : 'Save Project'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sellProject, setSellProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // In development, fetch from JSON file
      // In production, use database service
      if (process.env.NODE_ENV === 'development') {
        const response = await fetch('/projects.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } else {
  // Use local API / MongoDB service in production
        // const projectsService = new ProjectsService();
        // const data = await projectsService.getAll();
        // setProjects(data);
        
        // For now, still use JSON file
        const response = await fetch('/projects.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (projectData: Project) => {
    try {
      if (editingProject) {
        // Update existing project
        const updatedProjects = projects.map(p => 
          p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
        );
        setProjects(updatedProjects);
        
        // In production, update in database:
        // const projectsService = new ProjectsService();
        // await projectsService.update(editingProject.id, projectData);
      } else {
        // Add new project
        const newProject = { ...projectData, id: Date.now().toString() };
        setProjects([...projects, newProject]);
        
        // In production, save to database:
        // const projectsService = new ProjectsService();
        // const savedProject = await projectsService.create(projectData);
        // setProjects([...projects, savedProject]);
      }
      
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        setProjects(projects.filter(p => p.id !== id));
        
        // In production, delete from database:
        // const projectsService = new ProjectsService();
        // await projectsService.delete(id);
        
        // Show success message
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <FaPlus />
          Add Project
        </motion.button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">
                    {project.category}
                  </span>
                  {project.forSale && (
                    <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                      For Sale • ₹{project.price}
                    </span>
                  )}
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Created: {project.date}</span>
                  <span>Updated: {project.lastUpdated}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => setSellProject(project)}
                  whileHover={{ scale: 1.05 }}
                  className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                  title="Sell"
                >
                  <FaTag />
                </motion.button>

                {project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    title="View Live"
                  >
                    <FaEye />
                  </motion.a>
                )}
                
                <motion.button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>
                
                <motion.button
                  onClick={() => project.id && handleDeleteProject(project.id)}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sell Panel */}
      <AnimatePresence>
        {sellProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSellProject(null)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-gray-900 rounded-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Sell Project: {sellProject.title}</h3>
                <button onClick={() => setSellProject(null)} className="text-gray-400 hover:text-white"><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Price (INR)</label>
                  <input
                    type="number"
                    value={sellProject.price || 0}
                    onChange={(e) => setSellProject({ ...sellProject, price: Number(e.target.value) })}
                    min={0}
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // update project locally
                      const updated = projects.map(p => p.id === sellProject.id ? { ...p, forSale: true, price: sellProject.price } : p)
                      setProjects(updated)
                      setSellProject(null)
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg"
                  >
                    List for Sale
                  </button>
                  <button
                    onClick={() => {
                      // mark not for sale
                      const updated = projects.map(p => p.id === sellProject.id ? { ...p, forSale: false, price: 0 } : p)
                      setProjects(updated)
                      setSellProject(null)
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <ProjectForm
            project={editingProject || undefined}
            onSave={handleSaveProject}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsManager;