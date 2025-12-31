import React, { useRef, useEffect } from 'react';

const FrequencyWave = ({ amplitude = 0 }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // 1. ROBUST SIZING
    // We set the internal resolution to match the display size for sharpness
    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize(); // Call once immediately

    const render = () => {
      // 2. SPEED CONTROL (Lower = Slower)
      // Was 0.05, now 0.01 for a lazy, floating vibe
      time += 0.01; 
      
      // Clear Screen
      ctx.fillStyle = 'rgba(13, 17, 23, 1)'; // Solid background to prevent trails overwriting transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00ff41'; // Matrix Green
      
      // Draw the Wave
      for (let x = 0; x < canvas.width; x++) {
        // 3. WAVE SHAPE
        // "x * 0.005" makes the wave wider (lower frequency)
        const baseFreq = Math.sin(x * 0.005 + time) * 10;
        
        // Reaction wave (only appears when typing)
        const reactionFreq = Math.sin(x * 0.05 + time * 10) * (amplitude * 15);
        
        // Center vertically
        const y = canvas.height / 2 + baseFreq + reactionFreq;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude]);

  return (
    <div 
      ref={wrapperRef}
      style={{ 
        width: '90%', 
        height: '80px', // Fixed height for the visualizer area
        borderRadius: '10px 10px 0 0', // Round top corners only
        overflow: 'hidden', // CRITICAL: Cuts off anything outside
        background: '#0d1117',
        borderBottom: '1px solid #00ff41',
        flexShrink: 0 // Prevent flexbox from squishing it
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '90%', height: '100%' }} />
    </div>
  );
};

export default FrequencyWave;