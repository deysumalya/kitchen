import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Phone, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

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

const ZigZagBalloon = ({ onClick }) => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 400;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  return (
    <motion.div
      onClick={onClick}
      className="fixed z-[60] cursor-pointer pointer-events-auto"
      style={{ top: 0, left: 0 }}
      animate={{
        x: [vw * 0.75, vw * 0.1, vw * 0.75, vw * 0.1, vw * 0.75],
        y: [-80, vh * 0.25, vh * 0.55, vh * 0.8, vh * 1.05],
        rotate: [-4, 4, -4, 4, -4],
      }}
      transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      whileHover={{ scale: 1.12 }}
    >
      <div className="relative bg-white text-gray-900 border-2 border-orange-500 shadow-2xl rounded-full px-5 py-3 flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
        <span className="text-2xl">🎈</span>
        <div>
          <span className="block text-orange-600 text-xs font-bold leading-tight">Click here to see</span>
          <span className="block text-gray-800 font-bold leading-tight">Our Catering Service</span>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-5 bg-orange-400 rounded-full" />
      </div>
    </motion.div>
  );
};

// Trigger redeployment
const VideoExperience = () => {
  const [videoStage, setVideoStage] = useState('complete'); // 'main', 'complete'
  const [showMapModal, setShowMapModal] = useState(false);
  const mainVideoRef = useRef(null);
  const navigate = useNavigate();

  const mainVideoUrl = "https://customer-assets.emergentagent.com/job_51748072-d3a9-4e11-81ea-349df3f9a9ea/artifacts/qzo32wn2_km_20260404_720p_60f_20260404_195649.mp4";

  const playMainVideo = () => {
    setVideoStage('main');
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

  const handleMapLink = () => {
    setShowMapModal(true);
  };

  const actuallyOpenMap = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rannaghar+Caterer+Brojonath+Lahiri+Ln+Howrah', '_blank');
    setShowMapModal(false);
  };

  return (
    <div className={`video-experience ${videoStage === 'complete' ? '!overflow-y-auto' : ''}`}>
      {/* Balloon on complete stage */}
      {videoStage === 'complete' && <ZigZagBalloon onClick={playMainVideo} />}

      {/* Floating Dish Decorations - ONLY SHOW DURING MAIN VIDEO */}
      {videoStage === 'main' && <FloatingDishes />}

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
          <div className="absolute inset-x-0 top-0 z-50">
            <Navbar />
          </div>
          <div className="complete-content pt-24">
            
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
              <button className="cta-btn cta-map" onClick={handleMapLink}>
                <MapPin size={20} />
                <span>Find Us on Map</span>
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
                  "Proudly serving exquisite culinary experiences across <strong>Kolkata and Howrah</strong> with <strong>7+ years of experience</strong>. We specialize in bringing mouth-watering catering services to birthdays, weddings, or any grand celebration."
                </p>
                <p className="message-signature">— Rannaghar Caterer</p>
              </div>
            </motion.div>

            {/* Explict Navigation Links */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-4 border-t border-gray-100 pt-8 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
               <button onClick={() => navigate('/menu')} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-full px-6 py-2 transition-colors flex items-center gap-2">
                  View Sample Menu
               </button>
               <button onClick={() => navigate('/blog')} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-full px-6 py-2 transition-colors flex items-center gap-2">
                  Read Our Articles
               </button>
            </motion.div>
          </div>

          {/* Underdog Map Modal Overlay */}
          <AnimatePresence>
            {showMapModal && (
              <motion.div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-gray-100"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-4">A Quick Note Before We Go...</h3>
                  <p className="text-gray-700 mb-8 font-medium leading-relaxed">
                    We might be new to Google Maps, but our passion for authentic Bengali catering is unmatched. Please call us and give us a chance to make your event truly unforgettable!
                  </p>
                  <div className="flex flex-col gap-3">
                    <button onClick={actuallyOpenMap} className="bg-[#4285F4] hover:bg-[#3367d6] transition-colors text-white font-bold py-4 px-8 rounded-full w-full shadow-lg flex items-center justify-center gap-2">
                       <MapPin size={20} />
                       Continue to Google Maps
                    </button>
                    <button onClick={() => setShowMapModal(false)} className="text-gray-500 font-medium py-3 hover:text-gray-800 transition-colors">
                       Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default VideoExperience;
