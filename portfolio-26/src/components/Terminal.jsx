import React, { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import HologramCard from './HologramCard';

const Terminal = ({ children }) => {
  const containerRef = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    const rect = rectRef.current;
    const container = containerRef.current;
    if (!rect || !container) return;

    // 1. Calculate Perimeter
    const { width, height } = container.getBoundingClientRect();
    const totalLength = (width + height) * 2;

    // 2. Set Initial CSS
    rect.style.strokeDasharray = totalLength;
    rect.style.strokeDashoffset = totalLength;

    // 3. ANIMATE (V4 SYNTAX)
    animate(rect, {
      strokeDashoffset: 0,
      duration: 2000,
      ease: 'inOutSine',
      delay: 100,
      onComplete: () => {
        rect.style.strokeDasharray = 'none'; 
      }
    });
    
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* The Tilt Wrapper */}
      <HologramCard>
        <div ref={containerRef} style={styles.container}>
          <svg style={styles.svg}>
            <rect 
              ref={rectRef}
              x="2" y="2" 
              width="99.5%" height="99%" 
              /* CHANGE: Background color is now here (Fill) */
              fill="#0d1117" 
              stroke="#00ff41" 
              strokeWidth="3" 
              rx="5" 
            />
          </svg>
          
          <div style={styles.content}>
            {children}
          </div>
        </div>
      </HologramCard>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: '1000px',
    zIndex: 2,
    // Ensure the wrapper doesn't flatten the 3D effect
    transformStyle: 'preserve-3d', 
  },
  container: {
    position: 'relative',
    minHeight: '400px',
    // CHANGE: Removed backgroundColor here so glare is visible
    padding: '40px',
    // Kept the shadow for the "glow" behind the unit
    boxShadow: '0 0 30px rgba(0, 255, 65, 0.15)',
    borderRadius: '5px',
    height: '100%', // Ensure it fills the tilt card
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'visible'
  },
  content: {
    color: '#00ff41',
    fontFamily: '"Courier New", Courier, monospace',
    position: 'relative',
    zIndex: 1,
    // CHANGE: Added this to make text look sharp during 3D transforms
    backfaceVisibility: 'hidden', 
  }
};

export default Terminal;