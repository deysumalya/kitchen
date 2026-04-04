import React, { useState, useEffect } from 'react';
import './App.css';
import FirstLanding from './components/FirstLanding';
import VideoExperience from './components/VideoExperience';

function App() {
  const [stage, setStage] = useState(null); // null, 'first', 'video'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('rannaghar_visited');
    
    if (hasVisited) {
      // Skip first landing, go directly to video
      setStage('video');
    } else {
      // Show first landing page
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
    <div className="App">
      {stage === 'first' && (
        <FirstLanding onComplete={handleFirstLandingComplete} />
      )}
      {stage === 'video' && (
        <VideoExperience />
      )}
    </div>
  );
}

export default App;
