import React, { useState, useImperativeHandle, forwardRef } from 'react';
import HologramCard from './HologramCard';
import SkillCube from './SkillCube';
import { X } from 'lucide-react';

const SkillsFlipCard = forwardRef((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useImperativeHandle(ref, () => ({
    flip: () => setIsFlipped(true),
  }));

  const flipContainerStyle = {
    width: '100%',
    height: '100%',
    perspective: '1000px',
    position: 'relative',
  };

  const flipperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const faceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    zIndex: 2,
    overflow: 'hidden',
  };

  const backStyle = {
    ...faceStyle,
    transform: 'rotateY(180deg)',
    transformStyle: 'flat',
    zIndex: 1,
    overflow: 'visible',
  };

  const innerCardStyle = {
    width: '100%',
    height: '100%',
    padding: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #00ff41',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxSizing: 'border-box',
  };

  return (
    <div style={flipContainerStyle}>
      <div style={flipperStyle}>
        
        {/* FRONT SIDE - HologramCard wrapped inside */}
        <div style={faceStyle}>
          <HologramCard>
            <div style={innerCardStyle} onClick={() => setIsFlipped(true)}>
              <h3 style={{
                position: 'absolute', 
                top: '10px', 
                left: '10px', 
                zIndex: 10, 
                fontSize: '12px',
                margin: 0,
                color: '#00ff41'
              }}>
                SYSTEM SPECS
              </h3>
              <SkillCube />
            </div>
          </HologramCard>
        </div>

        {/* BACK SIDE - No HologramCard, static */}
        <div style={backStyle}>
          <div style={{
            ...innerCardStyle,
            justifyContent: 'flex-start',
            cursor: 'default',
            transform: 'none',
            transformStyle: 'flat',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              marginBottom: '16px',
              paddingBottom: '8px'
            }}>
              <h3 style={{ margin: 0, color: '#00ff41', fontSize: '16px' }}>TECHNOLOGIES</h3>
              <button 
                onClick={() => setIsFlipped(false)} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00ff41',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                aria-label="Close details"
              >
                <X size={24} />
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              color: '#d4d4d4',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              width: '100%',
              flex: 1,
              paddingRight: '8px',
              maxHeight: 'calc(100% - 60px)',
            }}>
              <p style={{ margin: 0 }}>
                I specialize in building modern web applications using <strong style={{ color: '#00ff41' }}>React</strong> and <strong style={{ color: '#00ff41' }}>Next.js</strong> for 
                dynamic, performant user interfaces. For styling, I leverage <strong style={{ color: '#00ff41' }}>Tailwind CSS</strong> and <strong style={{ color: '#00ff41' }}>CSS-in-JS</strong> solutions 
                to create responsive, pixel-perfect designs.
              </p>
              <p style={{ margin: 0 }}>
                On the backend, I work with <strong style={{ color: '#00ff41' }}>Node.js</strong> and <strong style={{ color: '#00ff41' }}>Express</strong> to build scalable APIs, 
                using <strong style={{ color: '#00ff41' }}>MongoDB</strong> and <strong style={{ color: '#00ff41' }}>PostgreSQL</strong> for data persistence. I'm proficient in 
                <strong style={{ color: '#00ff41' }}> TypeScript</strong> for type-safe development across the full stack.
              </p>
              <p style={{ margin: 0 }}>
                For animations and 3D experiences, I use <strong style={{ color: '#00ff41' }}>Three.js</strong>, <strong style={{ color: '#00ff41' }}>Anime.js</strong>, and 
                <strong style={{ color: '#00ff41' }}> Framer Motion</strong>. My workflow includes <strong style={{ color: '#00ff41' }}>Git</strong> for version control, 
                <strong style={{ color: '#00ff41' }}>Vite</strong> for fast builds, and modern deployment platforms like <strong style={{ color: '#00ff41' }}>Vercel</strong> and <strong style={{ color: '#00ff41' }}>Netlify</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

export default SkillsFlipCard;
