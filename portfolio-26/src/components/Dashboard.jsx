import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import HologramCard from './HologramCard'; // We reuse your tilt effect!

const Dashboard = () => {
  const gridRef = useRef(null);

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
  }, []);

  return (
    <div style={styles.container}>
      <div ref={gridRef} style={styles.grid}>
        
        {/* MODULE A: PROFILE (Top Left) */}
        <div className="grid-item" style={styles.card}>
          <HologramCard>
            <div style={styles.innerCard}>
              <h3>NAVIGATOR</h3>
              <div style={styles.placeholderImg}>[IMG]</div>
              <p>Status: Online</p>
            </div>
          </HologramCard>
        </div>

        {/* MODULE B: PROJECTS (Top Right - Wide) */}
        <div className="grid-item" style={{ ...styles.card, gridColumn: 'span 2' }}>
           <HologramCard>
            <div style={styles.innerCard}>
              <h3>MISSION LOG (PROJECTS)</h3>
              <ul>
                <li>Project Alpha [DEPLOYED]</li>
                <li> Project Beta  [ARCHIVED]</li>
                <li> Side Quest X  [WIP]</li>
              </ul>
            </div>
          </HologramCard>
        </div>

        {/* MODULE C: SKILLS (Bottom Left) */}
        <div className="grid-item" style={styles.card}>
           <HologramCard>
            <div style={styles.innerCard}>
              <h3>SYSTEM SPECS</h3>
              <p>React / Node / WebGL</p>
            </div>
          </HologramCard>
        </div>

        {/* MODULE D: CONTACT (Bottom Right) */}
        <div className="grid-item" style={styles.card}>
           <HologramCard>
            <div style={styles.innerCard}>
              <h3>UPLINK</h3>
              <button style={styles.btn}>SEND TRANSMISSION</button>
            </div>
          </HologramCard>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr', // 3 Columns
    gridTemplateRows: '1fr 1fr',        // 2 Rows
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
  },
  innerCard: {
    border: '1px solid #00ff41',
    backgroundColor: 'rgba(13, 17, 23, 0.8)',
    height: '100%',
    padding: '20px',
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
  }
};

export default Dashboard;