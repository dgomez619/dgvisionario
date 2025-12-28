import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const logs = [
  "SYSTEM_CHECK: INITIALIZING...",
  "MEMORY_CORE: OK",
  "NETWORK_UPLINK: ESTABLISHED",
  "LOADING_ASSETS: [/////////////////]",
  "USER_AUTH: ADMIN_RECOGNIZED",
  "WELCOME, NAVIGATOR."
];

const BootSequence = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Select all the log lines inside our container
    const lines = containerRef.current.querySelectorAll('.log-line');

    animate(lines, {
      opacity: [0, 1],       // Fade in
      translateX: [-20, 0],  // Slide from left
      color: ['#333', '#00ff41'], // Flash from dark to green
      
      // THE MAGIC SAUCE: Stagger the delay
      delay: stagger(500, { start: 1000 }), 
      
      duration: 1000,
      ease: 'outExpo',
      
      // When the whole sequence is done, tell the parent component
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} style={styles.container}>
      {logs.map((log, index) => (
        <div key={index} className="log-line" style={styles.line}>
          <span style={styles.prefix}>{`>`}</span> {log}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontFamily: 'monospace',
    padding: '20px',
  },
  line: {
    opacity: 0, // Start hidden, let Anime.js reveal it
    color: '#00ff41',
    fontSize: '14px',
    letterSpacing: '1px',
    textShadow: '0 0 5px rgba(0, 255, 65, 0.5)', // Glowing text
  },
  prefix: {
    marginRight: '10px',
    opacity: 0.5
  }
};

export default BootSequence;