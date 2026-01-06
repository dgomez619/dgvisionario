import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import bioscan1 from '../assets/bioscan1.png';

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
    <div style={styles.container}>
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
          <span style={styles.label}>ID:</span>
          <span style={styles.value}>NAV_01</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>SPECIES:</span>
          <span style={styles.value}>HUMAN_AUG</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>CLASS:</span>
          <span style={styles.value}>ARCHITECT</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>STATUS:</span>
          <span style={styles.active}>DETECTED</span>
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
    padding: '20px',
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
    minWidth: '180px', // Ensures text aligns nicely
    borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    paddingBottom: '4px',
  },
  label: {
    opacity: 0.8,
    fontSize: '12px',
    letterSpacing: '1px',
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

export default BioScan;