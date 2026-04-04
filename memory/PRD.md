# Rannaghar Caterer - Landing Page PRD

## Project Overview
A unique two-stage video landing page for Rannaghar Caterer that creates an engaging user experience through sequential video interactions.

## Original Requirements
- Two-stage landing experience:
  1. First landing: "Best Recommended Catering Service" - Rannaghar Caterer (3 seconds)
  2. Second landing: Video experience with user interaction
- Welcome video with text overlay ("Dear user, Welcome to Rannaghar Caterer")
- Video pauses at end, shows "Click Here" button
- Clicking reveals main video with audio
- After main video: Call & WhatsApp CTAs with owner message
- On page reload: Skip first landing page, go directly to videos
- Contact: +91 9831924872

## Architecture

### Frontend Stack
- React 19 with functional components
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS + custom styling (db brand design guidelines)

### Backend Stack
- FastAPI with video proxy endpoints
- httpx for streaming video content
- CORS-enabled for frontend access

### Design System
- Colors: Brand grey (#61525a), white, dark surfaces
- Typography: System fonts with clean hierarchy
- Animations: Smooth transitions using Framer Motion
- Glass-morphism effects with backdrop blur

## Implementation Status (December 4, 2026)

### ✅ Completed Features

#### Frontend Components
1. **FirstLanding.js**
   - Shows "Best Recommended" badge
   - "Catering Service" heading
   - "Rannaghar Caterer" brand name
   - Animated loading dots
   - 3-second auto-transition
   - Framer Motion animations

2. **VideoExperience.js**
   - Welcome video with text overlay
   - "Click Here" button on video end
   - Main video playback
   - Call & WhatsApp CTA buttons
   - Owner message card
   - Error handling for video loading

3. **App.js**
   - localStorage management for visit tracking
   - Stage-based rendering
   - First-time vs returning user logic

4. **Styling (App.css)**
   - Responsive design (mobile & desktop)
   - Glass-morphism effects
   - Button hover states
   - Loading animations
   - Video overlay styling

#### Backend Endpoints
1. **Video Proxy (/api/video/)**
   - `/api/video/welcome` - Streams welcome video
   - `/api/video/main` - Streams main video
   - CORS-enabled streaming
   - Chunk-based delivery (65KB chunks)

### 🔧 Technical Implementation

#### Video URLs (proxied through backend)
- Welcome: `https://customer-assets.emergentagent.com/.../WhatsApp Video...mp4` (892KB)
- Main: `https://customer-assets.emergentagent.com/.../km_20260404...mp4` (46.1MB)

#### State Management
```javascript
- stage: null | 'first' | 'video'
- videoStage: 'welcome' | 'waiting' | 'main' | 'complete'
- showClickHere: boolean
- hasVisited: localStorage flag
```

#### Video Flow
1. Auto-play welcome video (muted)
2. On video end → show "Click Here"
3. Click → play main video (with audio, controls)
4. On video end → show CTA section

### 📦 Dependencies Added
- framer-motion@12.38.0
- httpx (backend, for video streaming)

## Known Issues & Considerations

1. **Video Loading**
   - Welcome video errors logged in console
   - Videos load through backend proxy to avoid CORS
   - Large video file (46MB) may take time to load
   - Error handling shows "Click Here" immediately if video fails

2. **First Landing Page**
   - Works correctly but transitions quickly (3 seconds)
   - localStorage prevents showing on reload (as designed)

3. **Browser Compatibility**
   - Autoplay might be blocked by browser policies
   - Error handlers trigger "Click Here" as fallback

## User Flow

### First-Time Visit
1. Load page → First landing (3s)
2. Auto-transition → Welcome video plays
3. Video ends → "Click Here" appears
4. Click → Main video plays
5. Video ends → CTA section with Call/WhatsApp
6. localStorage set → next visit skips first landing

### Returning Visit
1. Load page → Directly to welcome video
2. Same flow from step 3 onwards

## Contact Information
- Phone: +91 9831924872
- Call button: Opens tel: link
- WhatsApp button: Opens WhatsApp Web/App

## Owner Message
"We provide catering service for birthday, wedding or for any occasion to make the celebration more enjoyable with mouth watering food."

## Next Steps & Potential Enhancements

### P0 (Critical - if videos not loading properly)
- [ ] Optimize video streaming (consider chunked range requests)
- [ ] Add video loading indicators
- [ ] Implement fallback for video playback issues

### P1 (High Priority)
- [ ] Add service menu/food categories section
- [ ] Gallery of past events
- [ ] Testimonials from customers
- [ ] Booking form integration

### P2 (Nice to Have)
- [ ] Add more interactive elements
- [ ] Social media integration
- [ ] Google Maps location
- [ ] Email contact option
- [ ] Multiple language support

## Files Modified/Created

### Frontend
- `/app/frontend/src/App.js` - Main app with stage management
- `/app/frontend/src/components/FirstLanding.js` - First landing page
- `/app/frontend/src/components/VideoExperience.js` - Video interaction page
- `/app/frontend/src/App.css` - Complete styling

### Backend
- `/app/backend/video_proxy.py` - Video streaming endpoints
- `/app/backend/server.py` - Added video router

### Dependencies
- `package.json` - Added framer-motion
- `requirements.txt` - Already had httpx

## Design Guidelines Applied
- db brand color palette (#61525a primary)
- Clean typography with proper hierarchy
- Smooth animations and transitions
- Glass-morphism for overlay effects
- Responsive design for all devices
- Modern, stylish aesthetic
