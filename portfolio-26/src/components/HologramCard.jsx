import React, { useRef, useState } from 'react';

const HologramCard = ({ 
  children, 
  disabled = false,
  glareEnable = false,
  glareMaxOpacity = 1,
  glareColor = '#ffffff',
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  if (disabled) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / 25) * -1; 
    const rotateY = x / 25;

    setRotation({ x: rotateX, y: rotateY });

    if (glareEnable) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }
    
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
    if (glareEnable) {
      setGlarePosition({ x: 50, y: 50 });
    }
  };

  const ghostLayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        perspective: '1000px',
        zIndex: 1,
      }}
    >
      {/* --- GHOST LAYER 1 (Red / Far / Slow) --- */}
      <div
        style={{
          ...ghostLayerStyle,
          background: 'rgba(255, 0, 50, 0.6)', // Increased Opacity
          // AMPLIFIED: Rotates 2x more than the card
          // DEEPENED: Pushed back to -30px
          transform: `translateZ(-30px) rotateX(${rotation.x * 2}deg) rotateY(${rotation.y * 2}deg)`,
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s',
          opacity: isHovering ? 1 : 0,
          zIndex: -1,
        }}
      />

      {/* --- GHOST LAYER 2 (Cyan / Mid / Medium) --- */}
      <div
        style={{
          ...ghostLayerStyle,
          background: 'rgba(0, 255, 255, 0.6)', // Increased Opacity
          // AMPLIFIED: Rotates 2x more than the card
          // DEEPENED: Pushed back to -15px
          transform: `translateZ(-15px) rotateX(${rotation.x * 2}deg) rotateY(${rotation.y * 2}deg)`,
          transition: 'transform 0.50s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s',
          opacity: isHovering ? 1 : 0,
          zIndex: -2,
          mixBlendMode: 'screen',
        }}
      />

      {/* --- MAIN CARD --- */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          overflow: glareEnable ? 'hidden' : 'visible',
          borderRadius: 'inherit',
        }}
      >
        {glareEnable && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 100%)`,
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
    </div>
  );
};

export default HologramCard;