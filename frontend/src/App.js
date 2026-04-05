import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
  
  return (
    <div className={isHomePage ? "App" : "App min-h-screen bg-[#fcfaf7]"}>
      {!isHomePage && <Navbar />}
      <main>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
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
