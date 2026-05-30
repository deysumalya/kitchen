import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import VideoExperience from './components/VideoExperience';
import Blog, { BlogPost } from './components/Blog';
import Gallery from './components/Gallery';
import MenuComponent from './components/Menu';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

const GA_ID = 'G-J5Q52RQFGR';

// Fires a GA4 page_view event on every React Router navigation
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
  return null;
};

const HomePage = () => <VideoExperience />;

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className={isHomePage ? 'App' : 'App min-h-screen bg-[#fcfaf7]'}>
      {!isHomePage && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <RouteTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuComponent />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
