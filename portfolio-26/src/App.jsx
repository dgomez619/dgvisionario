import React, { useState, useRef } from 'react';
import { animate } from 'animejs';
import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import EnterButton from './components/EnterButton';
import Dashboard from './components/Dashboard';
// import StarshipBackground from './components/StarshipBackground';
import SpaceBackground from './components/SpaceBackground';

function App() {
  const [view, setView] = useState('boot'); 
  // Ref for the content inside the terminal so we can fade it out
  const contentRef = useRef(null); 

  const handleEnterSystem = () => {
    // 1. Fade out the text/button inside the terminal first
    animate(contentRef.current, {
      opacity: [1, 0],
      duration: 500,
      easing: 'linear',
      onComplete: () => {
        // 2. Once text is gone, switch view to Dashboard
        // The Dashboard component will handle the "Explosion" animation on mount
        setView('dashboard');
      }
    });
  };

  if (view === 'dashboard') {
    return (
      <div style={styles.appContainer}>
        {/* Animated space background */}
          {/* <StarshipBackground /> */}
          <SpaceBackground />
        <Dashboard />
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      {/* Animated space background */}
      {/* <StarshipBackground /> */}
      <SpaceBackground />

      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        * { box-sizing: border-box; }
      `}</style>

      {/* We wrap Terminal with a div to fade it out if needed, 
          but usually we just fade the content inside 
      */}
      <Terminal>
        <div ref={contentRef} style={{ width: '100%', height: '100%' }}>
          {view === 'boot' ? (
            <BootSequence onComplete={() => setView('intro')} />
          ) : (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <h1 style={{ marginTop: 0 }}>ACCESS GRANTED</h1>
              <p>COMMAND: Waiting for manual override...</p>
              
              <div style={{ margin: '40px auto' }}>
                <EnterButton onClick={handleEnterSystem} />
              </div>

              <p style={{ fontSize: '12px', opacity: 0.5 }}>SECURE CONNECTION ESTABLISHED</p>
            </div>
          )}
        </div>
      </Terminal>
    </div>
  );
}

const styles = {
  appContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures image covers full area without distortion
    objectPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },


};

export default App;