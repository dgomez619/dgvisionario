import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import AuroraBorealis from './AuroraBorealis'; // <--- Update Import

// ... (MovingStars component stays exactly the same) ...
const MovingStars = () => {
  const starsRef = useRef();
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005; 
      starsRef.current.rotation.x += 0.0002; 
    }
  });
  return (
    <Stars radius={100} depth={50} count={7000} factor={20} saturation={0} fade={true} speed={1.5} ref={starsRef} />
  );
};

const SpaceBackground = () => {
  return (
    <div style={styles.wrapper}>
      {/* camera fov: 75 gives a wider angle, making the aurora look bigger.
         position: moved back to [0,0,10] so we see the full curve.
      */}
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <MovingStars />
        
        {/* We place the Aurora */}
        <AuroraBorealis />
      </Canvas>
      <div style={styles.overlay} />
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1, 
    background: 'black',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Very subtle gradient so we don't hide the aurora colors
    background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none',
  }
};

export default SpaceBackground;