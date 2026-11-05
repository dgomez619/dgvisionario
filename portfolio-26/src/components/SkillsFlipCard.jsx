import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import HologramCard from './HologramCard';
import SkillCube from './SkillCube';
import { X, Sparkles } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiStyledcomponents,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiThreedotjs,
  SiFramer,
  SiGit,
  SiVite,
  SiVercel,
  SiNetlify,
} from 'react-icons/si';

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95, Icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', level: 90, Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Next.js', level: 85, Icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'TypeScript', level: 85, Icon: SiTypescript, color: '#3178C6' },
      { name: 'CSS-in-JS', level: 85, Icon: SiStyledcomponents, color: '#DB7093' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', level: 85, Icon: SiExpress, color: '#E5E7EB' },
      { name: 'MongoDB', level: 85, Icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', level: 80, Icon: SiPostgresql, color: '#4169E1' },
    ],
  },
  {
    category: 'Animation & Tools',
    skills: [
      { name: 'Git', level: 90, Icon: SiGit, color: '#F05032' },
      { name: 'Vite', level: 90, Icon: SiVite, color: '#646CFF' },
      { name: 'Anime.js', level: 85, Icon: Sparkles, color: '#F7DF1E' },
      { name: 'Vercel', level: 85, Icon: SiVercel, color: '#FFFFFF' },
      { name: 'Netlify', level: 85, Icon: SiNetlify, color: '#00C7B7' },
      { name: 'Framer Motion', level: 80, Icon: SiFramer, color: '#0055FF' },
      { name: 'Three.js', level: 75, Icon: SiThreedotjs, color: '#FFFFFF' },
    ],
  },
];

const BAR_ANIMATION_DURATION = 2000; // ms - slower, more dramatic fill

const AnimatedSkillRow = ({ skill, animateBars }) => {
  const rowRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const IconComponent = skill.Icon;

  useEffect(() => {
    if (!animateBars || !rowRef.current) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let startTime = null;

    const startCounter = () => {
      if (prefersReducedMotion) {
        setDisplayValue(skill.level);
        return;
      }

      setDisplayValue(0);
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / BAR_ANIMATION_DURATION, 1);

        // Cubic ease-out to match cubic-bezier(0.22, 1, 0.36, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(easedProgress * skill.level));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          startCounter();
          observer.disconnect();
        } else {
          setIsInView(false);
          setDisplayValue(0);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(rowRef.current);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animateBars, skill.level]);

  const isActive = animateBars && isInView;
  const shownPercentage = isActive ? displayValue : 0;

  return (
    <div
      ref={rowRef}
      className="skill-bar-row"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '6px 8px',
        background: 'rgba(0, 255, 65, 0.04)',
        border: '1px solid rgba(0, 255, 65, 0.15)',
        borderRadius: '4px',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <IconComponent
            size={15}
            style={{ color: skill.color, flexShrink: 0, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}
            aria-hidden="true"
          />
          <span style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(11px, 1.5vw, 13px)',
            fontWeight: 'bold',
            color: '#e6f4ea',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {skill.name}
          </span>
        </div>

        <span style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(10px, 1.4vw, 12px)',
          color: '#00ff41',
          fontWeight: 'bold',
          flexShrink: 0,
          minWidth: '34px',
          textAlign: 'right',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {shownPercentage}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuenow={shownPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: '6px',
          background: 'rgba(0, 255, 65, 0.1)',
          border: '1px solid rgba(0, 255, 65, 0.25)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="skill-bar-fill"
          style={{
            width: isActive ? `${skill.level}%` : '0%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0, 255, 65, 0.45) 0%, #00ff41 100%)',
            boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)',
            borderRadius: '2px',
            transition: isActive
              ? `width ${BAR_ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : 'none',
          }}
        />
      </div>
    </div>
  );
};

const SkillsFlipCard = forwardRef((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  const handleOpen = () => {
    setDisplayResetAndFlip();
  };

  const setDisplayResetAndFlip = () => {
    setAnimateBars(false);
    setIsFlipped(true);
  };

  const handleClose = () => {
    setIsFlipped(false);
    setAnimateBars(false);
  };

  useImperativeHandle(ref, () => ({
    flip: () => setDisplayResetAndFlip(),
  }));

  useEffect(() => {
    if (!isFlipped) return;
    const timer = setTimeout(() => setAnimateBars(true), 300);
    return () => clearTimeout(timer);
  }, [isFlipped]);

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

  const frontStyle = {
    ...faceStyle,
    pointerEvents: isFlipped ? 'none' : 'auto',
    visibility: isFlipped ? 'hidden' : 'visible',
  };

  const backStyle = {
    ...faceStyle,
    transform: 'rotateY(180deg)',
    transformStyle: 'flat',
    zIndex: 1,
    overflow: 'visible',
    pointerEvents: isFlipped ? 'auto' : 'none',
    visibility: isFlipped ? 'visible' : 'hidden',
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
    minHeight: 0,
  };

  return (
    <div style={flipContainerStyle}>
      <div style={flipperStyle}>
        
        {/* FRONT SIDE - HologramCard wrapped inside */}
        <div style={frontStyle}>
          {!isFlipped ? (
            <HologramCard>
              <div style={innerCardStyle} onClick={handleOpen}>
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
          ) : null}
        </div>

        {/* BACK SIDE - No HologramCard, static */}
        <div style={backStyle}>
          <div style={{
            ...innerCardStyle,
            justifyContent: 'flex-start',
            cursor: 'default',
            transform: 'none',
            transformStyle: 'flat',
            padding: 'clamp(10px, 2.5%, 16px)',
            background: 'rgba(13, 17, 23, 0.92)',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              marginBottom: '10px',
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
              flexShrink: 0,
            }}>
              <h3 style={{
                margin: 0,
                color: '#00ff41',
                fontSize: 'clamp(14px, 2vw, 16px)',
                fontFamily: 'monospace',
                letterSpacing: '2px',
              }}>
                TECHNOLOGIES
              </h3>
              <button 
                onClick={handleClose} 
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
                <X size={20} />
              </button>
            </div>

            <div
              className="skills-scroll-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                color: '#d4d4d4',
                fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                lineHeight: '1.5',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
                overscrollBehavior: 'contain',
                width: '100%',
                flex: 1,
                paddingRight: '6px',
                maxHeight: '100%',
                minHeight: 0,
              }}
            >
              <p style={{
                margin: 0,
                color: '#b8c4bc',
                fontSize: 'clamp(0.78rem, 1.4vw, 0.85rem)',
                fontFamily: 'monospace',
              }}>
                Full-stack toolkit focused on performant UIs, scalable APIs, and interactive 3D web experiences.
              </p>

              {SKILL_CATEGORIES.map((group) => (
                <div key={group.category} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{
                    margin: 0,
                    color: '#00ff41',
                    fontSize: 'clamp(11px, 1.5vw, 13px)',
                    fontFamily: 'monospace',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                  }}>
                    // {group.category}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {group.skills.map((skill) => (
                      <AnimatedSkillRow
                        key={skill.name}
                        skill={skill}
                        animateBars={animateBars}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <p style={{
                margin: 0,
                color: '#b8c4bc',
                fontSize: 'clamp(0.78rem, 1.4vw, 0.85rem)',
                fontFamily: 'monospace',
              }}>
I specialize in building modern web applications using React, Vite, Typescript, and Next.js among other tools for dynamic, performant user interfaces. For styling, I leverage Tailwind CSS and CSS-in-JS solutions to create responsive, pixel-perfect designs. 

<hr style={{ borderColor: 'rgba(0, 255, 65, 0.3)', margin: '16px 0' }} />

On the backend, I work with Node.js and Express to build scalable APIs, using MongoDB and PostgreSQL for data persistence. I'm proficient in TypeScript for type-safe development across the full stack.

<hr style={{ borderColor: 'rgba(0, 255, 65, 0.3)', margin: '16px 0' }} />


For animations and 3D experiences, I use Three.js, Anime.js, and Framer Motion. My workflow includes Git for version control, Vite for fast builds, and modern deployment platforms like Vercel and Netlify.     

<hr style={{ borderColor: 'rgba(0, 255, 65, 0.3)', margin: '16px 0' }} />


But my most powerful tool is my desire to keep learning; I am always open to working with different technologies, constantly seeking better options and more efficient workflows.

         </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

if (typeof document !== 'undefined' && !document.head.querySelector('[data-skills-flipcard-styles]')) {
  const skillsStyle = document.createElement('style');
  skillsStyle.setAttribute('data-skills-flipcard-styles', 'true');
  skillsStyle.textContent = `
    .skills-scroll-container {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 255, 65, 0.5) rgba(0, 0, 0, 0.3);
    }
    .skills-scroll-container::-webkit-scrollbar {
      width: 5px;
    }
    .skills-scroll-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 3px;
    }
    .skills-scroll-container::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 65, 0.45);
      border-radius: 3px;
    }
    .skills-scroll-container::-webkit-scrollbar-thumb:hover {
      background: #00ff41;
    }
    .skill-bar-row:hover {
      background: rgba(0, 255, 65, 0.09) !important;
      border-color: rgba(0, 255, 65, 0.4) !important;
    }
    @media (prefers-reduced-motion: reduce) {
      .skill-bar-fill {
        transition: none !important;
        transition-delay: 0ms !important;
      }
    }
  `;
  document.head.appendChild(skillsStyle);
}

export default SkillsFlipCard;
