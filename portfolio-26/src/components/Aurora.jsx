import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- GLSL NOISE FUNCTION ---
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
    
    // 1. CURVE THE PLANE (UPDATED)
    vec3 pos = position;
    
    // FIX: Reduced frequency (0.5 instead of 2.0)
    // This makes the curve much wider/gentler, preventing it from looping back into view
    pos.z += sin(pos.x * 0.5) * 10.0; 
    
    // Wavy movement
    pos.y += sin(pos.x * 1.5 + uTime * 0.5) * 2.0; 
    
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
    // Slowed down X movement slightly for a more majestic feel
    float noise1 = snoise(vec2(uv.x * 3.0, uv.y * 2.0 - uTime * 0.4));
    float noise2 = snoise(vec2(uv.x * 8.0 + uTime * 0.2, uv.y * 4.0 - uTime * 0.6));
    
    float combinedNoise = (noise1 + noise2) * 0.5;
    
    // 2. CREATE THE "CURTAIN" SHAPE
    float alpha = smoothstep(0.0, 0.15, uv.y) * (1.0 - uv.y);
    
    alpha *= smoothstep(0.2, 0.5, combinedNoise + 0.5);
    
    // 3. COLOR GRADIENT
    vec3 colorGreen = vec3(0.0, 1.0, 0.6); 
    vec3 colorBlue = vec3(0.3, 0.0, 1.0);  
    
    vec3 finalColor = mix(colorBlue, colorGreen, uv.y + combinedNoise * 0.2);
    
    gl_FragColor = vec4(finalColor, alpha * 0.5);
  }
`;

const AuroraBorealis = () => {
  const meshRef = useRef();

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
      position={[0, -20, -40]} // Push deeper into the background
      rotation={[0.3, 0, 0]}   // Tilt
      scale={[600, 160, 2]}     // MASSIVE SCALE: 300 width ensures edges are gone
    >
      <planeGeometry args={[1, 1, 128, 64]} /> {/* Increased geometry resolution for smoothness */}
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