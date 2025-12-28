import React from 'react';
import Tilt from 'react-parallax-tilt';

const HologramCard = ({ children }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}      // Subtle reflection
      glareColor="#ffffff"       // White glare looks best on glass
      glarePosition="all"
      glareBorderRadius="5px"
      tiltMaxAngleX={5}          // Low angle = heavier, more realistic feel
      tiltMaxAngleY={5}
      scale={1.01}               // Very slight zoom on hover
      transitionSpeed={2000}     // Slow ease-out for a heavy "machinery" feel
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      {/* The Tilt component creates a wrapper. 
        We pass the children through without altering them.
      */}
      {children}
    </Tilt>
  );
};

export default HologramCard;