import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSessionStore } from '../../../store/sessionStore';
import { useMapStore } from '../../../store/mapStore';
import { usePersonaStore } from '../../../store/personaStore';
import styles from './Reflection.module.css';

export default function EndReflection() {
  const initialWord = useSessionStore((s) => s.initialWord);
  const setEndWord = useSessionStore((s) => s.setEndWord);
  const setPhase = useSessionStore((s) => s.setPhase);
  const queueMapCommand = useMapStore((s) => s.queueMapCommand);
  const deactivatePersona = usePersonaStore((s) => s.deactivatePersona);
  const [word, setWord] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!word.trim()) return;
    setEndWord(word.trim());
    setSubmitted(true);
  };

  const handleRevisit = () => {
    deactivatePersona();
    setPhase('atlas');
    queueMapCommand({ type: 'zoomToOverview' });
  };

  return (
    <motion.div
      className={styles.endContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.endCard}>
        {!submitted ? (
          <>
            <h2 className={styles.endHeading}>What word comes to mind now?</h2>
            <div className={styles.wordComparison}>
              <div className={styles.wordBlock}>
                <div className={styles.wordBlockLabel}>You started with</div>
                <div className={styles.wordBlockWord}>{initialWord}</div>
              </div>
              <div className={styles.wordBlock}>
                <div className={styles.wordBlockLabel}>You're ending with</div>
                <input
                  className={styles.wordInput}
                  type="text"
                  placeholder="My word now..."
                  value={word}
                  autoFocus
                  onChange={(e) => setWord(e.target.value.replace(/\s.*/, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  maxLength={32}
                />
              </div>
            </div>
            <div className={styles.endActions}>
              <button className={styles.revisitBtn} onClick={handleSubmit} disabled={!word.trim()}>
                See the comparison
              </button>
              <button className={styles.revisitBtn} onClick={handleRevisit}>
                Back to the atlas
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.endHeading}>You mapped a shift.</h2>
            <div className={styles.wordComparison}>
              <div className={styles.wordBlock}>
                <div className={styles.wordBlockLabel}>Before</div>
                <div className={styles.wordBlockWord}>{initialWord}</div>
              </div>
              <div className={styles.wordBlock}>
                <div className={styles.wordBlockLabel}>After</div>
                <div className={styles.wordBlockWord}>{word}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Whether your word changed or stayed the same — that's information. The atlas remains open.
            </p>
            <div className={styles.endActions}>
              <button className={styles.revisitBtn} onClick={handleRevisit}>
                Back to the atlas
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
