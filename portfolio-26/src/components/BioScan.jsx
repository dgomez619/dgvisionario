import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { animate } from 'animejs';
import bioscan1 from '../assets/bioscan1.png';
import { X, ChevronLeft, Download } from 'lucide-react';

const BioScanFlipCard = forwardRef((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useImperativeHandle(ref, () => ({
    flip: () => setIsFlipped(true),
  }));

  const sections = [
    { id: 'education', label: 'EDUCATION', icon: '🎓' },
    { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
    { id: 'technologies', label: 'TECHNOLOGIES', icon: '⚡' },
    { id: 'resume', label: 'RESUME', icon: '📄' },
  ];

  const handleSectionClick = (sectionId) => {
    setExpandedSection(sectionId);
  };

  const handleClose = () => {
    if (expandedSection) {
      setExpandedSection(null);
    } else {
      setIsFlipped(false);
    }
  };

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'education':
        return (
          <div style={contentStyles.container}>
            <h3 style={contentStyles.title}>EDUCATION</h3>
            <div style={contentStyles.content}>
              <div style={contentStyles.item}>
                <div style={contentStyles.itemHeader}>
                  <h4 style={contentStyles.degree}>Computer Science</h4>
                  <span style={contentStyles.year}>2018 - 2022</span>
                </div>
                <p style={contentStyles.institution}>University of Technology</p>
                <p style={contentStyles.description}>
                  Focus on web development, algorithms, and software engineering principles.
                </p>
              </div>
              
              <div style={contentStyles.item}>
                <div style={contentStyles.itemHeader}>
                  <h4 style={contentStyles.degree}>Full Stack Development Bootcamp</h4>
                  <span style={contentStyles.year}>2022</span>
                </div>
                <p style={contentStyles.institution}>Coding Academy</p>
                <p style={contentStyles.description}>
                  Intensive program covering MERN stack, modern frameworks, and deployment strategies.
                </p>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div style={contentStyles.container}>
            <h3 style={contentStyles.title}>EXPERIENCE</h3>
            <div style={contentStyles.content}>
              <div style={contentStyles.item}>
                <div style={contentStyles.itemHeader}>
                  <h4 style={contentStyles.degree}>Full Stack Developer</h4>
                  <span style={contentStyles.year}>2023 - Present</span>
                </div>
                <p style={contentStyles.institution}>Tech Innovations Inc.</p>
                <p style={contentStyles.description}>
                  Building scalable web applications using React, Node.js, and cloud services. 
                  Led development of multiple client-facing projects with focus on performance and UX.
                </p>
              </div>
              
              <div style={contentStyles.item}>
                <div style={contentStyles.itemHeader}>
                  <h4 style={contentStyles.degree}>Frontend Developer</h4>
                  <span style={contentStyles.year}>2022 - 2023</span>
                </div>
                <p style={contentStyles.institution}>Digital Solutions Co.</p>
                <p style={contentStyles.description}>
                  Developed responsive user interfaces and interactive components. 
                  Collaborated with design team to implement pixel-perfect designs.
                </p>
              </div>
            </div>
          </div>
        );

      case 'technologies':
        return (
          <div style={contentStyles.container}>
            <h3 style={contentStyles.title}>TECHNOLOGIES</h3>
            <div style={contentStyles.content}>
              <div style={contentStyles.techSection}>
                <h4 style={contentStyles.techCategory}>Frontend</h4>
                <div style={contentStyles.techGrid}>
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Anime.js'].map(tech => (
                    <span key={tech} style={contentStyles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div style={contentStyles.techSection}>
                <h4 style={contentStyles.techCategory}>Backend</h4>
                <div style={contentStyles.techGrid}>
                  {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'].map(tech => (
                    <span key={tech} style={contentStyles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div style={contentStyles.techSection}>
                <h4 style={contentStyles.techCategory}>Tools & Others</h4>
                <div style={contentStyles.techGrid}>
                  {['Git', 'Docker', 'Vite', 'Webpack', 'Vercel', 'AWS'].map(tech => (
                    <span key={tech} style={contentStyles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div style={contentStyles.container}>
            <h3 style={contentStyles.title}>RESUME</h3>
            <div style={{ ...contentStyles.content, alignItems: 'center', justifyContent: 'center' }}>
              <div style={contentStyles.resumePreview}>
                <div style={contentStyles.resumePlaceholder}>
                  <span style={{ fontSize: '48px', opacity: 0.5 }}>📄</span>
                  <p style={{ margin: '10px 0', fontSize: '14px', opacity: 0.7 }}>Resume Preview</p>
                </div>
              </div>
              <button style={contentStyles.downloadBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
                }}
              >
                <Download size={20} />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={flipStyles.container}>
      <div style={{
        ...flipStyles.flipper,
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT SIDE - Original BioScan */}
        <div style={flipStyles.front}>
          <div style={{ ...flipStyles.innerCard, cursor: 'pointer' }} onClick={() => setIsFlipped(true)}>
            <BioScan />
          </div>
        </div>

        {/* BACK SIDE - 4 Row Layout */}
        <div style={flipStyles.back}>
          <div style={flipStyles.innerCard}>
            {!expandedSection ? (
              <>
                <button 
                  onClick={handleClose} 
                  style={flipStyles.closeBtn}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <X size={24} />
                </button>
                <div style={flipStyles.rowsContainer}>
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      style={{
                        ...flipStyles.row,
                        borderBottom: index < sections.length - 1 ? '1px solid rgba(0, 255, 65, 0.2)' : 'none',
                      }}
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span style={flipStyles.icon}>{section.icon}</span>
                      <span style={flipStyles.label}>{section.label}</span>
                      <span style={flipStyles.arrow}>→</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={flipStyles.expandedContent}>
                <button 
                  onClick={handleClose} 
                  style={flipStyles.backBtn}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <ChevronLeft size={24} />
                </button>
                {renderSectionContent(expandedSection)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// Original BioScan component (now used as front side content)
const BioScan = () => {
  const lineRef = useRef(null);
  
  useEffect(() => {
    // Laser scanning animation
    animate(lineRef.current, {
      top: ['0%', '100%'],
      opacity: [0, 1, 0],   
      duration: 2000,
      ease: 'inOutSine',    
      loop: true,
      direction: 'alternate'
    });
  }, []);

  return (
    <div style={styles.container} className="bioscan-container-mobile">
      {/* 1. The Image Frame - Now Larger & Centered */}
      <div style={styles.frame}>
        <img 
          src={bioscan1} 
          alt="User Scan" 
          style={styles.image} 
        />
        
        {/* The Green Filter Overlay */}
        <div style={styles.greenOverlay}></div>
        
        {/* The Grid Texture */}
        <div style={styles.gridOverlay}></div>
        
        {/* The Moving Laser Line */}
        <div ref={lineRef} style={styles.scanLine}></div>
        
        {/* Corner Accents for "Tech" feel */}
        <div style={styles.cornerTL}></div>
        <div style={styles.cornerBR}></div>
      </div>

      {/* 2. The Data Readout */}
      <div style={styles.readout}>
        <div style={styles.row}>
          <span style={styles.label}>NAME:</span>
          <span style={styles.value}>DAN G</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>ROLE:</span>
          <span style={styles.value}>FULLSTACK DEV</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>FOCUS:</span>
          <span style={styles.value}><abbr title="Progressive Web Applications">PWA's</abbr></span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>STATUS:</span>
          <span style={styles.active}>AVAILABLE</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the whole component in its parent
    gap: '25px',              // Increased gap for breathing room
    height: '100%',
    width: '100%',
    padding: '5px',
  },
  frame: {
    position: 'relative',
    width: '180px',  // Increased from 120px
    height: '180px', // Square aspect ratio
    border: '2px solid #00ff41',
    borderRadius: '8px', // Slight curve for modern tech look
    overflow: 'hidden',
    backgroundColor: '#001100', // Very dark green background
    boxShadow: '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 10px rgba(0,255,65,0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top center', // Ensures face is not cut off
    // Updated Filter for "Matrix" look: darker blacks, higher contrast
    filter: 'grayscale(100%) brightness(0.9) contrast(1.2) sepia(100%) hue-rotate(70deg) saturate(300%)',
    mixBlendMode: 'luminosity',
  },
  greenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(0,255,65,0) 40%, rgba(0,255,65,0.4) 100%)', // Vignette effect
    mixBlendMode: 'overlay',
    pointerEvents: 'none',
    zIndex: 2,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Finer grid for "high resolution" scan look
    backgroundImage: `
      linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)
    `,
    backgroundSize: '15px 15px',
    zIndex: 3,
    pointerEvents: 'none',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '2px',
    background: '#ffffff', // White core for hot laser look
    boxShadow: '0 0 8px #00ff41, 0 0 15px #00ff41', // Green glow
    zIndex: 10,
  },
  // Decorative Corners
  cornerTL: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    width: '10px',
    height: '10px',
    borderTop: '2px solid #fff',
    borderLeft: '2px solid #fff',
    zIndex: 5,
  },
  cornerBR: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    width: '10px',
    height: '10px',
    borderBottom: '2px solid #fff',
    borderRight: '2px solid #fff',
    zIndex: 5,
  },
  readout: {
   display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: '"Courier New", Courier, monospace', // Monospace is key for "Alien Tech"
    fontSize: '14px',
    color: '#00ff41',
    textShadow: '0 0 2px rgba(0, 255, 65, 0.5)', // Subtle text glow
    padding: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    paddingBottom: '4px',
  },
  label: {
    opacity: 0.8,
    fontSize: 'clamp(10px, 1.5vw, 12px)',
    letterSpacing: '1px',
    whiteSpace: 'nowrap',
  },
  value: {
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#ccffdc', // Slightly lighter green for readability
  },
  active: {
    color: '#fff',
    fontWeight: 'bold',
    textShadow: '0 0 8px #00ff41',
    animation: 'blink 1s infinite', // Note: You'd need a keyframe for this or use anime.js
  }
};

// Flip card styles
const flipStyles = {
  container: {
    width: '100%',
    height: '100%',
    perspective: '1000px',
  },
  flipper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  front: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  },
  innerCard: {
    width: '100%',
    height: '100%',
    background: 'rgba(13, 17, 23, 0.95)',
    border: '1px solid #00ff41',
    position: 'relative',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 'clamp(8px, 2%, 10px)',
    right: 'clamp(8px, 2%, 10px)',
    background: 'none',
    border: 'none',
    color: '#00ff41',
    cursor: 'pointer',
    zIndex: 100,
    padding: 'clamp(3px, 1%, 5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
  },
  backBtn: {
    position: 'absolute',
    top: 'clamp(8px, 2%, 10px)',
    left: 'clamp(8px, 2%, 10px)',
    background: 'none',
    border: 'none',
    color: '#00ff41',
    cursor: 'pointer',
    zIndex: 100,
    padding: 'clamp(3px, 1%, 5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
  },
  rowsContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(10px, 3%, 20px) clamp(15px, 4%, 30px)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'monospace',
    color: '#00ff41',
    boxSizing: 'border-box',
  },
  icon: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    marginRight: 'clamp(8px, 2%, 15px)',
    flexShrink: 0,
  },
  label: {
    flex: 1,
    fontSize: 'clamp(14px, 2.5vw, 18px)',
    fontWeight: 'bold',
    letterSpacing: 'clamp(1px, 0.3vw, 2px)',
    minWidth: 0,
  },
  arrow: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    opacity: 0.6,
    transition: 'transform 0.3s',
    flexShrink: 0,
  },
  expandedContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    animation: 'fadeIn 0.3s ease',
  },
};

// Content styles for expanded sections
const contentStyles = {
  container: {
    width: '100%',
    height: '100%',
    padding: 'clamp(40px, 8%, 50px) clamp(15px, 4%, 30px) clamp(20px, 4%, 30px)',
    color: '#00ff41',
    fontFamily: 'monospace',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 'clamp(16px, 3vw, 24px)',
    marginBottom: 'clamp(10px, 3%, 20px)',
    borderBottom: '2px solid #00ff41',
    paddingBottom: 'clamp(5px, 2%, 10px)',
    letterSpacing: 'clamp(1px, 0.5vw, 3px)',
    wordBreak: 'break-word',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 3%, 20px)',
  },
  item: {
    padding: 'clamp(10px, 2.5%, 15px)',
    background: 'rgba(0, 255, 65, 0.05)',
    border: '1px solid rgba(0, 255, 65, 0.2)',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(5px, 1.5%, 8px)',
    flexWrap: 'wrap',
    gap: 'clamp(5px, 2%, 10px)',
  },
  degree: {
    fontSize: 'clamp(13px, 2vw, 16px)',
    margin: 0,
    color: '#ccffdc',
    wordBreak: 'break-word',
  },
  year: {
    fontSize: 'clamp(10px, 1.5vw, 12px)',
    opacity: 0.7,
    whiteSpace: 'nowrap',
  },
  institution: {
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    margin: '5px 0',
    opacity: 0.8,
    wordBreak: 'break-word',
  },
  description: {
    fontSize: 'clamp(11px, 1.6vw, 13px)',
    lineHeight: '1.6',
    opacity: 0.7,
    margin: '10px 0 0',
    wordBreak: 'break-word',
  },
  techSection: {
    marginBottom: 'clamp(10px, 2.5%, 15px)',
  },
  techCategory: {
    fontSize: 'clamp(13px, 2vw, 16px)',
    marginBottom: 'clamp(8px, 2%, 10px)',
    color: '#ccffdc',
  },
  techGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(6px, 1.5%, 10px)',
  },
  techTag: {
    padding: 'clamp(4px, 1%, 6px) clamp(8px, 2%, 12px)',
    background: 'rgba(0, 255, 65, 0.1)',
    border: '1px solid rgba(0, 255, 65, 0.3)',
    borderRadius: '15px',
    fontSize: 'clamp(10px, 1.5vw, 12px)',
    transition: 'all 0.2s',
    cursor: 'default',
    whiteSpace: 'nowrap',
  },
  resumePreview: {
    width: '90%',
    maxWidth: 'min(400px, 80%)',
    aspectRatio: '8.5 / 11',
    border: '2px dashed rgba(0, 255, 65, 0.3)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'clamp(15px, 3%, 20px)',
    background: 'rgba(0, 255, 65, 0.05)',
  },
  resumePlaceholder: {
    textAlign: 'center',
    padding: '10px',
  },
  downloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(6px, 2%, 10px)',
    padding: 'clamp(10px, 2%, 12px) clamp(16px, 3%, 24px)',
    background: '#00ff41',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
    whiteSpace: 'nowrap',
  },
};

// Add CSS for hover effects and responsive styles
if (!document.head.querySelector('[data-bioscan-styles]')) {
  const bioScanStyles = document.createElement('style');
  bioScanStyles.setAttribute('data-bioscan-styles', 'true');
  bioScanStyles.textContent = `
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
      /* Make BioScan front layout stack on mobile */
      .bioscan-container-mobile {
        flex-direction: column !important;
        gap: clamp(8px, 2%, 15px) !important;
      }
    }
  `;
  document.head.appendChild(bioScanStyles);
}

export default BioScanFlipCard;