import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto mx-auto">
      <div className={`relative bg-black bg-opacity-80 backdrop-blur-sm rounded-full border border-gray-700 shadow-lg transition-all duration-300 ${isMenuOpen ? 'py-2 px-6' : 'py-2 px-6'}`}>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-6">
          <a href="#home" className="text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Home</a>
          <a href="#about" className="text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>About</a>
          <a href="#skills" className="text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Skills</a>
          <a href="#projects" className="text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Projects</a>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Contact</a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <div className={`absolute top-full left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl mt-2 py-2 px-4 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
            <a href="#home" className="block py-2 text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Home</a>
            <a href="#about" className="block py-2 text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>About</a>
            <a href="#skills" className="block py-2 text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Skills</a>
            <a href="#projects" className="block py-2 text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Projects</a>
            <a href="#contact" className="block py-2 text-white hover:text-gray-300 transition-colors duration-200" onClick={closeMenu}>Contact</a>
          </div>

          <div className="flex-1"></div>

          <div
            className={`hamburger p-2 ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <div className="w-6 flex flex-col items-end space-y-1">
              <div className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`}></div>
              <div className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-5'}`}></div>
              <div className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-4'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;  