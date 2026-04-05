import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import './App.css';
import VideoExperience from './components/VideoExperience';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import MenuComponent from './components/Menu';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

const HomePage = () => {
  return (
    <VideoExperience />
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('rannaghar_lang');
    if (!savedLang) {
      // Small timeout to ensure the blank screen doesn't jitter
      const timer = setTimeout(() => setShowLanguageModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const selectLanguage = (code) => {
    const currentHref = window.location.href;
    document.cookie = `googtrans=/en/${code}; path=/;`;
    if (window.location.hostname !== 'localhost') {
      document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname}`;
    }
    localStorage.setItem('rannaghar_lang', code);
    setShowLanguageModal(false);
    // Use explicit href so Vercel routes to the correct page, not just '/'
    window.location.href = currentHref;
  };
  
  return (
    <div className={isHomePage ? "App" : "App min-h-screen bg-[#fcfaf7]"}>
      {!isHomePage && <Navbar />}

      {/* Global Language Modal Protocol */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100 flex flex-col items-center text-center"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Globe2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
              <p className="text-gray-500 font-medium mb-8">Please select your preferred language<br/>আপনার ভাষা নির্বাচন করুন<br/>अपनी भाषा चुनें</p>
              
              <div className="w-full flex flex-col gap-3">
                <button 
                  onClick={() => selectLanguage('en')}
                  className="w-full bg-gray-50 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all font-bold text-gray-700 py-4 rounded-xl text-lg flex justify-between px-6"
                >
                  <span>English</span>
                  <span className="text-gray-400 font-normal">EN</span>
                </button>
                <button 
                  onClick={() => selectLanguage('bn')}
                  className="w-full bg-gray-50 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all font-bold text-gray-700 py-4 rounded-xl text-lg flex justify-between px-6"
                >
                  <span>বাংলা</span>
                  <span className="text-gray-400 font-normal">Bengali</span>
                </button>
                <button 
                  onClick={() => selectLanguage('hi')}
                  className="w-full bg-gray-50 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all font-bold text-gray-700 py-4 rounded-xl text-lg flex justify-between px-6"
                >
                  <span>हिन्दी</span>
                  <span className="text-gray-400 font-normal">Hindi</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {children}
      </main>
    </div>
  );
};

// Restores page position after a language-switch reload
const RedirectRestorer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const savedPath = sessionStorage.getItem('rannaghar_redirect_path');
    if (savedPath && savedPath !== '/') {
      sessionStorage.removeItem('rannaghar_redirect_path');
      navigate(savedPath, { replace: true });
    }
  }, [navigate]);
  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <RedirectRestorer />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuComponent />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
