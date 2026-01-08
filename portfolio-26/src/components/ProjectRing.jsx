import React, { useState } from 'react';
import HologramCard from './HologramCard';

// --- PLACEHOLDER DATA (Replace with your real imports) ---
import project1Img from '../assets/project1.png'; 
import project2Img from '../assets/project2.png'; 
import project3Img from '../assets/project3.png'; 
import project4Img from '../assets/project4.png';

const projects = [
  { id: 1, title: 'PROJECT ALPHA', type: 'WEB APP', status: 'DEPLOYED', image: project1Img, link: '#', desc: 'Full-stack application with autonomous routing.' },
  { id: 2, title: 'NEON CORE', type: 'GAME DEV', status: 'DEMO', image: project2Img, link: '#', desc: 'Cyberpunk physics engine built in WebGL.' },
  { id: 3, title: 'DATA NEXUS', type: 'BACKEND', status: 'OFFLINE', image: project3Img, link: '#', desc: 'High-frequency trading algorithm dashboard.' },
  { id: 4, title: 'VOID SHELL', type: 'UI LIB', status: 'WIP', image: project4Img, link: '#', desc: 'Component library for sci-fi interfaces.' },
  { id: 5, title: 'CYBER DECK', type: 'HARDWARE', status: 'CONCEPT', image: project1Img, link: '#', desc: 'Physical macro-pad for developers.' },
];

const ProjectRing = () => {
  // --- STATE ---
  const [activeIndex, setActiveIndex] = useState(0);       // Controls Ring Rotation
  const [selectedProject, setSelectedProject] = useState(null); // Controls Detail View
  const [isAnimating, setIsAnimating] = useState(false);   // Controls Transitions

  // --- 3D MATH CONFIG (Your Original Settings) ---
  const radius = 220; // Slightly increased for breathing room
  const anglePerItem = 360 / projects.length;

  // --- HANDLERS ---
  const rotateCarousel = (direction) => {
    if (selectedProject) return; // Lock rotation if viewing details
    setActiveIndex(activeIndex + direction);
  };

  const handleCardClick = (project) => {
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
          style={{
            ...styles.ringWrapper, // Wrapper to handle opacity transition
            opacity: isAnimating ? 0 : 1,
            pointerEvents: isAnimating ? 'none' : 'auto',
          }}
        >
          <div style={styles.carouselContainer}>
            <div 
              style={{
                ...styles.carousel,
                // The "Gyratory" Rotation Logic
                transform: `translateZ(-${radius}px) rotateY(${activeIndex * -anglePerItem}deg)`
              }}
            >
              {projects.map((project, index) => {
                const rotateY = index * anglePerItem;
                
                return (
                  <div 
                    key={project.id}
                    onClick={() => handleCardClick(project)} // CLICK TRIGGER
                    className="ring-card" // Class for hover effect
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
                      <div style={{
                        ...styles.cardContent,
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%)',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.7)',
                          zIndex: 0,
                        }}></div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          <h3 style={styles.cardTitle}>{project.title}</h3>
                          <div style={styles.scanline}></div>
                          <p style={{ fontSize: '10px' }}>TYPE: {project.type}</p>
                          <p style={{ 
                            fontSize: '10px', 
                            color: project.status === 'DEPLOYED' ? '#00ff41' : 'yellow' 
                          }}>
                            STATUS: {project.status}
                          </p>
                        </div>
                      </div>
                    </HologramCard>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTROLS */}
          <div style={styles.controls}>
            <button onClick={() => rotateCarousel(-1)} style={styles.btn}>{'<'}</button>
            <span style={{ margin: '0 15px', color: '#00ff41', letterSpacing: '2px' }}>
              NAVIGATE
            </span>
            <button onClick={() => rotateCarousel(1)} style={styles.btn}>{'>'}</button>
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
          <div style={styles.detailHeader}>
            <div>
              <span style={{color: '#00ff41'}}>{`>> TARGET_LOCKED: `}</span>
              {selectedProject.title}
            </div>
            <button onClick={handleBack} style={styles.closeBtn}>[ ABORT ]</button>
          </div>

          {/* Body */}
          <div style={styles.detailBody}>
            {/* Left: Visual */}
            <div style={styles.projectVisual}>
               <a href={selectedProject.link} className="image-link-wrapper" style={styles.imgLink}>
                  <img src={selectedProject.image} alt={selectedProject.title} style={styles.detailImg} />
                  <div className="launch-overlay" style={styles.launchOverlay}>
                    INITIALIZE_LINK >>
                  </div>
                  <div style={styles.crtLines}></div>
               </a>
            </div>
            
            {/* Right: Data */}
            <div style={styles.projectInfo}>
              <h1 style={styles.bigTitle}>{selectedProject.title}</h1>
              <p style={styles.desc}>{selectedProject.desc}</p>
              
              <div style={styles.techStack}>
                 <span style={styles.tag}>REACT</span>
                 <span style={styles.tag}>NODE</span>
                 <span style={styles.tag}>WEBGL</span>
              </div>

              <div style={styles.stats}>
                 <div>TYPE: <span style={{color:'#fff'}}>{selectedProject.type}</span></div>
                 <div>STATUS: <span style={{color: selectedProject.status === 'DEPLOYED' ? '#00ff41' : 'yellow'}}>
                    {selectedProject.status}
                 </span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- GLOBAL STYLES FOR HOVERS --- */}
      <style>{`
        .ring-card { transition: transform 0.3s, filter 0.3s; cursor: pointer; }
        .ring-card:hover { transform: scale(1.05); filter: brightness(1.2); }
        
        .image-link-wrapper { position: relative; display: block; overflow: hidden; border: 1px solid #333; height: 100%; }
        .image-link-wrapper img { transition: transform 0.5s; }
        .image-link-wrapper:hover img { transform: scale(1.05); }
        
        .launch-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.8);
          display: flex; align-items: center; justify-content: center;
          color: #00ff41; font-family: monospace; font-weight: bold; font-size: 20px;
          opacity: 0; transition: opacity 0.3s;
          border: 1px solid #00ff41;
        }
        .image-link-wrapper:hover .launch-overlay { opacity: 1; }
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
    background: 'transparent', // Assuming Module B has the background
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
  },

  // CAROUSEL LOGIC (Preserved)
  carouselContainer: {
    width: '250px', 
    height: '200px', 
    position: 'relative',
    // Shifts the whole ring up slightly to make room for controls
    top: '-20px', 
  },
  carousel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transformStyle: 'preserve-3d',
    transition: 'transform 1s cubic-bezier(0.1, 0.6, 0.2, 1)', // Tech easing
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
    background: 'rgba(0, 15, 0, 0.95)',
    border: '1px solid #00ff41',
    height: '100%',
    padding: '15px',
    color: '#00ff41',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: 'inset 0 0 20px rgba(0,255,65,0.1)',
  },
  cardTitle: { margin: '0 0 5px 0', fontSize: '18px', color: '#fff' },
  scanline: {
    height: '2px',
    background: '#00ff41',
    width: '100%',
    margin: '10px 0',
    opacity: 0.5,
    boxShadow: '0 0 5px #00ff41',
  },
  
  // CONTROLS
  controls: {
    marginTop: '40px',
    zIndex: 10,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    background: 'transparent',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '8px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px'
  },

  // --- SCHEMATIC DETAIL VIEW ---
  detailContainer: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(5, 5, 5, 0.98)', // Opaque background covers ring
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity 0.4s ease',
  },
  detailHeader: {
    height: '50px',
    borderBottom: '1px solid #00ff41',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    background: 'rgba(0, 255, 65, 0.1)',
    fontFamily: 'monospace',
    color: '#fff',
    letterSpacing: '1px',
  },
  closeBtn: {
    background: 'transparent',
    border: '1px solid #ff003c',
    color: '#ff003c',
    padding: '5px 15px',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '12px',
    transition: 'all 0.2s',
  },
  detailBody: {
    flex: 1,
    display: 'flex',
    padding: '30px',
    gap: '30px',
    overflowY: 'auto',
  },
  projectVisual: {
    flex: '1.2', // Image takes slightly more space
    border: '1px solid #333',
    position: 'relative',
    minHeight: '200px',
  },
  imgLink: { width: '100%', height: '100%' },
  detailImg: { width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(20%) hue-rotate(50deg) contrast(1.1)' },
  crtLines: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: 'linear-gradient(rgba(0,255,0,0.03) 50%, transparent 50%)',
    backgroundSize: '100% 4px',
  },
  projectInfo: {
    flex: 1,
    fontFamily: 'monospace',
    color: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bigTitle: {
    fontSize: '28px', color: '#fff', marginBottom: '15px',
    textShadow: '0 0 10px rgba(0,255,65,0.3)',
  },
  desc: { lineHeight: '1.6', fontSize: '14px', marginBottom: '25px', color: '#aaa' },
  techStack: { display: 'flex', gap: '10px', marginBottom: '30px' },
  tag: { 
    border: '1px solid #333', color: '#00ff41', 
    padding: '4px 10px', fontSize: '11px', borderRadius: '4px',
    background: 'rgba(0,255,65,0.05)'
  },
  stats: {
    borderTop: '1px solid #333',
    paddingTop: '20px',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }
};

export default ProjectRing;