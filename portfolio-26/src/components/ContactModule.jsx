import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import HologramCard from './HologramCard';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';

// --- 1. TargetBox with "Closing In" Animation ---
const TargetBox = ({ data, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation: 0px is corners, 20px is closer to center
  const offset = isHovered ? '20px' : '0px';

  const bracketStyle = {
    position: 'absolute',
    width: '15px',
    height: '15px',
    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', // Smooth snap
    borderColor: isHovered ? '#fff' : '#00ff41',
    zIndex: 0,
  };

  const content = (
    <>
      {/* Top Left */}
      <div style={{ 
        ...bracketStyle, 
        top: offset, left: offset, 
        borderTop: '2px solid', borderLeft: '2px solid',
        borderTopColor: bracketStyle.borderColor, borderLeftColor: bracketStyle.borderColor
      }} />
      
      {/* Top Right */}
      <div style={{ 
        ...bracketStyle, 
        top: offset, right: offset, 
        borderTop: '2px solid', borderRight: '2px solid',
        borderTopColor: bracketStyle.borderColor, borderRightColor: bracketStyle.borderColor
      }} />
      
      {/* Bottom Left */}
      <div style={{ 
        ...bracketStyle, 
        bottom: offset, left: offset, 
        borderBottom: '2px solid', borderLeft: '2px solid',
        borderBottomColor: bracketStyle.borderColor, borderLeftColor: bracketStyle.borderColor
      }} />
      
      {/* Bottom Right */}
      <div style={{ 
        ...bracketStyle, 
        bottom: offset, right: offset, 
        borderBottom: '2px solid', borderRight: '2px solid',
        borderBottomColor: bracketStyle.borderColor, borderRightColor: bracketStyle.borderColor
      }} />

      {/* Content */}
      <div style={styles.targetContent}>
        <div style={styles.sub}>{data.sub}</div>
        <div style={styles.label}>{data.label}</div>
        <div style={{ ...styles.status, opacity: isHovered ? 1 : 0.6, color: isHovered ? '#fff' : '#00ff41' }}>
          {isHovered ? '>> LOCKED <<' : 'SCANNING...'}
        </div>
      </div>
    </>
  );

  // Wrap based on interaction type
  if (onClick) {
    return (
      <div 
        style={styles.targetBox} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={onClick}
      >
        {content}
      </div>
    );
  }

  return (
    <a 
      href={data.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={styles.targetBox} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </a>
  );
};

// --- 2. Main Module ---
const ContactModule = forwardRef((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const form = useRef();
  const [submissionMessage, setSubmissionMessage] = useState(null);

  useImperativeHandle(ref, () => ({
    flip: () => setIsFlipped(true),
  }));

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ooprlrs', 'template_pd8sn4f', form.current, 'Sfscmxos6YxpsQrKo')
      .then((result) => {
        console.log(result.text);
        setSubmissionMessage('Message sent successfully.');
      }, (error) => {
        console.log(error.text);
        setSubmissionMessage('An error occurred, please try again.');
      });
    e.target.reset();
  };

  const targets = [
    { id: 1, label: 'GITHUB', sub: 'REPO_ACCESS', url: 'https://github.com/dgomez619' },
    { id: 2, label: 'LINKEDIN', sub: 'NET_UPLINK', url: 'https://linkedin.com' },
    { id: 3, label: 'EMAIL', sub: 'SECURE_MSG', url: '#' } 
  ];

  return (
    <div style={styles.perspectiveContainer}>
      <div style={{
        ...styles.flipper,
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        
        {/* --- FRONT SIDE (Tilt Active) --- */}
        <div style={styles.faceFront}>
          <HologramCard disabled={false}>
            <div style={{...styles.innerCard, padding: '10px'}}> 
              <div style={styles.flexContainer}>
                <TargetBox data={targets[0]} />
                <TargetBox data={targets[1]} />
                <TargetBox data={targets[2]} onClick={() => setIsFlipped(true)} />
              </div>
            </div>
          </HologramCard>
        </div>

        {/* --- BACK SIDE (Tilt DISABLED - Static) --- */}
        <div style={styles.faceBack}>
          <div style={{...styles.innerCard, transform: 'none', transformStyle: 'flat'}}>
            <div style={styles.formHeader}>
              <h3 style={styles.header}>SECURE MESSAGE</h3>
              <button onClick={() => setIsFlipped(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <form ref={form} onSubmit={sendEmail} style={styles.form}>
              <input type="text" name="user_name" placeholder="AGENT_ID (Name)" style={styles.input} required />
              <input type="email" name="user_email" placeholder="RETURN_ADDRESS (Email)" style={styles.input} required />
              <textarea name="message" placeholder="TRANSMISSION DATA..." style={styles.textarea} required></textarea>
              <button type="submit" style={styles.submitBtn}>INITIATE_UPLOAD</button>
              {submissionMessage && (
                <div style={{
                  color: submissionMessage.includes('success') ? '#00ff41' : '#ff4141',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '10px',
                  padding: '5px',
                  border: `1px solid ${submissionMessage.includes('success') ? '#00ff41' : '#ff4141'}`,
                  borderRadius: '3px',
                }}>
                  {submissionMessage}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
});

const styles = {
  perspectiveContainer: {
    width: '100%',
    height: '100%',
    perspective: '1000px',
  },
  flipper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
    transformStyle: 'preserve-3d',
  },
  faceFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    zIndex: 2, // Ensure front is on top when not flipped
  },
  faceBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    transformStyle: 'flat', // Prevent 3D propagation
    zIndex: 1,
  },
  innerCard: {
    border: '1px solid #00ff41',
    backgroundColor: 'rgba(13, 17, 23, 0.95)', // Slightly higher opacity for form legibility
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)',
    padding: '20px', 
  },
  flexContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  targetBox: {
    position: 'relative',
    flex: 1, 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    background: 'rgba(0, 20, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  targetContent: {
    textAlign: 'center',
    fontFamily: 'monospace',
    color: '#00ff41',
    zIndex: 10,
    pointerEvents: 'none',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '5px 0',
    textShadow: '0 0 5px rgba(0, 255, 65, 0.5)',
  },
  sub: {
    fontSize: '9px',
    opacity: 0.7,
  },
  status: {
    fontSize: '8px',
    marginTop: '5px',
    transition: 'color 0.3s',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    borderBottom: '1px solid #00ff41',
    paddingBottom: '5px',
  },
  header: {
    color: '#00ff41',
    fontFamily: 'monospace',
    margin: 0,
    fontSize: '16px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#00ff41',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
    width: '100%',
  },
  input: {
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #005f1f',
    color: '#00ff41',
    padding: '10px',
    fontFamily: 'monospace',
    outline: 'none',
    fontSize: '12px',
    zIndex: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #005f1f',
    color: '#00ff41',
    padding: '10px',
    fontFamily: 'monospace',
    outline: 'none',
    flex: 1,
    minHeight: '100px',
    resize: 'none',
    fontSize: '12px',
    zIndex: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
  submitBtn: {
    background: '#00ff41',
    color: 'black',
    border: 'none',
    padding: '10px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    cursor: 'pointer',
    marginTop: '5px',
    zIndex: 20,
  }
};

export default ContactModule;