import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls, Text, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import blackboardUrl from '../../assets/blackboard.png';
import mariaSabinaUrl from '../../assets/maria_sabina.png';
import bicycleDayUrl from '../../assets/bicycle_day.png';
import styles from './N17Exhibit.module.css';

// ── Player movement ──────────────────────────────────────────────────────────

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
    const speed = 3.5;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));

    if (keys.current.has('KeyW')) camera.position.addScaledVector(dir, speed * delta);
    if (keys.current.has('KeyS')) camera.position.addScaledVector(dir, -speed * delta);
    if (keys.current.has('KeyA')) camera.position.addScaledVector(right, -speed * delta);
    if (keys.current.has('KeyD')) camera.position.addScaledVector(right, speed * delta);

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -5.5, 5.5);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -5.5, 5.5);
    camera.position.y = 1.6;
  });

  return null;
}

// ── Lab elements ─────────────────────────────────────────────────────────────

function LabBench() {
  return (
    <group position={[0, 0, -2.8]}>
      {/* Bench body */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[4.6, 0.9, 0.8]} />
        <meshStandardMaterial color="#5c4a3a" />
      </mesh>
      {/* Countertop */}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[4.65, 0.06, 0.85]} />
        <meshStandardMaterial color="#ddd8ce" />
      </mesh>
      {/* Legs */}
      {([-2.1, 2.1] as number[]).map((x) => (
        <mesh key={x} position={[x, -0.2, 0]}>
          <boxGeometry args={[0.1, 0.8, 0.7]} />
          <meshStandardMaterial color="#4a3a2c" />
        </mesh>
      ))}
      {/* Erlenmeyer flask: body cone + neck cylinder */}
      <group position={[-1.2, 1.0, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <coneGeometry args={[0.22, 0.36, 8]} />
          <meshStandardMaterial color="#c8a840" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 8]} />
          <meshStandardMaterial color="#c8a840" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.22, 8]} />
          <meshStandardMaterial color="#c8a840" transparent opacity={0.65} />
        </mesh>
      </group>
      {/* Round-bottom flask */}
      <group position={[-0.5, 1.0, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.16, 10, 10]} />
          <meshStandardMaterial color="#7ab8e0" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.18, 8]} />
          <meshStandardMaterial color="#7ab8e0" transparent opacity={0.6} />
        </mesh>
      </group>
      {/* Test tube rack */}
      <group position={[0.6, 0.96, 0]}>
        <mesh>
          <boxGeometry args={[0.55, 0.06, 0.2]} />
          <meshStandardMaterial color="#888880" />
        </mesh>
        {([-0.2, -0.1, 0, 0.1, 0.2] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0]}>
            <cylinderGeometry args={[0.035, 0.03, 0.3, 8]} />
            <meshStandardMaterial
              color={['#88d4b0', '#f0d888', '#e88878', '#88a8e8', '#c888d8'][i]}
              transparent opacity={0.75}
            />
          </mesh>
        ))}
      </group>
      {/* Notebook */}
      <mesh position={[1.4, 0.96, 0.05]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.45, 0.03, 0.36]} />
        <meshStandardMaterial color="#f0ece0" />
      </mesh>
      <mesh position={[1.4, 0.975, 0.05]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.45, 0.005, 0.36]} />
        <meshStandardMaterial color="#d8d4c8" />
      </mesh>
      {/* Name plaque */}
      <mesh position={[0, 0.97, 0.38]}>
        <boxGeometry args={[0.9, 0.07, 0.1]} />
        <meshStandardMaterial color="#b8943c" />
      </mesh>
      <Text
        position={[0, 0.97, 0.34]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.055}
        color="#2a1a0a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        Dr. Albert Hofmann
      </Text>
    </group>
  );
}

function Stool() {
  return (
    <group position={[0, 0, -1.4]}>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 12]} />
        <meshStandardMaterial color="#8a7060" />
      </mesh>
      {([[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.68, 6]} />
          <meshStandardMaterial color="#6a5848" />
        </mesh>
      ))}
    </group>
  );
}

function Bookshelf() {
  const bookColors = ['#8a4a2a', '#2a5a8a', '#2a7a4a', '#8a7a2a', '#6a2a6a', '#4a6a2a', '#8a3a3a', '#3a5a7a'];
  return (
    <group position={[5.45, 0, -1]}>
      {/* Frame */}
      <mesh position={[-0.06, 1.5, 0]}>
        <boxGeometry args={[0.12, 3.0, 1.4]} />
        <meshStandardMaterial color="#7a6050" />
      </mesh>
      <mesh position={[0, 1.5, 0.64]}>
        <boxGeometry args={[0.28, 3.0, 0.12]} />
        <meshStandardMaterial color="#7a6050" />
      </mesh>
      <mesh position={[0, 1.5, -0.64]}>
        <boxGeometry args={[0.28, 3.0, 0.12]} />
        <meshStandardMaterial color="#7a6050" />
      </mesh>
      {/* Shelves */}
      {[0.3, 1.1, 1.9, 2.7].map((y, si) => (
        <mesh key={si} position={[0, y, 0]}>
          <boxGeometry args={[0.24, 0.06, 1.3]} />
          <meshStandardMaterial color="#8a7060" />
        </mesh>
      ))}
      {/* Books on shelves */}
      {[0.45, 1.25, 2.05].map((y, row) =>
        [-0.42, -0.24, -0.06, 0.12, 0.3, 0.48].map((z, col) => (
          <mesh key={`${row}-${col}`} position={[0, y + 0.12, z]} rotation={[0, 0, (Math.random() - 0.5) * 0.08]}>
            <boxGeometry args={[0.18, 0.26, 0.13]} />
            <meshStandardMaterial color={bookColors[(row * 6 + col) % bookColors.length]} />
          </mesh>
        ))
      )}
    </group>
  );
}

function HofmannFigure({ onActivate }: { onActivate: () => void }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(Date.now() * 0.0003) * 0.04;
    }
  });

  const skin = '#e8c4a0';
  const coat = '#f0f0ec';
  const pants = '#2c2c48';
  const hair = '#d4d0c8';
  const gold = '#c8a840';

  return (
    <group
      ref={ref}
      position={[0, 0, -3.6]}
      onClick={(e) => { e.stopPropagation(); onActivate(); }}
    >
      {/* Legs */}
      <mesh position={[-0.18, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 1.0, 8]} />
        <meshStandardMaterial color={pants} />
      </mesh>
      <mesh position={[0.18, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 1.0, 8]} />
        <meshStandardMaterial color={pants} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.18, 0.04, 0.06]}>
        <boxGeometry args={[0.16, 0.08, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.18, 0.04, 0.06]}>
        <boxGeometry args={[0.16, 0.08, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Lab coat torso */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.72, 0.8, 0.36]} />
        <meshStandardMaterial color={coat} />
      </mesh>
      {/* Collar / shirt visible */}
      <mesh position={[0, 1.7, 0.16]}>
        <boxGeometry args={[0.22, 0.12, 0.04]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
      {/* Tie */}
      <mesh position={[0, 1.55, 0.17]}>
        <boxGeometry args={[0.07, 0.3, 0.03]} />
        <meshStandardMaterial color="#4a3a6a" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.46, 1.3, 0]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.1, 0.09, 0.7, 8]} />
        <meshStandardMaterial color={coat} />
      </mesh>
      <mesh position={[0.46, 1.3, 0]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.1, 0.09, 0.7, 8]} />
        <meshStandardMaterial color={coat} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.5, 0.93, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      <mesh position={[0.5, 0.93, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.18, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 2.06, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Hair cap (white/gray, older Hofmann) */}
      <mesh position={[0, 2.22, 0]}>
        <sphereGeometry args={[0.225, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={hair} />
      </mesh>
      {/* Glasses — left lens */}
      <mesh position={[-0.1, 2.07, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.012, 6, 12]} />
        <meshStandardMaterial color={gold} />
      </mesh>
      {/* Glasses — right lens */}
      <mesh position={[0.1, 2.07, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.012, 6, 12]} />
        <meshStandardMaterial color={gold} />
      </mesh>
      {/* Glasses bridge */}
      <mesh position={[0, 2.07, 0.21]}>
        <boxGeometry args={[0.06, 0.012, 0.012]} />
        <meshStandardMaterial color={gold} />
      </mesh>
    </group>
  );
}

function FramedPainting({ textureUrl, position, rotation, width, height }: {
  textureUrl: string;
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
}) {
  const texture = useTexture(textureUrl);
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[width + 0.18, height + 0.18, 0.06]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

function Chalkboard() {
  const texture = useTexture(blackboardUrl);
  return (
    <group position={[0, 2.4, -5.92]}>
      {/* Board surface */}
      <mesh>
        <boxGeometry args={[4.4, 1.8, 0.06]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Wooden frame — top */}
      <mesh position={[0, 0.96, 0.04]}>
        <boxGeometry args={[4.56, 0.1, 0.08]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* bottom */}
      <mesh position={[0, -0.96, 0.04]}>
        <boxGeometry args={[4.56, 0.1, 0.08]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* left */}
      <mesh position={[-2.25, 0, 0.04]}>
        <boxGeometry args={[0.1, 1.8, 0.08]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* right */}
      <mesh position={[2.25, 0, 0.04]}>
        <boxGeometry args={[0.1, 1.8, 0.08]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* Chalk tray */}
      <mesh position={[0, -1.02, 0.12]}>
        <boxGeometry args={[4.4, 0.06, 0.14]} />
        <meshStandardMaterial color="#b8a88a" />
      </mesh>
    </group>
  );
}

function LabRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#cdc8bc" />
      </mesh>
      {/* Tile grid overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#bab4a8" wireframe />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.2, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0eeea" side={THREE.DoubleSide} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.1, -6]}>
        <boxGeometry args={[12, 4.2, 0.12]} />
        <meshStandardMaterial color="#f0ede6" />
      </mesh>
      {/* Front wall */}
      <mesh position={[0, 2.1, 6]}>
        <boxGeometry args={[12, 4.2, 0.12]} />
        <meshStandardMaterial color="#ecebe4" />
      </mesh>
      {/* Left wall */}
      <mesh position={[-6, 2.1, 0]}>
        <boxGeometry args={[0.12, 4.2, 12]} />
        <meshStandardMaterial color="#edeae3" />
      </mesh>
      {/* Right wall */}
      <mesh position={[6, 2.1, 0]}>
        <boxGeometry args={[0.12, 4.2, 12]} />
        <meshStandardMaterial color="#edeae3" />
      </mesh>
      <Chalkboard />
      {/* Baseboard trim around room */}
      <mesh position={[0, 0.06, -5.95]}>
        <boxGeometry args={[12, 0.12, 0.08]} />
        <meshStandardMaterial color="#ddd8cc" />
      </mesh>
      <mesh position={[0, 0.06, 5.95]}>
        <boxGeometry args={[12, 0.12, 0.08]} />
        <meshStandardMaterial color="#ddd8cc" />
      </mesh>
    </group>
  );
}

// ── Dialogue data ─────────────────────────────────────────────────────────────

const DIALOGUE: { q: string; a: string }[] = [
  {
    q: 'How did you discover LSD?',
    a: 'I first synthesized LSD-25 in 1938 as part of a systematic program at Sandoz, searching for medically useful compounds derived from ergot fungus. It was only five years later, in April 1943, that I accidentally absorbed a small amount and experienced its effects. I then deliberately ingested 250 micrograms to confirm my suspicions — a dose I later understood to be far too large.',
  },
  {
    q: 'Was the bicycle ride intentional?',
    a: 'Not at all. On April 19, 1943, I had to stop work in my laboratory mid-experiment and ride my bicycle home — Switzerland had wartime restrictions on automobiles. As I pedaled, the effects of the LSD intensified dramatically. That day is now remembered as "Bicycle Day." It was unplanned, but in retrospect, it gave the discovery a certain poetry.',
  },
  {
    q: 'Do you think LSD is dangerous?',
    a: 'Any powerful substance is dangerous without proper preparation and context. LSD is a tool — one of the most powerful instruments for altering consciousness that humanity has ever encountered. Used carelessly or recreationally without guidance, it can be destabilizing. But used with intention, in the right setting, with a prepared mind, it has the capacity for profound healing and insight. The danger lies not in the substance itself, but in our relationship to it.',
  },
  {
    q: 'What do you hope people understand about your work?',
    a: 'That I did not create a drug. I discovered a medicine — perhaps a sacred medicine. The tragedy of my life\'s most significant discovery is that it was taken from the medical and therapeutic context where it belongs and cast into a culture war. I hope future generations will restore it to its proper place: a tool for exploring the deepest dimensions of the human mind.',
  },
  {
    q: 'Do you have regrets?',
    a: 'My deepest regret is that LSD became a symbol of rebellion rather than a catalyst for genuine self-understanding. When Timothy Leary urged millions to "turn on, tune in, drop out," the resulting moral panic set back serious research by decades. I watched the medical promise of my discovery be squandered. And yet — I also lived to see the research resume. That gives me hope.',
  },
];

// ── Scene root ────────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

export default function N17Exhibit({ onBack }: Props) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.pointerLockElement === null) {
        if (dialogueOpen) {
          setDialogueOpen(false);
          setActiveIdx(null);
        } else {
          onBack();
        }
      }
    };
    const onLockChange = () => setIsLocked(document.pointerLockElement !== null);
    window.addEventListener('keydown', handleKey);
    document.addEventListener('pointerlockchange', onLockChange);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerlockchange', onLockChange);
    };
  }, [onBack, dialogueOpen]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000' }}>
      <Canvas camera={{ position: [0, 1.6, 4.5], fov: 72 }} shadows>
        <color attach="background" args={['#e8e4dc']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 8, 4]} intensity={1.3} castShadow />
        <pointLight position={[0, 3.5, -2.5]} intensity={0.5} color="#fff5e0" />
        <PointerLockControls />
        <PlayerMovement />
        <LabRoom />
        <LabBench />
        <Stool />
        <Bookshelf />
        <HofmannFigure onActivate={() => { setDialogueOpen(true); setActiveIdx(null); }} />
        <FramedPainting
          textureUrl={mariaSabinaUrl}
          position={[-5.88, 2.1, -1.5]}
          rotation={[0, Math.PI / 2, 0]}
          width={1.1}
          height={1.4}
        />
        <FramedPainting
          textureUrl={bicycleDayUrl}
          position={[5.88, 2.1, 1.5]}
          rotation={[0, -Math.PI / 2, 0]}
          width={1.4}
          height={1.0}
        />
      </Canvas>

      {/* Back button */}
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to atlas
      </button>

      {isLocked && <div className={styles.reticle} />}

      {/* Movement hint */}
      <div className={styles.hint}>
        Click to look around · WASD to move · Click Dr. Hofmann to speak with him
      </div>

      {/* Dialogue panel */}
      {dialogueOpen && (
        <div className={styles.dialogue}>
          <button
            type="button"
            className={styles.dialogueClose}
            onClick={() => { setDialogueOpen(false); setActiveIdx(null); }}
          >
            ✕
          </button>

          {activeIdx === null ? (
            <>
              <div className={styles.dialogueSpeaker}>Dr. Albert Hofmann</div>
              <div className={styles.dialoguePrompt}>What would you like to ask?</div>
              <div className={styles.dialogueQuestions}>
                {DIALOGUE.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.questionBtn}
                    onClick={() => setActiveIdx(i)}
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles.dialogueSpeaker}>Dr. Albert Hofmann</div>
              <div className={styles.dialogueQuestion}>{DIALOGUE[activeIdx].q}</div>
              <div className={styles.dialogueAnswer}>{DIALOGUE[activeIdx].a}</div>
              <button
                type="button"
                className={styles.backToQuestions}
                onClick={() => setActiveIdx(null)}
              >
                ← Ask another question
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
