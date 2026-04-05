import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, BookOpen, Image as ImageIcon, Globe2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Menu', path: '/menu', icon: BookOpen },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  ];

  const selectLanguage = (code) => {
    const currentHref = window.location.href;
    document.cookie = `googtrans=/en/${code}; path=/;`;
    if (window.location.hostname !== 'localhost') {
        document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname}`;
    }
    localStorage.setItem('rannaghar_lang', code);
    window.location.href = currentHref;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[100px] sm:h-20 max-h-[140px] items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/main-logo.png" 
                alt="Rannaghar Caterer Logo" 
                className="h-16 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-bold transition-colors hover:text-orange-700 flex items-center gap-2 ${
                  location.pathname === link.path ? 'text-orange-700' : 'text-gray-900'
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-gray-900 font-bold hover:text-orange-700 py-2 px-3 rounded-lg border border-gray-200 shadow-sm bg-white"
              >
                <Globe2 size={20} />
                Language
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-1">
                  <button onClick={() => selectLanguage('en')} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50 hover:text-orange-700">English</button>
                  <button onClick={() => selectLanguage('bn')} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50 hover:text-orange-700">বাংলা</button>
                  <button onClick={() => selectLanguage('hi')} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50 hover:text-orange-700">हिन्दी</button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => {
                const current = localStorage.getItem('rannaghar_lang') || 'en';
                const next = current === 'en' ? 'bn' : current === 'bn' ? 'hi' : 'en';
                selectLanguage(next);
              }}
              className="text-gray-900 border border-gray-200 p-1.5 rounded-lg shadow-sm"
              title="Change Language"
            >
              <Globe2 size={24} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-orange-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute w-full top-[100px] sm:top-20 shadow-xl z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-xl text-lg font-bold ${
                  location.pathname === link.path 
                    ? 'text-orange-700 bg-orange-50' 
                    : 'text-gray-900 hover:text-orange-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={22} />
                  {link.name}
                </div>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 px-3">
              <p className="text-sm text-gray-500 font-bold mb-2 uppercase tracking-wider">Change Language</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => selectLanguage('en')} className="py-2 text-center border border-gray-200 rounded-lg font-bold text-gray-900 hover:bg-orange-50 active:bg-orange-100">EN</button>
                <button onClick={() => selectLanguage('bn')} className="py-2 text-center border border-gray-200 rounded-lg font-bold text-gray-900 hover:bg-orange-50 active:bg-orange-100">বাং</button>
                <button onClick={() => selectLanguage('hi')} className="py-2 text-center border border-gray-200 rounded-lg font-bold text-gray-900 hover:bg-orange-50 active:bg-orange-100">हिं</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
