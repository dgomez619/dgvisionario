import React, { useState } from 'react';
import { animate } from 'animejs';

const targets = [
  { id: 'GH', label: 'GITHUB', sub: 'SCHEMATICS', url: 'https://github.com/yourusername' },
  { id: 'LI', label: 'LINKEDIN', sub: 'ALLIANCE_NET', url: 'https://linkedin.com/in/yourname' },
  { id: 'EM', label: 'EMAIL', sub: 'DIRECT_UPLINK', url: 'mailto:youremail@example.com' },
];

const TargetBox = ({ data }) => {
  const [locked, setLocked] = useState(false);

  // Hover Effect: "Locking On"
  const handleMouseEnter = (e) => {
    setLocked(true);
    // Animate the brackets closing in
    animate({
      targets: e.currentTarget.querySelectorAll('.bracket'),
      scale: [1, 0.9],
      borderColor: '#fff', // Flash white
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = (e) => {
    setLocked(false);
    // Reset brackets
    animate({
      targets: e.currentTarget.querySelectorAll('.bracket'),
      scale: 1,
      borderColor: '#00ff41', // Back to green
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return (
    <a 
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.targetBox}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The "Crosshairs" - Absolute positioned corners */}
      <div className="bracket" style={{ ...styles.bracket, top: 0, left: 0, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
      <div className="bracket" style={{ ...styles.bracket, top: 0, right: 0, borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
      <div className="bracket" style={{ ...styles.bracket, bottom: 0, left: 0, borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
      <div className="bracket" style={{ ...styles.bracket, bottom: 0, right: 0, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />

      {/* Center Content */}
      <div style={styles.content}>
        <div style={styles.sub}>{data.sub}</div>
        <div style={styles.label}>{data.label}</div>
        
        {/* Conditional "Status" Text */}
        <div style={{ ...styles.status, opacity: locked ? 1 : 0.5 }}>
          {locked ? '>> LOCK_ESTABLISHED <<' : 'WAITING FOR INPUT...'}
        </div>
      </div>
    </a>
  );
};

const CommsArray = () => {
  return (
    <div style={styles.container}>
      {targets.map((t) => (
        <TargetBox key={t.id} data={t} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between', // Spread them out
    gap: '10px',
    padding: '10px',
  },
  targetBox: {
    position: 'relative',
    flex: 1, // Each takes equal width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    background: 'rgba(0, 20, 0, 0.3)', // Very subtle background
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  bracket: {
    position: 'absolute',
    width: '15px',
    height: '15px',
    transition: 'all 0.2s ease', // Smooth CSS transition
  },
  content: {
    textAlign: 'center',
    fontFamily: 'monospace',
    color: '#00ff41',
    zIndex: 10,
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '5px 0',
    textShadow: '0 0 5px rgba(0, 255, 65, 0.5)',
  },
  sub: {
    fontSize: '10px',
    opacity: 0.7,
  },
  status: {
    fontSize: '9px',
    marginTop: '5px',
    color: locked => locked ? '#fff' : '#00ff41', // White when locked
  }
};

export default CommsArray;