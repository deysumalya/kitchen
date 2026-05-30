import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, BookOpen, Image as ImageIcon, Globe2 } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'বাংলা',   short: 'বাং' },
  { code: 'hi', label: 'हिन्दी',  short: 'हिं' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home',    path: '/',        icon: HomeIcon  },
    { name: 'Menu',    path: '/menu',    icon: BookOpen  },
    { name: 'Blog',    path: '/blog',    icon: BookOpen  },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  ];

  // Sets blog language preference and navigates to blog if not already there
  const selectLanguage = (code) => {
    localStorage.setItem('rannaghar_blog_lang', code);
    setLangMenuOpen(false);
    setIsOpen(false);

    if (location.pathname.startsWith('/blog')) {
      const parts = location.pathname.split('/').filter(Boolean); // e.g. ["blog", "en", "slug"] or ["blog", "en"]
      if (parts.length === 3) {
        // Individual blog post page: /blog/:lang/:slug
        const slug = parts[2];
        navigate(`/blog/${code}/${slug}`);
      } else if (parts.length === 2 && ['en', 'bn', 'hi'].includes(parts[1])) {
        // Blog list page: /blog/:lang
        navigate(`/blog/${code}`);
      } else {
        navigate(`/blog/${code}`);
      }
    } else {
      navigate(`/blog/${code}`);
    }
  };

  // Determine current language from URL if on blog, else local storage
  let currentLang = 'en';
  if (location.pathname.startsWith('/blog')) {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length >= 2 && ['en', 'bn', 'hi'].includes(parts[1])) {
      currentLang = parts[1];
    } else {
      currentLang = localStorage.getItem('rannaghar_blog_lang') || 'en';
    }
  } else {
    currentLang = localStorage.getItem('rannaghar_blog_lang') || 'en';
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/main-logo.png"
                alt="Rannaghar Caterer Logo"
                className="h-14 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
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

            {/* Desktop Language Dropdown — only affects blog content */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-gray-900 font-bold hover:text-orange-700 py-2 px-3 rounded-lg border border-gray-200 shadow-sm bg-white"
              >
                <Globe2 size={18} />
                <span className="text-sm">{LANGS.find(l => l.code === currentLang)?.label || 'Language'}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-1 z-50">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => selectLanguage(l.code)}
                      className={`block w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                        currentLang === l.code
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-900 hover:bg-orange-50 hover:text-orange-700'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Globe + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="text-gray-900 border border-gray-200 p-1.5 rounded-lg shadow-sm"
              title="Blog Language"
            >
              <Globe2 size={22} />
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

      {/* Mobile Language Picker (inline) */}
      {langMenuOpen && (
        <div className="md:hidden bg-orange-50 border-b border-orange-100 px-4 py-3">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Blog Language</p>
          <div className="flex gap-2">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => selectLanguage(l.code)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${
                  currentLang === l.code
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-orange-400'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute w-full shadow-xl z-50">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
