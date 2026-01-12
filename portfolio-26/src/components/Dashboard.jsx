import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import HologramCard from './HologramCard'; // We reuse your tilt effect!
import ProjectRing from './ProjectRing';
import BioScan from './BioScan';
import SkillCube from './SkillCube';
import SkillsFlipCard from './SkillsFlipCard';
// import SecureUplink from './SecureUplink';
import CommsArray from './CommsArray';
import ContactModule from './ContactModule';

const Dashboard = () => {
  const gridRef = useRef(null);
  const dockRef = useRef(null);
  const profileRef = useRef(null);
  const profileFlipRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const skillsFlipRef = useRef(null);
  const commsRef = useRef(null);
  const commsFlipRef = useRef(null);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [showDockToggle, setShowDockToggle] = useState(false);

  const handleDockItemClick = (item) => {
    let targetRef = null;
    let shouldFlip = false;

    switch (item) {
      case 'PROFILE':
        targetRef = profileRef;
        shouldFlip = true;
        break;
      case 'PROJECTS':
        targetRef = projectsRef;
        break;
      case 'SKILLS':
        targetRef = skillsRef;
        shouldFlip = true;
        break;
      case 'COMMS':
        targetRef = commsRef;
        shouldFlip = true;
        break;
      default:
        return;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      if (shouldFlip) {
        setTimeout(() => {
          if (item === 'PROFILE' && profileFlipRef.current?.flip) {
            profileFlipRef.current.flip();
          } else if (item === 'SKILLS' && skillsFlipRef.current?.flip) {
            skillsFlipRef.current.flip();
          } else if (item === 'COMMS' && commsFlipRef.current?.flip) {
            commsFlipRef.current.flip();
          }
        }, 800); // Wait for scroll to finish
      }
    }

    // Close dock on mobile after selection
    setIsDockOpen(false);
  };

  useEffect(() => {
    // Scroll detection for dock toggle button
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;
      
      setShowDockToggle(scrollPercentage > 40);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // THE EXPLOSION ANIMATION
    // We select all the 'grid-item' divs
    const items = gridRef.current.querySelectorAll('.grid-item');

    animate(items, {
      // 1. Start from the center (approximate position of the old terminal)
      // We use percentages to make them fly from the center relative to their final spot
      translateX: [
        // "from" value varies based on grid position to mimic explosion center
        // We handle this with a function index
        (el, i) => {
          // Simple math to make left items fly from right, right items fly from left
          const isLeft = i === 0 || i === 2;
          return isLeft ? '50%' : '-50%';
        },
        0 // "to" value (final grid position)
      ],
      translateY: [
        (el, i) => {
          const isTop = i === 0 || i === 1;
          return isTop ? '50%' : '-50%';
        },
        0
      ],
      scale: [0.1, 1], // Grow from tiny boxes
      opacity: [0, 1],

      // Animation Physics
      duration: 1200,
      delay: stagger(100), // Slight delay between each box flying out
      ease: 'outExpo'
    });

    // THE DOCK ANIMATION - Fade in after grid animation
    const dockItems = dockRef.current.querySelectorAll('.dock-item');
    animate(dockItems, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: stagger(80, { start: 1200 }), // Start after grid explosion
      ease: 'outExpo'
    });
  }, []);

  return (
    <>
    <div style={styles.container}>
      <div ref={gridRef} style={styles.grid}>

        {/* MODULE A: PROFILE (Top Left) */}
        <div ref={profileRef} className="grid-item" style={{ ...styles.card, gridColumn: '1', gridRow: '1' }}>
          <BioScan ref={profileFlipRef} />
        </div>

        {/* MODULE B: PROJECTS (Top Right - Wide) */}
        <div ref={projectsRef} className="grid-item" style={{ ...styles.card, gridColumn: '2', gridRow: '1' }}>
          {/* No HologramCard wrapper here, the ring handles its own 3D logic */}
          <div style={styles.innerCard}> {/* You might want to remove padding here to give the ring space */}
            <h3 style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>MISSION LOG</h3>
            <ProjectRing />
          </div>
        </div>

      {/* MODULE C: SKILLS (Bottom Left) */}
<div ref={skillsRef} className="grid-item" style={{ ...styles.card, gridColumn: '1', gridRow: '2', cursor: 'pointer' }}>
  <SkillsFlipCard ref={skillsFlipRef} />
</div>

 {/* MODULE D: CONTACT */}
<div ref={commsRef} className="grid-item" style={{ ...styles.card, gridColumn: '2', gridRow: '2' }}>
  {/* No HologramCard wrapper - ContactModule handles its own card with flip logic */}
    <ContactModule ref={commsFlipRef} />
    <br />
    <br />
    
</div>

      </div>

      {/* MOBILE DOCK TOGGLE BUTTON */}
      <button
        onClick={() => setIsDockOpen(!isDockOpen)}
        style={{
          ...styles.dockToggle,
          left: isDockOpen ? '20px' : '50%',
          transform: isDockOpen ? 'translateX(0)' : 'translateX(-50%)',
          opacity: showDockToggle ? 1 : 0,
          pointerEvents: showDockToggle ? 'auto' : 'none',
        }}
        className="dashboard-dock-toggle"
        aria-label="Toggle navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d={isDockOpen ? "M8 12h8" : "M12 8v8M8 12h8"} />
        </svg>
      </button>

      {/* THE DOCK */}
      <div
        ref={dockRef}
        style={styles.dock}
        className={`dashboard-dock ${isDockOpen ? 'open' : ''}`}
      >
        {['PROFILE', 'PROJECTS', 'SKILLS', 'COMMS'].map((item) => (
          <div 
            key={item} 
            className="dock-item" 
            style={styles.dockItem}
            onClick={() => handleDockItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>  
    </>
  );
};

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 10px',
    paddingBottom: '140px', // Extra room for the dock and toggle
    overflowY: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr', // 2 Columns: narrow left, wide right
    gridTemplateRows: '1fr 1fr',    // 2 Rows
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    height: '80vh',
  },
  card: {
    // The grid-item class is used for selection, styles are here
    height: '100%',
    width: '100%',
    opacity: 0, // Start hidden so they don't flash before animation
    position: 'relative',
    zIndex: 1,
  },
  innerCard: {
    border: '1px solid #00ff41',
    backgroundColor: 'rgba(13, 17, 23, 0.8)',
    height: '100%',
    color: '#00ff41',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)',
  },
  placeholderImg: {
    width: '60px',
    height: '60px',
    border: '1px dashed #00ff41',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    background: '#00ff41',
    color: 'black',
    border: 'none',
    padding: '10px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  dock: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.1)', // Glass effect
    padding: '10px 20px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 1000, // Very high to stay on top
    // Responsive adjustments
    flexWrap: 'nowrap',
    justifyContent: 'center',
    maxWidth: '90vw',
    transition: 'transform 0.3s ease',
  },
  dockToggle: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 255, 65, 0.2)',
    border: '2px solid #00ff41',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'none', // Hidden by default (desktop)
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    backdropFilter: 'blur(10px)',
    padding: 0,
    transition: 'all 0.3s ease',
  },
  dockItem: {
    color: '#00ff41',
    fontFamily: 'monospace',
    cursor: 'pointer',
    padding: '8px 12px',
    opacity: 0, // Start hidden for animation
    transition: 'all 0.3s ease',
    borderRadius: '10px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
  }
};

// Add media query styles via CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
   /* Container padding on mobile */
    [style*="padding: 20px"] {
      padding: 80px 10px 220px 10px !important;
    }
    /* Hide dock by default on mobile, show toggle button */
    .dashboard-dock-toggle {
      display: flex !important;
    }
    /* Dock slides up from bottom on mobile */
    .dashboard-dock {
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      transform: translateX(0) translateY(100%) !important;
      border-radius: 20px 20px 0 0 !important;
      max-width: 100vw !important;
      width: 100% !important;
      padding: 20px 15px !important;
      z-index: 1000 !important;
    }
    .dashboard-dock.open {
      transform: translateX(0) translateY(0) !important;
    }
  }

  /* Mobile Grid Layout - Stack cards vertically */
  @media (max-width: 768px) {
    [style*="gridTemplateColumns"] {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
      height: auto !important;
      gap: 20px !important;
      padding: 0 !important;
      padding-bottom: 40px !important;
      justify-items: center !important;
      align-items: stretch !important;
      margin-bottom: 20px !important;
    }
    .grid-item {
      grid-column: 1 !important;
      grid-row: auto !important;
      width: 95vw !important;
      max-width: 600px !important;
      min-height: 400px !important;
      height: auto !important;
    }
  }

  /* Extra separation between Module D and dock on smaller mobile screens */
  @media (max-width: 765px) {
    [style*="gridTemplateColumns"] {
      padding-bottom: 100px !important;
      margin-bottom: 60px !important;
    }
  }
`;
if (!document.head.querySelector('[data-dashboard-styles]')) {
  styleSheet.setAttribute('data-dashboard-styles', 'true');
  document.head.appendChild(styleSheet);
}

export default Dashboard;