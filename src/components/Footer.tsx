import { FaGithub, FaLinkedinIn, FaInstagram, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/girdharagrawalbro" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/girdhar-agrawal-124346220/" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/codewithgirdhar/" },
    { icon: <FaLink />, url: "https://codewithgirdhar.great-site.net/" }

  ];


  return (
    <footer className="relative pt-10 pb-10 bg-gradient-to-b from-black via-indigo-900 to-black ">
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center "
        >
          {/* Logo */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-2xl font-bold text-white"
            >

              <span className="text-indigo-400 mr-2">&lt;/&gt;</span>
              <span>GirdharAgrawal</span>

            </motion.div>
            <p className="text-gray-800 mt-3">
              &copy; {currentYear} Girdhar Agrawal. All rights reserved.
            </p>

          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gray-800 hover:bg-indigo-600 text-white transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;