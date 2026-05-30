import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
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

// Redirects `/blog` to the user's preferred language listing page (defaults to English)
const BlogRedirect = () => {
  const savedLang = localStorage.getItem('rannaghar_blog_lang') || 'en';
  return <Navigate to={`/blog/${savedLang}`} replace />;
};

// Redirects legacy `/blog/:slug` links to `/blog/:lang/:slug` (defaults to English)
const BlogPostLegacyRedirect = () => {
  const { slug } = useParams();
  const savedLang = localStorage.getItem('rannaghar_blog_lang') || 'en';
  return <Navigate to={`/blog/${savedLang}/${slug}`} replace />;
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
            
            {/* Blog Listings per Language */}
            <Route path="/blog/en" element={<Blog lang="en" />} />
            <Route path="/blog/bn" element={<Blog lang="bn" />} />
            <Route path="/blog/hi" element={<Blog lang="hi" />} />
            
            {/* Blog Post Details per Language */}
            <Route path="/blog/en/:slug" element={<BlogPost lang="en" />} />
            <Route path="/blog/bn/:slug" element={<BlogPost lang="bn" />} />
            <Route path="/blog/hi/:slug" element={<BlogPost lang="hi" />} />
            
            {/* Redirects */}
            <Route path="/blog" element={<BlogRedirect />} />
            <Route path="/blog/:slug" element={<BlogPostLegacyRedirect />} />
            
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
