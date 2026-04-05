import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

import dish1 from '../assets/dish1.png';
import dish2 from '../assets/dish2.png';
import dish3 from '../assets/dish3.png';
import dish4 from '../assets/dish4.png';
import dish5 from '../assets/dish5.png';
import dish6 from '../assets/dish6.png';
import dish7 from '../assets/dish7.png';
import dish9 from '../assets/dish9.png';
import dish10 from '../assets/dish10.png';

const FloatingDishes = () => {
  const [clickedDishes, setClickedDishes] = useState(new Set());
  const [dishConfigs, setDishConfigs] = useState([]);
  
  // Calculate configurations identically ONCE at mount without conditional hooks
  useEffect(() => {
    const baseDishes = [dish1, dish2, dish3, dish4, dish5, dish6];
    
    const configs = baseDishes.map((dishImg, i) => {
      const isLeftEdge = i % 2 === 0;
      return {
        dishImg,
        id: i,
        left: isLeftEdge ? `${Math.floor(Math.random() * 20)}%` : `${Math.floor(Math.random() * 15) + 75}%`,
        // Start much higher to prevent popping in mid-air
        top: `-${Math.floor(Math.random() * 60 + 20)}vh`,
        // Massively randomize speeds from crazy fast to painfully slow floating
        duration: Math.floor(Math.random() * 35) + 10,
        delay: Math.random() * 10,
        size: Math.floor(Math.random() * 100) + 100
      };
    });
    
    setDishConfigs(configs);
  }, []);
  
  const playClickSound = (index) => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(err => console.log('Audio playback prevented:', err));
    
    setClickedDishes(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    setTimeout(() => {
      setClickedDishes(current => {
        const nextSet = new Set(current);
        nextSet.delete(index);
        return nextSet;
      });
    }, Math.floor(Math.random() * 10000) + 10000);
  };
  
  const elements = dishConfigs.map((config) => {
    
    // Check if clicked
    const isClicked = clickedDishes.has(config.id);

    return (
      <motion.img
        key={config.id}
        src={config.dishImg}
        alt={`Falling decoration ${config.id + 1}`}
        onClick={() => playClickSound(config.id)}
        whileHover={!isClicked ? { scale: 1.15 } : {}}
        whileTap={!isClicked ? { scale: 0.9 } : {}}
        style={{
          position: 'absolute',
          top: config.top,
          left: config.left,
          width: `${config.size}px`,
          height: 'auto',
          objectFit: 'contain',
          // Optimize filter to be much lighter on the GPU to stop the video from stuttering
          filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.4))',
          pointerEvents: isClicked ? 'none' : 'auto',
          cursor: isClicked ? 'default' : 'pointer',
          zIndex: 5,
          // Force Hardware Acceleration so the browser GPU renders the physics smoothly instead of the CPU
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 1, y: 0 }}
        animate={
          isClicked 
            ? { scale: 0, opacity: 0, rotate: 180 } 
            : { y: '150vh' } // Fall deep past screen bottom
        }
        transition={
          isClicked
            ? { duration: 0.4, ease: "easeOut" } // Fast suck-in pop animation
            : {
                duration: config.duration,
                delay: config.delay,
                repeat: Infinity,
                ease: "linear"
              }
        }
      />
    );
  });

  return (
      <div className="floating-background-container desktop-only-rain" style={{ zIndex: 5, overflow: 'hidden', pointerEvents: 'none' }}>
        {elements}
      </div>
  );
};

const VideoExperience = () => {
  const [videoStage, setVideoStage] = useState('welcome'); // 'welcome', 'waiting', 'main', 'complete'
  const [showClickHere, setShowClickHere] = useState(false);
  const welcomeVideoRef = useRef(null);
  const mainVideoRef = useRef(null);
  const isClickingRef = useRef(false);

  const welcomeVideoUrl = "https://customer-assets.emergentagent.com/job_51748072-d3a9-4e11-81ea-349df3f9a9ea/artifacts/j5snnush_WhatsApp%20Video%202026-04-04%20at%203.48.23%20PM%20%281%29.mp4";
  const mainVideoUrl = "https://customer-assets.emergentagent.com/job_51748072-d3a9-4e11-81ea-349df3f9a9ea/artifacts/qzo32wn2_km_20260404_720p_60f_20260404_195649.mp4";

  useEffect(() => {
    if (videoStage === 'welcome' && welcomeVideoRef.current) {
      // Add a small delay to ensure video is loaded
      const timer = setTimeout(() => {
        if (welcomeVideoRef.current) {
          welcomeVideoRef.current.play().catch(err => {
            console.log("Autoplay prevented:", err);
            // If autoplay fails, show click here immediately
            setShowClickHere(true);
            setVideoStage('waiting');
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [videoStage]);

  const handleWelcomeVideoEnd = () => {
    console.log("Welcome video ended");
    setShowClickHere(true);
    setVideoStage('waiting');
  };

  const handleWelcomeVideoError = (e) => {
    console.error("Welcome video error:", e);
    // If video fails to load, show click here button immediately
    setShowClickHere(true);
    setVideoStage('waiting');
  };

  const handleClickHere = () => {
    // Prevent double clicking from queueing multiple timeouts and breaking the media pipeline
    if (isClickingRef.current) return;
    isClickingRef.current = true;
    
    setShowClickHere(false);
    setVideoStage('main');
    // Use setTimeout to ensure video element is rendered before playing
    setTimeout(() => {
      if (mainVideoRef.current) {
        mainVideoRef.current.play().catch(err => {
          console.log("Main video autoplay failed:", err);
        });
      }
    }, 100);
  };

  const handleMainVideoClick = (e) => {
    // Prevent any interaction with the video
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMainVideoEnd = (e) => {
    // Extreme strict guard: The Vercel stream bug must not be allowed to instantly push the browser to the white
    // CTA screen! The video must prove it actually played for at least 5 SECONDS.
    if (e.target && e.target.currentTime > 5) {
      setVideoStage('complete');
    } else {
      console.log('Video fired false onEnded event before completion. Ignored to prevent skipping straight to the white screen.');
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+919831924872';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919831924872', '_blank');
  };

  return (
    <div className="video-experience">
      {/* Floating Dish Decorations - ONLY SHOW DURING MAIN VIDEO */}
      {videoStage === 'main' && <FloatingDishes />}

      {/* Welcome Video Section */}
      {(videoStage === 'welcome' || videoStage === 'waiting') && (
        <>
          <div className="video-container">
          {/* Mobile Frame */}
          <div className="mobile-frame">
            <video
              ref={welcomeVideoRef}
              className="welcome-video"
              muted
              playsInline
              onEnded={handleWelcomeVideoEnd}
              onError={handleWelcomeVideoError}
              preload="auto"
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src={welcomeVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Text Overlay */}
            <motion.div
              className="video-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="overlay-text">
                <p className="welcome-text">Dear user,</p>
                <h2 className="welcome-title">Welcome to Rannaghar Caterer</h2>
              </div>
            </motion.div>

            {/* Click Here Button - Top Right */}
            <AnimatePresence>
              {showClickHere && (
                <motion.div
                  className="click-here-container-topright"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <button className="click-here-btn" onClick={handleClickHere}>
                    <span>Click Here</span>
                    <ArrowRight size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </>
      )}

      {/* Main Video Section */}
      {videoStage === 'main' && (
        <>
          <motion.div
            className="video-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Frame */}
          <div className="mobile-frame">
            <video
              ref={mainVideoRef}
              className="main-video"
              playsInline
              // STRICTLY NO AUTOPLAY ATTRIBUTE HERE to prevent browser double-buffering audio
              onEnded={handleMainVideoEnd}
              preload="auto"
              controlsList="nodownload nofullscreen noplaybackrate"
              disablePictureInPicture
              disableRemotePlayback
              onContextMenu={(e) => e.preventDefault()}
              onClick={handleMainVideoClick}
              onDoubleClick={handleMainVideoClick}
            >
              <source src={mainVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        </>
      )}

      {/* Complete Section - CTAs and Message */}
      {videoStage === 'complete' && (
        <motion.div
          className="complete-section light-theme"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="complete-content">
            
            {/* The Brand Logo Animation Video plays with sound! */}
            <motion.div 
              style={{ width: '100%', maxWidth: '500px', margin: '0 auto 40px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <video 
                src="/logo_animation.mp4" 
                autoPlay 
                playsInline 
                controlsList="nodownload"
                style={{ width: '100%', display: 'block' }}
              />
            </motion.div>

            <motion.h2
              className="thank-you-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Let's Make Your Event Memorable
            </motion.h2>

            <motion.div
              className="cta-buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="cta-btn cta-call" onClick={handleCall}>
                <Phone size={20} />
                <span>Call Now</span>
              </button>
              <button className="cta-btn cta-whatsapp" onClick={handleWhatsApp}>
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </button>
            </motion.div>

            <motion.p
              className="contact-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              +91 9831924872
            </motion.p>

            <motion.div
              className="owner-message"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="message-card">
                <p className="message-text">
                  "Proudly serving exquisite culinary experiences across <strong>Kolkata and Howrah</strong>. We specialize in bringing mouth-watering catering services to birthdays, weddings, or any grand celebration."
                </p>
                <p className="message-signature">— Rannaghar Caterer</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoExperience;
