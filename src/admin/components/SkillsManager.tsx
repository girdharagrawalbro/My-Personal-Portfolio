import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaCode, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  color?: string;
  description: string;
  yearsExperience: number;
  projects: string[];
  featured: boolean;
}

interface SkillFormProps {
  skill?: Skill;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}

const SkillForm = ({ skill, onSave, onCancel }: SkillFormProps) => {
  const [formData, setFormData] = useState<Skill>({
    name: '',
    category: 'Frontend',
    level: 5,
    icon: '',
    color: '#3B82F6',
    description: '',
    yearsExperience: 1,
    projects: [],
    featured: false,
    ...skill
  });
  const [projectsInput, setProjectsInput] = useState(skill?.projects.join(', ') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const skillData = {
      ...formData,
      projects: projectsInput.split(',').map(project => project.trim()).filter(project => project)
    };
    
    onSave(skillData);
    setLoading(false);
  };

  const skillCategories = [
    'Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'AI/ML', 
    'Tools', 'Cloud', 'Testing', 'Design', 'Other'
  ];

  const commonColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

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
            {skill ? 'Edit Skill' : 'Add New Skill'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React, Node.js, Python"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                {skillCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Proficiency Level: {formData.level}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of your experience with this skill..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Icon Class (optional)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., FaReact, FaNodeJs, SiMongodb"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                {commonColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:border-white transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Related Projects (comma separated)</label>
            <input
              type="text"
              value={projectsInput}
              onChange={(e) => setProjectsInput(e.target.value)}
              placeholder="Project 1, Project 2, Project 3"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-3 h-4 w-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
            />
            <label htmlFor="featured" className="text-gray-300">
              Featured skill (will be highlighted in skills section)
            </label>
          </div>
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
            {loading ? 'Saving...' : 'Save Skill'}
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

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
  // Mock data - in a real app, this would come from the local API / MongoDB
      const mockSkills: Skill[] = [
        {
          id: '1',
          name: 'React',
          category: 'Frontend',
          level: 9,
          icon: 'FaReact',
          color: '#61DAFB',
          description: 'Advanced React development with hooks, context, and performance optimization',
          yearsExperience: 3,
          projects: ['Portfolio Website', 'E-commerce App', 'Social Platform'],
          featured: true
        },
        {
          id: '2',
          name: 'Node.js',
          category: 'Backend',
          level: 8,
          icon: 'FaNodeJs',
          color: '#339933',
          description: 'Backend development with Express.js, REST APIs, and microservices',
          yearsExperience: 2.5,
          projects: ['API Gateway', 'Chat Application', 'E-commerce Backend'],
          featured: true
        },
        {
          id: '3',
          name: 'MongoDB',
          category: 'Database',
          level: 7,
          icon: 'SiMongodb',
          color: '#47A248',
          description: 'NoSQL database design, aggregation pipelines, and performance optimization',
          yearsExperience: 2,
          projects: ['User Management System', 'Content Management'],
          featured: false
        }
      ];
      setSkills(mockSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSkill = async (skillData: Skill) => {
    try {
      if (editingSkill) {
        // Update existing skill
        const updatedSkills = skills.map(s => 
          s.id === editingSkill.id ? { ...skillData, id: editingSkill.id } : s
        );
        setSkills(updatedSkills);
      } else {
        // Add new skill
        const newSkill = { ...skillData, id: Date.now().toString() };
        setSkills([...skills, newSkill]);
      }
      
  // In a real implementation, you would save to the local API here
  // await supabase.from('skills').upsert(skillData);
      
      setShowForm(false);
      setEditingSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        setSkills(skills.filter(s => s.id !== id));
        
        // In a real implementation:
  // await supabase.from('skills').delete().eq('id', id);
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const filteredSkills = filterCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filterCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <FaPlus />
          Add Skill
        </motion.button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category} {category !== 'All' && `(${skills.filter(s => s.category === category).length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: skill.color + '20', border: `1px solid ${skill.color}40` }}
                  >
                    <FaCode className="text-lg" style={{ color: skill.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                      {skill.featured && <FaStar className="text-yellow-400" />}
                    </div>
                    <p className="text-gray-400 text-sm">{skill.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span>Level:</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx < skill.level ? 'bg-indigo-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-white font-medium">{skill.level}/10</span>
                    </div>
                  </div>
                  <span>{skill.yearsExperience} years experience</span>
                </div>
                
                <p className="text-gray-300 mb-4">{skill.description}</p>
                
                {skill.projects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-400 text-sm">Projects:</span>
                    {skill.projects.map((project, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {project}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    setEditingSkill(skill);
                    setShowForm(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>
                
                <motion.button
                  onClick={() => skill.id && handleDeleteSkill(skill.id)}
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

      <AnimatePresence>
        {showForm && (
          <SkillForm
            skill={editingSkill || undefined}
            onSave={handleSaveSkill}
            onCancel={() => {
              setShowForm(false);
              setEditingSkill(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsManager;