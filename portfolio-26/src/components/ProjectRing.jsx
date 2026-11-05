import React, { useEffect, useRef, useState } from 'react';
import HologramCard from './HologramCard';
import { trackEvent } from '../lib/analytics';

// --- PLACEHOLDER DATA (Replace with your real imports) ---
import project1Img from '../assets/project1.png'; 
import project2Img from '../assets/project2.png'; 
import project3Img from '../assets/project3.png'; 
import project4Img from '../assets/project4.png';
import project5Img from '../assets/project5.png';

const projects = [
  { id: 1, title: 'BIRD ROCK SURF SHOP', type: 'WEB APP', status: 'DEPLOYED', image: project1Img, link: 'https://sd-surf-shop.netlify.app', desc: 'Full-stack application with autonomous routing.', stack: ['REACT', 'VITE', 'FIGMA'] },
  { id: 2, title: 'COACH MARK', type: 'WEB APP', status: 'DEMO', image: project2Img, link: 'https://dgomez619.github.io/football-coach/#', desc: 'Youth coaching platform with interactive features.', stack: ['REACT', 'VITE', 'TAILWINDCSS'] },
  { id: 3, title: 'HOSPEDAJE POR DIAS', type: 'WEB APP', status: 'OFFLINE', image: project3Img, link: 'https://hpdvnz.netlify.app', desc: 'Short-term rental management platform.', stack: ['REACT', 'VITE', 'TAILWINDCSS', 'CLOUDINARY'] },
  { id: 4, title: 'MAPAGYM', type: 'WEB APP', status: 'IN DEVELOPMENT', image: project5Img, link: 'https://mapagym.netlify.app', desc: 'Fitness tracking and gym management application.', stack: ['REACT', 'VITE', 'GOOGLE MAPS API', 'MATERIAL UI'] },
  { id: 5, title: 'SPACE TRAVEL', type: 'WEB SITE', status: 'DEPLOYED', image: project4Img, link: 'https://comforting-bavarois-5bd4d5.netlify.app/', desc: 'Fundamental use of HTML, CSS, and JavaScript to produce an interactive web experience.', stack: ['HTML', 'CSS', 'JAVASCRIPT'] },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'DEPLOYED':
      return '#00ff41';
    case 'DEMO':
      return '#00e5ff';
    case 'IN DEVELOPMENT':
      return '#fcee0a';
    case 'OFFLINE':
      return '#ff003c';
    default:
      return '#00ff41';
  }
};

const ProjectRing = () => {
  // --- STATE ---
  const [activeIndex, setActiveIndex] = useState(0);       // Controls Ring Rotation
  const [selectedProject, setSelectedProject] = useState(null); // Controls Detail View
  const [isAnimating, setIsAnimating] = useState(false);   // Controls Transitions
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const didSwipe = useRef(false);

  // --- 3D MATH CONFIG (Your Original Settings) ---
  const radius = 220; // Slightly increased for breathing room
  const anglePerItem = 360 / projects.length;
  const normalizedActiveIndex = ((activeIndex % projects.length) + projects.length) % projects.length;

  // --- HANDLERS ---
  const rotateCarousel = (direction) => {
    if (selectedProject) return; // Lock rotation if viewing details
    setActiveIndex((currentIndex) => currentIndex + direction);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedProject) {
        if (event.key === 'Escape') {
          setIsAnimating(true);
          setTimeout(() => {
            setSelectedProject(null);
            setIsAnimating(false);
          }, 400);
        }
        return;
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((currentIndex) => currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((currentIndex) => currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    didSwipe.current = false;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    const swipeThreshold = 35;

    // Only rotate on intentional horizontal swipes; vertical gestures keep scrolling the page.
    if (Math.abs(deltaX) >= swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipe.current = true;
      rotateCarousel(deltaX < 0 ? 1 : -1);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleCardClick = (project) => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    trackEvent('project_opened', {
      project_name: project.title,
      project_status: project.status,
    });
    setIsAnimating(true);
    // 1. Wait for fade-out animation
    setTimeout(() => {
      setSelectedProject(project);
      setIsAnimating(false);
    }, 400);
  };

  const handleBack = () => {
    setIsAnimating(true);
    // 1. Wait for fade-out of detail view
    setTimeout(() => {
      setSelectedProject(null);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div style={styles.scene}>
      
      {/* ---------------------------------------------------- */}
      {/* 1. THE GYRATORY RING (Visible when no project selected) */}
      {/* ---------------------------------------------------- */}
      {!selectedProject && (
        <div 
          className="project-ring-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            ...styles.ringWrapper, // Wrapper to handle opacity transition
            opacity: isAnimating ? 0 : 1,
            pointerEvents: isAnimating ? 'none' : 'auto',
          }}
        >
          {/* Top-left HUD Header */}
          <div style={styles.hudHeader}>
            <span style={styles.hudHeaderDot} />
            <span>MISSION_LOG</span>
          </div>

          <div className="project-ring-carousel-container" style={styles.carouselContainer}>
            <div 
              style={{
                ...styles.carousel,
                // The "Gyratory" Rotation Logic
                transform: `translateZ(-${radius}px) rotateY(${activeIndex * -anglePerItem}deg)`
              }}
            >
              {/* 3D Holographic Emitter Floor Ring */}
              <div style={styles.holoFloorRing}>
                <div style={styles.holoFloorInner} />
              </div>

              {projects.map((project, index) => {
                const rotateY = index * anglePerItem;
                const isActive = index === normalizedActiveIndex;
                const statusColor = getStatusColor(project.status);
                const nodeCode = `0${index + 1}`;
                
                return (
                  <div 
                    key={project.id}
                    onClick={() => handleCardClick(project)} // CLICK TRIGGER
                    className={`ring-card ${isActive ? 'ring-card-active' : 'ring-card-dim'}`}
                    style={{
                      ...styles.cardWrapper,
                      // The "Spoke" Placement Logic
                      transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`
                    }}
                  >
                    <HologramCard 
                      glareEnable={true} 
                      glareColor="#00ff41" 
                    >
                      <div
                        className="cyber-card-frame"
                        style={{
                          ...styles.cardContent,
                          borderColor: isActive ? '#00ff41' : 'rgba(0, 255, 65, 0.35)',
                          boxShadow: isActive
                            ? '0 0 22px rgba(0, 255, 65, 0.3), inset 0 0 22px rgba(0, 255, 65, 0.16)'
                            : 'inset 0 0 12px rgba(0, 255, 65, 0.06)',
                        }}
                      >
                        {/* Filtered Image Layer */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: isActive
                            ? 'grayscale(100%) contrast(1.25) sepia(70%) hue-rotate(70deg) saturate(220%)'
                            : 'grayscale(100%) brightness(0.55) contrast(1.1)',
                          transition: 'filter 0.4s ease',
                          zIndex: 0,
                        }} />

                        {/* Dark Vignette + CRT Scanline Overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: isActive
                            ? 'linear-gradient(180deg, rgba(2, 12, 5, 0.72) 0%, rgba(0, 0, 0, 0.84) 100%)'
                            : 'rgba(0, 5, 2, 0.85)',
                          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.04) 0px, rgba(0, 255, 65, 0.04) 1px, transparent 1px, transparent 3px)',
                          zIndex: 1,
                        }} />

                        {/* HUD Targeting Corner Brackets */}
                        <div style={{ ...styles.cornerBracket, top: 6, left: 6, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
                        <div style={{ ...styles.cornerBracket, bottom: 6, right: 6, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />

                        {/* Top Telemetry Strip */}
                        <div style={styles.cardTopMeta}>
                          <span>NODE // {nodeCode}</span>
                          <span style={{
                            color: isActive ? '#00ff41' : 'rgba(0, 255, 65, 0.5)',
                            fontWeight: 'bold',
                          }}>
                            {isActive ? '[LOCKED]' : '[STBY]'}
                          </span>
                        </div>

                        {/* Center Main Readout */}
                        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                          <h3 style={{
                            ...styles.cardTitle,
                            textShadow: isActive ? '0 0 10px rgba(0, 255, 65, 0.55)' : 'none',
                          }}>
                            {project.title}
                          </h3>
                          <div style={styles.scanline}></div>
                          <div style={styles.cardMetaRow}>
                            <span>TYPE: <strong style={{ color: '#e2f8e8' }}>{project.type}</strong></span>
                          </div>
                          <div style={{
                            ...styles.cardStatusBadge,
                            borderColor: `${statusColor}66`,
                            color: statusColor,
                          }}>
                            <span
                              className="status-led-dot"
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: statusColor,
                                boxShadow: `0 0 6px ${statusColor}`,
                                display: 'inline-block',
                              }}
                            />
                            <span>{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </HologramCard>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TACTICAL HUD CONTROLS */}
          <div className="project-ring-controls" style={styles.controls}>
            <button
              onClick={() => rotateCarousel(-1)}
              className="cyber-nav-btn"
              style={styles.btn}
              aria-label="Previous project"
            >
              ◄ PREV
            </button>

            <div style={styles.hudReadoutCenter}>
              <div style={styles.hudCounterText}>
                SECTOR <span style={{ color: '#fff' }}>0{normalizedActiveIndex + 1}</span> / 0{projects.length}
              </div>
              <div style={styles.hudPipsRow}>
                {projects.map((proj, idx) => {
                  const isCurrent = idx === normalizedActiveIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      aria-label={`Select project ${idx + 1}`}
                      onClick={() => {
                        const diff = idx - normalizedActiveIndex;
                        if (diff !== 0) rotateCarousel(diff);
                      }}
                      style={{
                        ...styles.hudPip,
                        width: isCurrent ? '20px' : '8px',
                        background: isCurrent ? '#00ff41' : 'rgba(0, 255, 65, 0.25)',
                        boxShadow: isCurrent ? '0 0 8px #00ff41' : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => rotateCarousel(1)}
              className="cyber-nav-btn"
              style={styles.btn}
              aria-label="Next project"
            >
              NEXT ►
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. THE SCHEMATIC DETAIL VIEW (Expands on Click)      */}
      {/* ---------------------------------------------------- */}
      {selectedProject && (
        <div 
          style={{
            ...styles.detailContainer,
            opacity: isAnimating ? 0 : 1,
          }}
        >
          {/* Header */}
          <div className="detail-header" style={styles.detailHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={styles.projectIdBadge}>ID // PRJ-00{selectedProject.id}</span>
              <div>
                <span style={{ color: '#00ff41' }}>{`>> TARGET_LOCKED: `}</span>
                <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 8px rgba(0, 255, 65, 0.4)' }}>
                  {selectedProject.title}
                </span>
                <span className="cyber-cursor">_</span>
              </div>
            </div>
            <button onClick={handleBack} className="cyber-abort-btn" style={styles.closeBtn}>
              [ ✕ ABORT ]
            </button>
          </div>

          {/* Body */}
          <div className="detail-body" style={styles.detailBody}>
            {/* Left: Visual */}
            <div className="project-visual" style={styles.projectVisual}>
               <a
                 href={selectedProject.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="image-link-wrapper"
                 style={styles.imgLink}
                 onClick={() => trackEvent('project_link_clicked', { project_name: selectedProject.title })}
               >
                  <img src={selectedProject.image} alt={selectedProject.title} style={styles.detailImg} />
                  <div className="detail-scanline" />
                  <div className="launch-overlay" style={styles.launchOverlay}>
                    {'[ INITIALIZE_LINK ↗ ]'}
                  </div>
                  <div style={styles.crtLines}></div>
                  {/* Corner Targeting Reticles */}
                  <div style={{ ...styles.reticleCorner, top: 8, left: 8, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
                  <div style={{ ...styles.reticleCorner, top: 8, right: 8, borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
                  <div style={{ ...styles.reticleCorner, bottom: 8, left: 8, borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
                  <div style={{ ...styles.reticleCorner, bottom: 8, right: 8, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
               </a>
            </div>
            
            {/* Right: Data */}
            <div className="project-info" style={styles.projectInfo}>
              <div style={styles.sectionLabel}>// SYSTEM_BRIEFING</div>
              <p style={styles.desc}>{selectedProject.desc}</p>
              
              <div style={styles.sectionLabel}>// TECH_ARCHITECTURE</div>
              <div style={styles.techStack}>
                 {selectedProject.stack.map((tech) => (
                   <span key={tech} className="cyber-tech-tag" style={styles.tag}>{tech}</span>
                 ))}
              </div>

              <div style={styles.stats}>
                 <div style={styles.statRow}>
                   <span style={{ opacity: 0.7 }}>CLASSIFICATION:</span>
                   <span style={{ color: '#e6f4ea', fontWeight: 'bold' }}>{selectedProject.type}</span>
                 </div>
                 <div style={styles.statRow}>
                   <span style={{ opacity: 0.7 }}>SYSTEM_STATUS:</span>
                   <span style={{
                     color: getStatusColor(selectedProject.status),
                     fontWeight: 'bold',
                     display: 'inline-flex',
                     alignItems: 'center',
                     gap: '6px',
                     textShadow: `0 0 8px ${getStatusColor(selectedProject.status)}66`,
                   }}>
                     <span style={{
                       width: '7px',
                       height: '7px',
                       borderRadius: '50%',
                       background: getStatusColor(selectedProject.status),
                       boxShadow: `0 0 6px ${getStatusColor(selectedProject.status)}`,
                     }} />
                     {selectedProject.status}
                   </span>
                 </div>
              </div>

              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-launch-btn"
                style={styles.launchBtn}
                onClick={() => trackEvent('project_link_clicked', { project_name: selectedProject.title })}
              >
                <span>LAUNCH_UPLINK</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- GLOBAL STYLES FOR HOVERS & CYBERPUNK HUD --- */}
      <style>{`
        .project-ring-wrapper { touch-action: pan-y; }
        .ring-card { transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease; cursor: pointer; }
        .ring-card-active { filter: brightness(1.08); z-index: 5; }
        .ring-card-dim { opacity: 0.62; }
        .ring-card:hover { transform: scale(1.05); filter: brightness(1.25); opacity: 1; }

        .cyber-card-frame {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
        }

        @keyframes pulseLed {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .status-led-dot {
          animation: pulseLed 2s infinite ease-in-out;
        }

        @keyframes blinkCursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cyber-cursor {
          color: #00ff41;
          font-weight: bold;
          margin-left: 2px;
          animation: blinkCursor 1s infinite;
        }

        @keyframes scanlineSweep {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 0.85; }
          85% { opacity: 0.85; }
          100% { top: 100%; opacity: 0; }
        }
        .detail-scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: #ffffff;
          box-shadow: 0 0 8px #00ff41, 0 0 16px #00ff41;
          z-index: 4;
          pointer-events: none;
          animation: scanlineSweep 3.2s infinite ease-in-out;
        }

        .cyber-nav-btn {
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
          transition: all 0.2s ease;
        }
        .cyber-nav-btn:hover {
          background: rgba(0, 255, 65, 0.2) !important;
          box-shadow: 0 0 15px rgba(0, 255, 65, 0.45);
          transform: translateY(-1px);
          color: #ffffff !important;
        }
        .cyber-nav-btn:active {
          transform: translateY(1px);
        }

        .cyber-abort-btn:hover {
          background: rgba(255, 0, 60, 0.2) !important;
          box-shadow: 0 0 14px rgba(255, 0, 60, 0.6);
          color: #ffffff !important;
        }

        .cyber-tech-tag {
          transition: all 0.2s ease;
        }
        .cyber-tech-tag:hover {
          background: rgba(0, 255, 65, 0.2) !important;
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.35);
          transform: translateY(-1px);
        }

        .cyber-launch-btn {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.25s ease;
        }
        .cyber-launch-btn:hover {
          background: #00ff41 !important;
          color: #000000 !important;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.6);
          transform: translateY(-1px);
        }

        .image-link-wrapper {
          position: relative;
          display: block;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 65, 0.4);
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.12), inset 0 0 15px rgba(0, 255, 65, 0.1);
          height: 100%;
          border-radius: 4px;
        }
        .image-link-wrapper img { transition: transform 0.5s ease, filter 0.5s ease; }
        .image-link-wrapper:hover img { transform: scale(1.05); filter: sepia(10%) hue-rotate(60deg) contrast(1.15); }
        
        .launch-overlay {
          position: absolute; inset: 0; background: rgba(0, 10, 4, 0.82);
          display: flex; align-items: center; justify-content: center;
          color: #00ff41; font-family: monospace; font-weight: bold; font-size: 16px;
          letter-spacing: 2px;
          opacity: 0; transition: opacity 0.3s;
          border: 1px solid #00ff41;
          text-shadow: 0 0 10px #00ff41;
          z-index: 5;
        }
        .image-link-wrapper:hover .launch-overlay { opacity: 1; }

        .detail-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 255, 65, 0.5) rgba(0, 0, 0, 0.3);
        }
        .detail-body::-webkit-scrollbar {
          width: 5px;
        }
        .detail-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .detail-body::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 65, 0.45);
          border-radius: 3px;
        }
        .detail-body::-webkit-scrollbar-thumb:hover {
          background: #00ff41;
        }

        @media (max-width: 768px) {
          .project-ring-carousel-container {
            top: 0 !important;
            transform: scale(0.72);
            transform-origin: center;
          }
          .project-ring-controls {
            margin-top: 6px !important;
            gap: 8px !important;
          }
          .project-ring-controls .cyber-nav-btn {
            padding: 6px 12px !important;
            font-size: 11px !important;
          }
          .detail-header {
            height: auto !important;
            min-height: 50px !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
          .detail-body {
            flex-direction: column !important;
            padding: 12px !important;
            gap: 12px !important;
          }
          .project-visual {
            height: 200px !important;
            min-height: unset !important;
            flex: none !important;
          }
          .project-info {
            flex: none !important;
          }
          .big-title {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

// --- STYLES ---
const styles = {
  // SCENE SETUP
  scene: {
    width: '100%',
    height: '100%',
    perspective: '1500px', // Matches your original depth
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 0,
    minWidth: 0,
    background: 'radial-gradient(circle at center, rgba(0, 35, 12, 0.25) 0%, transparent 75%)',
  },
  
  // RING WRAPPER (For fading)
  ringWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.4s ease',
    position: 'relative',
  },

  hudHeader: {
    position: 'absolute',
    top: '8px',
    left: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'monospace',
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#00ff41',
    opacity: 0.85,
    zIndex: 10,
    pointerEvents: 'none',
  },
  hudHeaderDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00ff41',
    boxShadow: '0 0 8px #00ff41',
  },

  // CAROUSEL LOGIC (Preserved)
  carouselContainer: {
    width: '250px', 
    height: '200px', 
    position: 'relative',
    // Shifts the whole ring up slightly to make room for controls
    top: '-16px', 
  },
  carousel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transformStyle: 'preserve-3d',
    transition: 'transform 1s cubic-bezier(0.1, 0.6, 0.2, 1)', // Tech easing
  },
  holoFloorRing: {
    position: 'absolute',
    width: '440px',
    height: '440px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotateX(90deg) translateZ(-105px)',
    borderRadius: '50%',
    border: '1px dashed rgba(0, 255, 65, 0.28)',
    boxShadow: '0 0 30px rgba(0, 255, 65, 0.08), inset 0 0 30px rgba(0, 255, 65, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  holoFloorInner: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '1px solid rgba(0, 255, 65, 0.14)',
    background: 'radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, transparent 70%)',
  },
  cardWrapper: {
    position: 'absolute',
    width: '250px',
    height: '180px',
    left: '0px',
    top: '10px',
    backfaceVisibility: 'hidden', 
  },

  // CARD CONTENT (Small View)
  cardContent: {
    background: 'rgba(4, 16, 8, 0.92)',
    border: '1px solid #00ff41',
    height: '100%',
    padding: '12px 14px',
    color: '#00ff41',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cornerBracket: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    zIndex: 3,
    pointerEvents: 'none',
  },
  cardTopMeta: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '9px',
    letterSpacing: '1.2px',
    color: 'rgba(0, 255, 65, 0.75)',
    borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    paddingBottom: '4px',
  },
  cardTitle: {
    margin: '4px 0 6px 0',
    fontSize: '16px',
    color: '#ffffff',
    letterSpacing: '1px',
    lineHeight: 1.2,
  },
  scanline: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
    width: '100%',
    margin: '6px 0',
    opacity: 0.75,
    boxShadow: '0 0 6px #00ff41',
  },
  cardMetaRow: {
    fontSize: '10px',
    letterSpacing: '1px',
    color: 'rgba(0, 255, 65, 0.8)',
    marginBottom: '6px',
  },
  cardStatusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '9px',
    fontWeight: 'bold',
    letterSpacing: '1.2px',
    padding: '3px 8px',
    borderRadius: '2px',
    background: 'rgba(0, 0, 0, 0.65)',
    border: '1px solid rgba(0, 255, 65, 0.4)',
  },
  
  // CONTROLS
  controls: {
    marginTop: '34px',
    zIndex: 10,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(5, 14, 8, 0.75)',
    border: '1px solid rgba(0, 255, 65, 0.25)',
    padding: '6px 12px',
    borderRadius: '4px',
    backdropFilter: 'blur(6px)',
  },
  btn: {
    background: 'rgba(0, 255, 65, 0.08)',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '7px 14px',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '1.5px',
    borderRadius: 0,
  },
  hudReadoutCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    minWidth: '110px',
  },
  hudCounterText: {
    fontSize: '10px',
    color: '#00ff41',
    letterSpacing: '1.5px',
    fontWeight: 'bold',
  },
  hudPipsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  hudPip: {
    height: '4px',
    border: 'none',
    padding: 0,
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },

  // --- SCHEMATIC DETAIL VIEW ---
  detailContainer: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(6, 10, 14, 0.97)',
    backgroundImage: `
      linear-gradient(rgba(0, 255, 65, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.04) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    border: '1px solid rgba(0, 255, 65, 0.45)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity 0.4s ease',
  },
  detailHeader: {
    height: '50px',
    flexShrink: 0,
    borderBottom: '1px solid rgba(0, 255, 65, 0.5)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 18px',
    background: 'linear-gradient(90deg, rgba(0, 255, 65, 0.14) 0%, rgba(0, 255, 65, 0.03) 100%)',
    fontFamily: 'monospace',
    color: '#fff',
    letterSpacing: '1px',
    fontSize: '13px',
  },
  projectIdBadge: {
    fontSize: '10px',
    color: '#000',
    background: '#00ff41',
    padding: '2px 6px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  closeBtn: {
    background: 'rgba(255, 0, 60, 0.08)',
    border: '1px solid #ff003c',
    color: '#ff003c',
    padding: '5px 14px',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '1px',
    transition: 'all 0.2s',
    borderRadius: '2px',
  },
  detailBody: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    display: 'flex',
    padding: '22px',
    gap: '24px',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    touchAction: 'pan-y',
    overscrollBehavior: 'contain',
    boxSizing: 'border-box',
  },
  projectVisual: {
    flex: '1.15',
    position: 'relative',
    minHeight: '200px',
    minWidth: 0,
  },
  reticleCorner: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    zIndex: 6,
    pointerEvents: 'none',
  },
  imgLink: { width: '100%', height: '100%' },
  detailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'sepia(20%) hue-rotate(55deg) contrast(1.12)',
  },
  crtLines: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'linear-gradient(rgba(0, 255, 65, 0.05) 50%, transparent 50%)',
    backgroundSize: '100% 4px',
    zIndex: 3,
  },
  projectInfo: {
    flex: 1,
    minWidth: 0,
    fontFamily: 'monospace',
    color: '#d0e2d6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionLabel: {
    fontSize: '10px',
    color: '#00ff41',
    letterSpacing: '2px',
    marginBottom: '6px',
    opacity: 0.85,
  },
  bigTitle: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '12px',
    textShadow: '0 0 10px rgba(0,255,65,0.3)',
    wordBreak: 'break-word',
  },
  desc: {
    lineHeight: '1.6',
    fontSize: '13px',
    marginTop: 0,
    marginBottom: '18px',
    color: '#c2d6c8',
    padding: '10px 12px',
    background: 'rgba(0, 255, 65, 0.04)',
    borderLeft: '2px solid #00ff41',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '18px',
  },
  tag: { 
    border: '1px solid rgba(0, 255, 65, 0.45)',
    color: '#00ff41', 
    padding: '4px 10px',
    fontSize: '11px',
    borderRadius: '3px',
    background: 'rgba(0, 255, 65, 0.08)',
    boxShadow: '0 0 8px rgba(0, 255, 65, 0.12)',
    letterSpacing: '1px',
  },
  stats: {
    border: '1px solid rgba(0, 255, 65, 0.25)',
    background: 'rgba(0, 20, 8, 0.45)',
    padding: '10px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '14px',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
  },
  launchBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(0, 255, 65, 0.14)',
    border: '1px solid #00ff41',
    color: '#00ff41',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '2px',
    textDecoration: 'none',
    boxShadow: '0 0 12px rgba(0, 255, 65, 0.2)',
  },
};

export default ProjectRing;