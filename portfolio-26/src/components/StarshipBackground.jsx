import React, { useEffect, useRef } from 'react';

const StarshipBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Load Cloudinary script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/cloudinary-video-player@2.0.3/dist/cld-video-player.min.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize Cloudinary player with autoplay
      if (window.cloudinary && videoRef.current) {
        window.cloudinary.videoPlayer(videoRef.current, {
          cloudName: 'dwrinmdz0',
          publicId: 'bgv_zogjoy',
          controls: false,
          autoplay: true,
          loop: true,
          muted: true,
          showLogo: false,
          fluid: true,
        });
      }
    };

    document.body.appendChild(script);

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/cloudinary-video-player@2.0.3/dist/cld-video-player.min.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup
      if (script.parentNode) script.parentNode.removeChild(script);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* 1. The Video Layer - Cloudinary player */}
      <video
        ref={videoRef}
        style={styles.video}
        playsInline
      />

      {/* 2. The "Sci-Fi" Texture Layer */}
      {/* This darkens the video and adds a grid mesh so text pops */}
      <div style={styles.overlay}></div>
      <div style={styles.scanlines}></div>
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
    zIndex: -1, // Puts it behind everything
    overflow: 'hidden',
    backgroundColor: 'black', // Fallback color while loading
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    border: 'none',
    opacity: 0.8, // Dim the video slightly
    pointerEvents: 'none', // Prevent interaction with iframe
    objectFit: 'cover', // Ensure video covers the area
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)', // Vignette
    pointerEvents: 'none',
  },
  scanlines: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
    backgroundSize: '100% 2px, 3px 100%', // Creates a fine TV mesh
    pointerEvents: 'none',
    opacity: 0.6
  }
};

export default StarshipBackground;