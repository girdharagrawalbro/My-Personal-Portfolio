import { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
  FaPaperPlane
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean, message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_n6fhdnh', // Replace with your EmailJS service ID
        'template_jy99zle', // Replace with your EmailJS template ID
        formData,
        'TPC8kt38YA5v7jGwz' // Replace with your EmailJS user ID
      );

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later or contact me directly at girdharagrawalbro@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-indigo-900 to-black">
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
          className="mb-16 text-center"
        >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        
            <span className="text-gray-400 font-mono text-lg">06.</span>
            <span className="relative inline-block ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Let's Connect
            </span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Ready to build something amazing?</h3>
              <p className="text-gray-300 mb-8">
                I'm actively seeking freelance opportunities and collaborations. If you're looking for a dedicated developer to bring your ideas to life, let's talk.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                    <FaEnvelope className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Email</h4>
                    <a href="mailto:girdharagrawalbro@gmail.com" className="text-white hover:text-indigo-400 transition-colors">
                      girdharagrawalbro@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                    <FaPhone className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Phone</h4>
                    <a href="tel:+917909905038" className="text-white hover:text-indigo-400 transition-colors">
                      +91 7909905038
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                    <FaMapMarkerAlt className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Location</h4>
                    <p className="text-white">Raipur, Chhattisgarh, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-gray-400 text-sm mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {[
                    { icon: <FaGithub />, url: "https://github.com/girdharagrawalbro" },
                    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/girdhar-agrawal-124346220/" },
                    { icon: <FaInstagram />, url: "https://www.instagram.com/girdhar_agrawal/" },
                    { icon: <FaWhatsapp />, url: "https://wa.me/917909905038" },
                    { icon: <FaGlobe />, url: "https://codewithgirdhar.great-site.net/" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-700 hover:bg-indigo-600 text-white transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm"
            >
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
                  <p className={submitStatus.success ? 'text-green-300' : 'text-red-300'}>
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-transparent peer focus:border-indigo-500 focus:outline-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-3 px-1 bg-gray-800/50 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-300"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-transparent peer focus:border-indigo-500 focus:outline-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-3 px-1 bg-gray-800/50 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-300"
                  >
                    Your Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-transparent peer focus:border-indigo-500 focus:outline-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 -top-3 px-1 bg-gray-800/50 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-300"
                  >
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-transparent peer focus:border-indigo-500 focus:outline-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-3 px-1 bg-gray-800/50 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-300"
                  >
                    Your Message
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;