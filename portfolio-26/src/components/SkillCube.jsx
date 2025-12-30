import React from 'react';

const SkillCube = () => {
  return (
    <div className="cube-wrapper">
      <div className="cube-container">
        <div className="box-card">
          <div className="face front">REACT</div>
          <div className="face back">TAILWIND</div>
          <div className="face right">FIREBASE</div>
          <div className="face left">NODEJS</div>
          <div className="face top">MONGODB</div>
          <div className="face bottom">ANIME.JS</div>
        </div>
      </div>

      <style>{`
        /* Container fits the parent Grid Card */
        .cube-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          overflow: hidden; 
        }

        .cube-container {
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
        }

        /* --- CUBE SIZE SETTINGS --- */
        .box-card {
          width: 180px;  /* INCREASED SIZE */
          height: 180px; /* INCREASED SIZE */
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s ease;
          cursor: pointer;
          animation: rotate3d 12s infinite linear; 
        }

        .box-card:hover {
          animation-play-state: paused;
        }

        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem; /* Larger Text */
          font-family: 'Courier New', Courier, monospace;
          font-weight: bold;
          backface-visibility: visible;
          border-radius: 4px;
          background: rgba(13, 17, 23, 0.95); /* Slightly more opaque */
          border: 2px solid #00ff41;           /* Thicker border */
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);
          color: #00ff41;
          transition: all 0.3s ease;
        }

        /* --- THE MATH (Must be half of width: 90px) --- */
        
        /* React Blue */
        .front  { transform: translateZ(90px); border-color: #61DAFB; color: #61DAFB; } 
        
        /* Tailwind Teal */
        .back   { transform: translateZ(-90px) rotateY(180deg); border-color: #38B2AC; color: #38B2AC; } 
        
        /* Firebase Yellow */
        .right  { transform: translateX(90px) rotateY(90deg); border-color: #FFCA28; color: #FFCA28; } 
        
        /* Node Green */
        .left   { transform: translateX(-90px) rotateY(-90deg); border-color: #68A063; color: #68A063; } 
        
        /* Mongo Green */
        .top    { transform: translateY(-90px) rotateX(90deg); border-color: #4DB33D; color: #4DB33D; } 
        
        /* Anime Red */
        .bottom { transform: translateY(90px) rotateX(-90deg); border-color: #FF4B4B; color: #FF4B4B; } 

        @keyframes rotate3d {
          0%   { transform: rotateX(0) rotateY(0); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        /* --- RESPONSIVE ADJUSTMENT --- */
        /* On mobile, shrink it back down so it doesn't clip */
        @media (max-width: 768px) {
          .box-card { width: 140px; height: 140px; }
          .face { font-size: 1rem; }
          
          /* Update Math for 140px (Half is 70px) */
          .front  { transform: translateZ(70px); }
          .back   { transform: translateZ(-70px) rotateY(180deg); }
          .right  { transform: translateX(70px) rotateY(90deg); }
          .left   { transform: translateX(-70px) rotateY(-90deg); }
          .top    { transform: translateY(-70px) rotateX(90deg); }
          .bottom { transform: translateY(70px) rotateX(-90deg); }
        }
      `}</style>
    </div>
  );
};

export default SkillCube;