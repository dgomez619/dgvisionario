import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const BioScan = () => {
  const lineRef = useRef(null);
  
  useEffect(() => {
    // FIX: Use V4 Syntax -> animate(target, parameters)
    animate(lineRef.current, {
      top: ['0%', '100%'],
      opacity: [0, 1, 0],   // Fade in/out at edges
      duration: 2000,
      ease: 'inOutSine',    // V4 uses 'ease', not 'easing'
      loop: true,
      direction: 'alternate'
    });
  }, []);

  return (
    <div style={styles.container}>
      {/* 1. The Image Frame */}
      <div style={styles.frame}>
        <img 
          src="https://robohash.org/matrix-avatar.png?set=set1&bgset=bg1" 
          alt="User Scan" 
          style={styles.image} 
        />
        
        {/* The Green Filter Overlay */}
        <div style={styles.greenOverlay}></div>
        
        {/* The Grid Texture */}
        <div style={styles.gridOverlay}></div>
        
        {/* The Moving Laser Line */}
        {/* We use a ref here now instead of just className */}
        <div ref={lineRef} className="scan-line" style={styles.scanLine}></div>
      </div>

      {/* 2. The Data Readout */}
      <div style={styles.readout}>
        <div style={styles.row}>
          <span style={styles.label}>ID:</span>
          <span style={styles.value}>NAV_01</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>CLASS:</span>
          <span style={styles.value}>DEV_ARCHITECT</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>STATUS:</span>
          <span style={styles.active}>ONLINE</span>
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
    gap: '15px',
    height: '100%',
    width: '100%',
  },
  frame: {
    position: 'relative',
    width: '80px',
    height: '80px',
    border: '1px solid #00ff41',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // CSS Magic to make any photo look like a green CRT monitor
    filter: 'grayscale(100%) sepia(100%) hue-rotate(70deg) saturate(400%) contrast(1.5)',
  },
  greenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 255, 65, 0.2)', // Tint
    mixBlendMode: 'overlay',
    pointerEvents: 'none',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Simple CSS grid pattern
    backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px),
                      linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '-1px -1px',
    opacity: 0.3,
    pointerEvents: 'none',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: '#00ff41',
    boxShadow: '0 0 10px #00ff41', // Glowing effect
    zIndex: 10,
  },
  readout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
    paddingBottom: '2px',
  },
  label: {
    opacity: 0.7,
  },
  value: {
    fontWeight: 'bold',
  },
  active: {
    color: '#00ff41',
    fontWeight: 'bold',
    textShadow: '0 0 5px #00ff41',
  }
};

export default BioScan;