import React, { useRef } from 'react';
import { animate } from 'animejs';

const EnterButton = ({ onClick }) => {
  const btnRef = useRef(null);

  const handleHover = (isHovering) => {
    // Simple hover animation: widen the brackets
    animate(btnRef.current, {
      scale: isHovering ? 1.1 : 1,
      letterSpacing: isHovering ? '8px' : '4px',
      color: isHovering ? '#fff' : '#00ff41',
      duration: 400,
      ease: 'outExpo'
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={styles.button}
    >
      <span style={styles.text}>INITIALIZE SYSTEM</span>
      {/* Decorative Borders */}
      <div style={{ ...styles.bracket, left: 0, borderLeft: '2px solid #00ff41', borderTop: '2px solid #00ff41', borderBottom: '2px solid #00ff41' }} />
      <div style={{ ...styles.bracket, right: 0, borderRight: '2px solid #00ff41', borderTop: '2px solid #00ff41', borderBottom: '2px solid #00ff41' }} />
    </button>
  );
};

const styles = {
  button: {
    position: 'relative',
    background: 'transparent',
    border: 'none',
    padding: '15px 40px',
    cursor: 'pointer',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '16px',
    color: '#00ff41',
    letterSpacing: '4px',
    fontWeight: 'bold',
    outline: 'none',
    marginTop: '20px'
  },
  text: {
    position: 'relative',
    zIndex: 2,
  },
  bracket: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '10px',
    transition: 'all 0.3s ease', // CSS transition for the border lines
  }
};

export default EnterButton;