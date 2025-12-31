import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- GLSL NOISE FUNCTION (Corrected Ashima 2D Simplex Noise) ---
// This version properly handles vector gradients to avoid the "dot" error.
const noiseChunk = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  ${noiseChunk}

  void main() {
    vUv = uv;
    
    // 1. CURVE THE PLANE
    // We bend the Z-axis based on the X-axis to create a semi-circle "Curtain"
    vec3 pos = position;
    pos.z += sin(pos.x * 2.0) * 5.0; // The Bend
    pos.y += sin(pos.x * 3.0 + uTime * 0.5) * 1.5; // The Wavy movement
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  ${noiseChunk}

  void main() {
    vec2 uv = vUv;
    
    // 1. NOISE MOVEMENT
    // We move the noise UP (y) fast, and SIDEWAYS (x) slow
    float noise1 = snoise(vec2(uv.x * 5.0, uv.y * 2.0 - uTime * 0.5));
    float noise2 = snoise(vec2(uv.x * 10.0 + uTime * 0.2, uv.y * 5.0 - uTime * 0.8));
    
    // Combine noise layers to get detailed "streaks"
    float combinedNoise = (noise1 + noise2) * 0.5;
    
    // 2. CREATE THE "CURTAIN" SHAPE
    // Auroras are bright at the bottom, fade at the top
    float alpha = smoothstep(0.0, 0.2, uv.y) * (1.0 - uv.y);
    
    // Add the noise texture to the alpha to make it look like "rays"
    alpha *= smoothstep(0.3, 0.6, combinedNoise + 0.5);
    
    // 3. COLOR GRADIENT
    // Mix Green and Purple/Blue based on height and noise
    vec3 colorGreen = vec3(0.0, 1.0, 0.6); // Sci-fi Green
    vec3 colorBlue = vec3(0.3, 0.0, 1.0);  // Deep Purple/Blue
    
    vec3 finalColor = mix(colorBlue, colorGreen, uv.y + combinedNoise * 0.2);
    
    // 4. OUTPUT
    gl_FragColor = vec4(finalColor, alpha * 0.6); // 0.6 Max Opacity
  }
`;

const AuroraBorealis = () => {
  const meshRef = useRef();

  // We memoize uniforms so they don't trigger re-renders
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, -5, -20]} // Push far back behind stars
      rotation={[0.5, 0, 0]}  // Tilt back
      scale={[50, 20, 1]}     // Huge scale
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default AuroraBorealis;