import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaBriefcase } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExperienceItem } from '../../utils/experienceData';

interface ExperienceFormProps {
  experience?: ExperienceItem;
  onSave: (experience: ExperienceItem) => void;
  onCancel: () => void;
}

const ExperienceForm = ({ experience, onSave, onCancel }: ExperienceFormProps) => {
  const [formData, setFormData] = useState<ExperienceItem>({
    id: '',
    title: '',
    company: '',
    location: '',
    duration: '',
    type: 'work',
    description: [],
    skills: [],
    achievements: [],
    current: false,
    ...experience
  });
  const [skillsInput, setSkillsInput] = useState(experience?.skills.join(', ') || '');
  const [achievementsInput, setAchievementsInput] = useState(experience?.achievements?.join('\n') || '');
  const [descriptionInput, setDescriptionInput] = useState(experience?.description.join('\n') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const experienceData: ExperienceItem = {
      ...formData,
      skills: skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill),
      achievements: achievementsInput.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement),
      description: descriptionInput.split('\n').map(desc => desc.trim()).filter(desc => desc),
      id: experience?.id || Date.now().toString()
    };
    
    onSave(experienceData);
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
        className="bg-gray-900 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">
            {experience ? 'Edit Experience' : 'Add New Experience'}
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
              <label className="block text-gray-300 font-medium mb-2">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'work' | 'education' | 'project' })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Description (one point per line)</label>
            <textarea
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="• First achievement or responsibility&#10;• Second achievement or responsibility&#10;• Third achievement or responsibility"
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., Jun 2023 - Present, Sep 2022 - Mar 2023"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current || false}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                className="mr-3 h-4 w-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
              />
              <label htmlFor="current" className="text-gray-300">
                Currently working here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Skills (comma separated)</label>
            <textarea
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="React, Node.js, MongoDB, Python, etc."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Achievements (one per line)</label>
            <textarea
              value={achievementsInput}
              onChange={(e) => setAchievementsInput(e.target.value)}
              placeholder="Increased performance by 40%&#10;Led team of 5 developers&#10;Implemented new features"
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
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
            {loading ? 'Saving...' : 'Save Experience'}
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

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      // Import the experience data (in a real app, this would come from Supabase)
      const { experienceData } = await import('../../utils/experienceData');
      setExperiences(experienceData);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExperience = async (experienceData: ExperienceItem) => {
    try {
      if (editingExperience) {
        // Update existing experience
        const updatedExperiences = experiences.map(e => 
          e.id === editingExperience.id ? { ...experienceData, id: editingExperience.id } : e
        );
        setExperiences(updatedExperiences);
      } else {
        // Add new experience
        const newExperience = { ...experienceData, id: Date.now().toString() };
        setExperiences([...experiences, newExperience]);
      }
      
      // In a real implementation, you would save to Supabase here
      // await supabase.from('experiences').upsert(experienceData);
      
      setShowForm(false);
      setEditingExperience(null);
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        setExperiences(experiences.filter(e => e.id !== id));
        
        // In a real implementation:
        // await supabase.from('experiences').delete().eq('id', id);
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading experiences...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Experience</h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <FaPlus />
          Add Experience
        </motion.button>
      </div>

      <div className="grid gap-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FaBriefcase className="text-indigo-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                    <p className="text-indigo-300 font-medium">{experience.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span>{experience.duration}</span>
                  <span>{experience.type}</span>
                  {experience.location && <span>{experience.location}</span>}
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">{experience.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.skills.slice(0, 5).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 5 && (
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                      +{experience.skills.length - 5} more
                    </span>
                  )}
                </div>

                {experience.achievements && experience.achievements.length > 0 && (
                  <div>
                    <h4 className="text-gray-300 font-medium mb-2">Key Achievements:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      {experience.achievements.slice(0, 3).map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                      {experience.achievements.length > 3 && (
                        <li className="text-gray-500">+{experience.achievements.length - 3} more achievements</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    setEditingExperience(experience);
                    setShowForm(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>
                
                <motion.button
                  onClick={() => experience.id && handleDeleteExperience(experience.id)}
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
          <ExperienceForm
            experience={editingExperience || undefined}
            onSave={handleSaveExperience}
            onCancel={() => {
              setShowForm(false);
              setEditingExperience(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceManager;