import React, { useState } from 'react';
import HologramCard from './HologramCard';

const projects = [
  { id: 1, title: 'PROJECT ALPHA', type: 'WEB APP', status: 'DEPLOYED' },
  { id: 2, title: 'NEON CORE', type: 'GAME DEV', status: 'DEMO' },
  { id: 3, title: 'DATA NEXUS', type: 'BACKEND', status: 'OFFLINE' },
  { id: 4, title: 'VOID SHELL', type: 'UI LIB', status: 'WIP' },
  { id: 5, title: 'CYBER DECK', type: 'HARDWARE', status: 'CONCEPT' },
];

const ProjectRing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 3D MATH CONFIG
  const radius = 200; // How far items push out (the size of the ring)
  const anglePerItem = 360 / projects.length;

  const rotateCarousel = (direction) => {
    const newIndex = activeIndex + direction;
    setActiveIndex(newIndex);
  };

  return (
    <div style={styles.scene}>
      <div style={styles.carouselContainer}>
        <div 
          style={{
            ...styles.carousel,
            // We rotate the entire ring based on the active index
            transform: `translateZ(-${radius}px) rotateY(${activeIndex * -anglePerItem}deg)`
          }}
        >
          {projects.map((project, index) => {
            // Calculate exact position for each card
            const rotateY = index * anglePerItem;
            
            return (
              <div 
                key={project.id}
                style={{
                  ...styles.cardWrapper,
                  // Place card in the circle: Rotate it, then push it out
                  transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`
                }}
              >
                {/* We reuse your HologramCard for the individual item look */}
                <HologramCard>
                  <div style={styles.cardContent}>
                    <h3>{project.title}</h3>
                    <div style={styles.scanline}></div>
                    <p style={{ fontSize: '10px' }}>TYPE: {project.type}</p>
                    <p style={{ color: project.status === 'DEPLOYED' ? '#00ff41' : 'yellow' }}>
                      STATUS: {project.status}
                    </p>
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
        <span style={{ margin: '0 10px', color: '#00ff41' }}>NAVIGATE</span>
        <button onClick={() => rotateCarousel(1)} style={styles.btn}>{'>'}</button>
      </div>
    </div>
  );
};

const styles = {
  scene: {
    width: '100%',
    height: '100%', // Take full height of the parent card
    perspective: '1500px', // ESSENTIAL: Creates the 3D depth (increased for larger view)
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden' // Hide items that spin too far back
  },
  carouselContainer: {
    width: '250px', // Width of a single card (increased)
    height: '200px', // Height of a single card (increased)
    position: 'relative',
  },
  carousel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transformStyle: 'preserve-3d', // ESSENTIAL: Allows children to exist in 3D space
    transition: 'transform 1s cubic-bezier(0.1, 0.6, 0.2, 1)', // Smooth "Tech" easing
  },
  cardWrapper: {
    position: 'absolute',
    width: '250px',
    height: '180px',
    left: '0px',
    top: '10px',
    // Backface visibility determines if you see the card when it spins behind
    backfaceVisibility: 'hidden', 
  },
  cardContent: {
    background: 'rgba(0, 20, 0, 0.9)',
    border: '1px solid #00ff41',
    height: '100%',
    padding: '10px',
    color: '#00ff41',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  scanline: {
    height: '2px',
    background: '#00ff41',
    width: '100%',
    margin: '10px 0',
    opacity: 0.5
  },
  controls: {
    marginTop: '60px',
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
  }
};

export default ProjectRing;