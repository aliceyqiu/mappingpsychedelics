import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls, useGLTF, Html } from '@react-three/drei';
import styles from './GardenScene.module.css';
import * as THREE from 'three';
import { useMapStore } from '../../../store/mapStore';
import catUrl from '../../../assets/cat.glb?url';

// ── Player movement ─────────────────────────────────────────────────────────

function PlayerMovement() {
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const dn = (e: KeyboardEvent) => keys.current.add(e.code);
    const up = (e: KeyboardEvent) => keys.current.delete(e.code);
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', dn);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    const speed = 4;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));

    if (keys.current.has('KeyW')) camera.position.addScaledVector(dir, speed * delta);
    if (keys.current.has('KeyS')) camera.position.addScaledVector(dir, -speed * delta);
    if (keys.current.has('KeyA')) camera.position.addScaledVector(right, -speed * delta);
    if (keys.current.has('KeyD')) camera.position.addScaledVector(right, speed * delta);

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -12, 12);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -12, 12);
    camera.position.y = 1.6;
  });

  return null;
}

// ── Garden elements ──────────────────────────────────────────────────────────

function Bamboo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 4, 8]} />
        <meshStandardMaterial color="#2d5a1b" />
      </mesh>
      <mesh position={[0.3, 2.5, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 3.5, 8]} />
        <meshStandardMaterial color="#3a6b22" />
      </mesh>
      <mesh position={[-0.2, 1.8, -0.1]}>
        <cylinderGeometry args={[0.055, 0.055, 3.8, 8]} />
        <meshStandardMaterial color="#2a5018" />
      </mesh>
    </group>
  );
}

function CherryTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 2, 8]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshStandardMaterial color="#f4a0c0" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function ToriiGate({ position }: { position: [number, number, number] }) {
  const color = '#cc4422';
  return (
    <group position={position}>
      {/* Left pillar */}
      <mesh position={[-1.6, 1.5, 0]}>
        <boxGeometry args={[0.28, 3, 0.28]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[1.6, 1.5, 0]}>
        <boxGeometry args={[0.28, 3, 0.28]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Top beam (slightly curved look) */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[4.2, 0.28, 0.28]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Secondary beam */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[3.6, 0.2, 0.22]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function StoneLantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.45, 0.3, 0.45]} />
        <meshStandardMaterial color="#888880" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.4, 8]} />
        <meshStandardMaterial color="#7a7a72" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial color="#848478" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#7c7c74" />
      </mesh>
      <mesh position={[0, 1.36, 0]}>
        <coneGeometry args={[0.28, 0.3, 8]} />
        <meshStandardMaterial color="#888880" />
      </mesh>
    </group>
  );
}

function KoiPond() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4, 0.02, -3]}>
        <planeGeometry args={[5, 3.5]} />
        <meshStandardMaterial color="#3a6a9a" transparent opacity={0.75} />
      </mesh>
      {/* Stones around pond */}
      {([[-2.7, 0.08, -2], [-2.4, 0.07, -4.2], [-5.5, 0.08, -2.5], [-5.2, 0.07, -3.8]] as [number,number,number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.18 + i * 0.04, 6, 6]} />
          <meshStandardMaterial color="#6a6a60" />
        </mesh>
      ))}
    </group>
  );
}

function CatInGarden() {
  const { scene } = useGLTF(catUrl);
  const ref = useRef<THREE.Group>(null);
  const [meowing, setMeowing] = useState(false);

  useFrame((_, delta) => {
    if (!meowing && ref.current) ref.current.rotation.y += delta * 0.6;
  });

  return (
    <group
      ref={ref}
      position={[2.5, 0, -2]}
      scale={3}
      onClick={(e) => { e.stopPropagation(); setMeowing((v) => !v); }}
    >
      <primitive object={scene} />
      {meowing && (
        <Html position={[0, 0.55, 0]} center style={{ pointerEvents: 'none', transform: 'translateY(-40px)' }}>
          <div className={styles.speechBubble}>
            meowwww
            <span className={styles.speechBubbleTail} />
          </div>
        </Html>
      )}
    </group>
  );
}

function Garden() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#a8b898" />
      </mesh>

      {/* Raked gravel area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#c8bfa0" />
      </mesh>

      {/* Moss boulders */}
      {([[3.5, 0.3, 3], [-5, 0.4, 2], [6, 0.25, -6], [-3, 0.35, -7]] as [number,number,number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.35 + i * 0.08, 8, 8]} />
          <meshStandardMaterial color="#7a8870" />
        </mesh>
      ))}

      <KoiPond />

      <Bamboo position={[-7, 0, -4]} />
      <Bamboo position={[7, 0, -6]} />
      <Bamboo position={[-8, 0, 4]} />

      <CherryTree position={[5, 0, -6]} />

      <ToriiGate position={[0, 0, 9]} />

      <StoneLantern position={[-2, 0, -1.5]} />
      <StoneLantern position={[2, 0, -1.5]} />

      {/* Cylindrical walls */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[15, 15, 16, 48, 1, true]} />
        <meshStandardMaterial color="#a8d4f0" side={THREE.DoubleSide} />
      </mesh>
      {/* Dome cap converging at top */}
      <mesh position={[0, 16, 0]}>
        <sphereGeometry args={[15, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#a8d4f0" side={THREE.DoubleSide} />
      </mesh>

      <CatInGarden />
    </group>
  );
}

useGLTF.preload(catUrl);

// ── Scene root ───────────────────────────────────────────────────────────────

export default function GardenScene() {
  const closeGarden = useMapStore((s) => s.closeGarden);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.pointerLockElement === null) {
        closeGarden();
      }
    };
    const onLockChange = () => setIsLocked(document.pointerLockElement !== null);
    window.addEventListener('keydown', handleKey);
    document.addEventListener('pointerlockchange', onLockChange);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerlockchange', onLockChange);
    };
  }, [closeGarden]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000' }}>
      <Canvas camera={{ position: [0, 1.6, 8], fov: 75 }} shadows>
        <fog attach="fog" args={['#c8d8c0', 18, 45]} />
        <color attach="background" args={['#c8e0b8']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 8]} intensity={1.2} castShadow />
        <PointerLockControls />
        <PlayerMovement />
        <Garden />
      </Canvas>

      {/* HUD */}
      <button
        type="button"
        className={styles.backBtn}
        onClick={closeGarden}
      >
        ← Back to atlas
      </button>

      {isLocked && <div className={styles.reticle} />}

      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 255, 255,0.3)',
          borderRadius: '999px',
          color: 'rgba(232, 232, 240, 0.8)',
          fontSize: '0.82rem',
          letterSpacing: '0.07em',
          padding: '0.5rem 1.4rem',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Click to look around · WASD to move · Esc to release cursor
      </div>
    </div>
  );
}
