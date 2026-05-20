import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personas } from '../../../data/personas';
import { usePersonaStore } from '../../../store/personaStore';
import { useMapStore } from '../../../store/mapStore';
import type { PersonaId } from '../../../types';
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

export default function PersonaSelector() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'explore' | 'follow' | null>(null);
  const activatePersona = usePersonaStore((s) => s.activatePersona);
  const queueMapCommand = useMapStore((s) => s.queueMapCommand);

  const handleSelect = (id: PersonaId) => {
    activatePersona(id);
  };

  return (
    <>
      {/* Non-blocking banner — map is always visible behind this */}
      <AnimatePresence>
        {!showPicker && (
          <motion.div
            key="banner"
            className={styles.selectorBanner}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, delay: 0.4 }}
          >
            <span className={styles.bannerText}>How would you like to explore?</span>
            <button
              type="button"
              className={selectedMode === 'follow' ? styles.bannerBtnActive : styles.bannerBtn}
              onClick={() => {
                setSelectedMode('follow');
                setShowPicker(true);
              }}
            >
              Follow a perspective
            </button>
            <button
              type="button"
              className={selectedMode === 'explore' ? styles.bannerBtnActive : styles.bannerBtn}
              onClick={() => {
                setSelectedMode('explore');
                queueMapCommand({ type: 'zoomToOverview', duration: 500 });
              }}
            >
              Explore freely
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persona picker — slides up from bottom */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            className={styles.selectorOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => { setShowPicker(false); setSelectedMode(null); }}
          >
            <motion.div
              className={styles.selectorCard}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            >
              <div className={styles.selectorCardHeader}>
                <h2 className={styles.selectorHeading}>Choose a perspective to follow</h2>
                <button type="button" className="btn-close" onClick={() => { setShowPicker(false); setSelectedMode(null); }} aria-label="Close">✕</button>
              </div>
              <p className={styles.selectorSubtext}>
                Each perspective is a guided path through the same map. You can explore freely at any time.
              </p>
              <div className={styles.personaGrid}>
                {personas.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={styles.personaCard}
                    onClick={() => handleSelect(p.id)}
                  >
                    <img src={PERSONA_IMAGES[p.id]} alt={p.name} className={styles.personaAvatar} />
                    <div className={styles.personaInfo}>
                      <div className={styles.personaHeader}>
                        <span className={styles.personaName}>{p.name}</span>
                        <span className={styles.personaBio}>{p.bio}</span>
                      </div>
                      <div className={styles.personaDesc}>{p.shortDescription}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.freeBtn} onClick={() => { setShowPicker(false); setSelectedMode(null); }}>
                ← Back to map
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
