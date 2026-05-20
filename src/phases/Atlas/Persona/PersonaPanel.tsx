import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePersonaStore } from '../../../store/personaStore';
import { useMapStore } from '../../../store/mapStore';
import { useSessionStore } from '../../../store/sessionStore';
import { personas } from '../../../data/personas';
import styles from './Persona.module.css';
import robertImg from '../../../assets/persona_robert.png';
import isabelImg from '../../../assets/persona_isabel.png';
import zoeImg from '../../../assets/persona_zoe.png';
import jordanImg from '../../../assets/persona_jordan.png';
import cristinaImg from '../../../assets/persona_cristina.png';

const PERSONA_IMAGES: Record<string, string> = {
  robert: robertImg,
  isabel: isabelImg,
  zoe: zoeImg,
  jordan: jordanImg,
  cristina: cristinaImg,
};

export default function PersonaPanel() {
  const isPersonaModeActive = usePersonaStore((s) => s.isPersonaModeActive);
  const activePersonaId = usePersonaStore((s) => s.activePersonaId);
  const currentBeatIndex = usePersonaStore((s) => s.currentBeatIndex);
  const advanceBeat = usePersonaStore((s) => s.advanceBeat);
  const retreatBeat = usePersonaStore((s) => s.retreatBeat);
  const deactivatePersona = usePersonaStore((s) => s.deactivatePersona);

  const queueMapCommand = useMapStore((s) => s.queueMapCommand);
  const setPendingHover = useMapStore((s) => s.setPendingHover);
  const setPinnedPreview = useMapStore((s) => s.setPinnedPreview);
  const setHighlightedNode = useMapStore((s) => s.setHighlightedNode);
  const setPhase = useSessionStore((s) => s.setPhase);

  const persona = personas.find((p) => p.id === activePersonaId);
  const beat = persona?.beats[currentBeatIndex];
  const isLastBeat = persona ? currentBeatIndex >= persona.beats.length - 1 : false;

  // On beat change: zoom to target node, highlight it, and queue hover preview
  useEffect(() => {
    setHighlightedNode(beat?.targetNodeId ?? null);
    if (!beat?.targetNodeId) return;
    queueMapCommand({ type: 'zoomToNode', nodeId: beat.targetNodeId, duration: 800 });
    setPendingHover(beat.targetNodeId);
    return () => setHighlightedNode(null);
  }, [currentBeatIndex, beat?.targetNodeId]);

  if (!isPersonaModeActive || !persona || !beat) return null;

  const handlePrevious = () => {
    setPinnedPreview(null);
    retreatBeat();
  };

  const handleContinue = () => {
    setPinnedPreview(null);
    if (isLastBeat) {
      setPhase('reflection');
      return;
    }
    advanceBeat();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.personaLabel}>Following perspective</div>
        <img src={PERSONA_IMAGES[persona.id]} alt={persona.name} className={styles.panelAvatar} />
        <div className={styles.personaTitle}>{persona.name}</div>
        <div className={styles.arcLabel}>{persona.arcSummary}</div>
        {persona.bio && <div className={styles.bioLabel}>{persona.bio}</div>}
      </div>

      <div className={styles.progress}>
        {persona.beats.map((_, i) => (
          <div
            key={i}
            className={`${styles.progressDot} ${i < currentBeatIndex ? styles.done : ''} ${i === currentBeatIndex ? styles.current : ''}`}
          />
        ))}
      </div>

      <div className={styles.beatScroll}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBeatIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.emotionalLabel}>{beat.emotionalLabel}</div>
            <p className={styles.beatText}>{beat.storyText}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.beatActions}>
        <div className={styles.beatNav}>
          {currentBeatIndex > 0 && (
            <button type="button" className={styles.prevBtn} onClick={handlePrevious}>
              ← Previous
            </button>
          )}
          <button type="button" className={styles.continueBtn} onClick={handleContinue}>
            {isLastBeat ? 'Reach the reflection →' : beat.continueLabel}
          </button>
        </div>
        <button type="button" className={styles.exitBtn} onClick={() => { setPinnedPreview(null); deactivatePersona(); }}>
          Exit guided mode
        </button>
      </div>
    </div>
  );
}
