import React, { useRef, useState } from 'react';


const HologramCard = ({ 
  children, 
  disabled = false,
  glareEnable = false,
  glareMaxOpacity = 0.15,
  glareColor = '#ffffff',
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  // --- THE FIX ---
  // If disabled, render a plain static div. 
  // This removes all 3D transforms and mouse listeners entirely.
  if (disabled) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    );
  }

  // --- Normal Tilt Logic ---
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / 25) * -1; 
    const rotateY = x / 25;

    setRotation({ x: rotateX, y: rotateY });

    // Calculate glare position if enabled
    if (glareEnable) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    if (glareEnable) {
      setGlarePosition({ x: 50, y: 50 });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        transition: 'transform 0.1s ease-out',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        overflow: glareEnable ? 'hidden' : 'visible',
      }}
    >
      {/* White glare effect - only rendered if enabled */}
      {glareEnable && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 30%)`,
            opacity: glareMaxOpacity,
            pointerEvents: 'none',
            transition: 'background 0.1s ease-out',
            zIndex: 10,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {children}
    </div>
  );
};

export default HologramCard;