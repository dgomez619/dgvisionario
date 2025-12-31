import React, { useState } from 'react';
import FrequencyWave from './FrequencyWave';
import { animate } from 'animejs';

const SecureUplink = () => {
  const [waveIntensity, setWaveIntensity] = useState(0);
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SENT

  // Increase wave intensity when typing
  const handleInput = () => {
    setWaveIntensity(1.5);
    // Decay back to 0
    setTimeout(() => setWaveIntensity(0), 200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setStatus('SENDING');
    
    // Simulate Network Request
    setTimeout(() => {
      setStatus('SENT');
      // Reset after 3 seconds
      setTimeout(() => setStatus('IDLE'), 3000);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>// SECURE_CHANNEL_v4.0</span>
        <span style={{...styles.status, color: status === 'IDLE' ? '#00ff41' : 'yellow'}}>
          [{status}]
        </span>
      </div>

      {/* THE VISUALIZER */}
      <FrequencyWave amplitude={status === 'SENDING' ? 3 : waveIntensity} />

      {/* THE FORM */}
      {status === 'SENT' ? (
        <div style={styles.successMessage}>
          <h3>TRANSMISSION CONFIRMED</h3>
          <p>We will respond to your coordinates shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSend} style={styles.form}>
          <div style={styles.row}>
            <input 
              type="text" 
              placeholder="IDENTITY (EMAIL)" 
              style={styles.input} 
              onKeyDown={handleInput}
              required
            />
            <button type="submit" style={styles.button}>
              {status === 'SENDING' ? 'UPLOADING...' : 'INITIATE UPLINK'}
            </button>
          </div>
          <textarea 
            placeholder="ENCRYPTED MESSAGE PACKET..." 
            style={styles.textarea} 
            onKeyDown={handleInput}
            required
          />
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px',
    fontFamily: 'monospace',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    opacity: 0.7,
    marginBottom: '5px'
  },
  label: {
    color: '#00ff41',
  },
  status: {
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 2,
    background: 'rgba(0, 255, 65, 0.05)',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '10px',
    fontFamily: 'monospace',
    outline: 'none',
    fontSize: '14px',
  },
  textarea: {
    flex: 1, // Takes remaining height
    background: 'rgba(0, 255, 65, 0.05)',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '10px',
    fontFamily: 'monospace',
    outline: 'none',
    resize: 'none',
    fontSize: '14px',
  },
  button: {
    flex: 1,
    background: '#00ff41',
    color: '#000',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'monospace',
    transition: 'all 0.3s ease',
  },
  successMessage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00ff41',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease'
  }
};

export default SecureUplink;