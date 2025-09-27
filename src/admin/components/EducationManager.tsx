import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Education } from '../../utils/educationData';

interface EducationFormProps {
  education?: Education;
  onSave: (education: Education) => void;
  onCancel: () => void;
}

const EducationForm = ({ education, onSave, onCancel }: EducationFormProps) => {
  const [formData, setFormData] = useState<Education>({
    id: 0,
    institution: '',
    degree: '',
    field: '',
    duration: '',
    location: '',
    grade: '',
    achievements: [],
    skills: [],
    logo: '🎓',
    ...education
  });
  const [skillsInput, setSkillsInput] = useState(education?.skills.join(', ') || '');
  const [achievementsInput, setAchievementsInput] = useState(education?.achievements?.join('\n') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const educationData = {
      ...formData,
      skills: skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill),
      achievements: achievementsInput.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement),
      id: education?.id || Date.now()
    };
    
    onSave(educationData);
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
            {education ? 'Edit Education' : 'Add New Education'}
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
              <label className="block text-gray-300 font-medium mb-2">Degree/Course</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g., Master of Computer Applications"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g., University of Delhi"
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
                placeholder="e.g., New Delhi, India"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Grade/Score</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., 8.5 CGPA, 85%"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the course, specialization, or relevant coursework..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="mr-3 h-4 w-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
            />
            <label htmlFor="current" className="text-gray-300">
              Currently studying
            </label>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 2021 - 2023, 3 years"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Skills & Technologies (comma separated)</label>
            <textarea
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Data Structures, Algorithms, Database Management, Java, Python, etc."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Achievements & Awards (one per line)</label>
            <textarea
              value={achievementsInput}
              onChange={(e) => setAchievementsInput(e.target.value)}
              placeholder="1st Rank at College Level&#10;Dean's List&#10;Published research paper&#10;Won coding competition"
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
            {loading ? 'Saving...' : 'Save Education'}
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

const EducationManager = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      // Import the education data (in a real app, this would come from Supabase)
      const { educationData } = await import('../../utils/educationData');
      setEducations(educationData || []);
    } catch (error) {
      console.error('Error fetching educations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEducation = async (educationData: Education) => {
    try {
      if (editingEducation) {
        // Update existing education
        const updatedEducations = educations.map(e => 
          e.id === editingEducation.id ? { ...educationData, id: editingEducation.id } : e
        );
        setEducations(updatedEducations);
      } else {
        // Add new education
        const newEducation = { ...educationData, id: Date.now().toString() };
        setEducations([...educations, newEducation]);
      }
      
      // In a real implementation, you would save to Supabase here
      // await supabase.from('educations').upsert(educationData);
      
      setShowForm(false);
      setEditingEducation(null);
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (confirm('Are you sure you want to delete this education record?')) {
      try {
        setEducations(educations.filter(e => e.id !== id));
        
        // In a real implementation:
        // await supabase.from('educations').delete().eq('id', id);
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading education records...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Education</h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <FaPlus />
          Add Education
        </motion.button>
      </div>

      <div className="grid gap-4">
        {educations.map((education) => (
          <motion.div
            key={education.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FaGraduationCap className="text-indigo-400 text-xl" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{education.degree}</h3>
                    <p className="text-indigo-300 font-medium">{education.institution}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span>{education.duration}</span>
                  {education.grade && <span>Grade: {education.grade}</span>}
                  {education.location && <span>{education.location}</span>}
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">{education.description}</p>
                
                {education.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {education.skills.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                        {skill}
                      </span>
                    ))}
                    {education.skills.length > 5 && (
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                        +{education.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {education.achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaTrophy className="text-yellow-400" />
                      <h4 className="text-gray-300 font-medium">Achievements & Awards:</h4>
                    </div>
                    <ul className="text-gray-400 text-sm space-y-1">
                      {education.achievements.slice(0, 3).map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                      {education.achievements.length > 3 && (
                        <li className="text-gray-500">+{education.achievements.length - 3} more achievements</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    setEditingEducation(education);
                    setShowForm(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>
                
                <motion.button
                  onClick={() => education.id && handleDeleteEducation(education.id)}
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
          <EducationForm
            education={editingEducation || undefined}
            onSave={handleSaveEducation}
            onCancel={() => {
              setShowForm(false);
              setEditingEducation(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationManager;