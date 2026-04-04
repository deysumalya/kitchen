import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import FirstLanding from './components/FirstLanding';
import VideoExperience from './components/VideoExperience';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import { Menu, X, Home as HomeIcon, BookOpen, Image as ImageIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Rannaghar
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-600 flex items-center gap-2 ${
                  location.pathname === link.path ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-orange-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} />
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

const HomePage = () => {
  const [stage, setStage] = useState(null); // null, 'first', 'video'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('rannaghar_visited');
    if (hasVisited) {
      setStage('video');
    } else {
      setStage('first');
      localStorage.setItem('rannaghar_visited', 'true');
    }
    setIsLoading(false);
  }, []);

  const handleFirstLandingComplete = () => {
    setStage('video');
  };

  if (isLoading) {
    return <div className="App" style={{ background: '#f7f5f2' }}></div>;
  }

  return (
    <>
      {stage === 'first' ? (
        <FirstLanding onComplete={handleFirstLandingComplete} />
      ) : (
        <VideoExperience />
      )}
    </>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={isHomePage ? "app-wrapper-home" : "min-h-screen bg-[#fcfaf7]"}>
      {!isHomePage && <Navbar />}
      <main>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
