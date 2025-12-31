import React, { useState } from 'react';
import { Github, Linkedin, Mail, X } from 'lucide-react'; 
import './ModuleD.css'; // <--- Don't forget this import!

const ModuleD = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-container">
      {/* The inner container that rotates. We add the 'flipped' class conditionally */}
      <div className={`flipper ${isFlipped ? 'flipped' : ''}`}>
        
        {/* --- FRONT SIDE (Social Links) --- */}
        <div className="front">
          <div className="header">
            <h2>Connect</h2>
            <p>Find me on these platforms or send a quick email.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
              <Github size={20} />
              <span>GitHub</span>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>

            {/* This button triggers the flip */}
            <button onClick={() => setIsFlipped(true)} className="social-link email-btn">
              <Mail size={20} />
              <span>Email Me</span>
            </button>
          </div>
        </div>

        {/* --- BACK SIDE (Form) --- */}
        <div className="back">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2>Send Message</h2>
            <button onClick={() => setIsFlipped(false)} className="close-btn">
              <X size={24} />
            </button>
          </div>

          <form className="form-container">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="input-field"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="input-field"
            />
            <textarea 
              placeholder="Hello..." 
              className="input-field textarea-field"
            ></textarea>
            
            <button className="submit-btn">
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ModuleD;