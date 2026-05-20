import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSessionStore } from '../../store/sessionStore';
import styles from './Onboarding.module.css';

const variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const BG_PER_STEP = {
  1: { scale: 1.0, opacity: 0.5 },
  2: { scale: 1.15, opacity: 0.5 },
};

export default function Onboarding() {
  const [step, setStep] = useState<1 | 2>(1);
  const [word, setWord] = useState('');

  const setInitialWord = useSessionStore((s) => s.setInitialWord);
  const setPhase = useSessionStore((s) => s.setPhase);
  const reset = useSessionStore((s) => s.reset);

  const handleWordSubmit = () => {
    if (!word.trim()) return;
    setInitialWord(word.trim());
    setStep(2);
  };

  const handleEnter = () => {
    reset();
    setInitialWord(word.trim());
    setPhase('atlas');
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.bgImage}
        animate={BG_PER_STEP[step]}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      <div className={styles.card}>
        <div className={styles.dots}>
          {([1, 2] as const).map((n) => (
            <div key={n} className={`${styles.dot} ${step >= n ? styles.active : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              className={styles.step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className={styles.label}>Before we begin</div>
              <div className={styles.prompt}>
                What word comes to mind when you think of psychedelics?
              </div>
              <input
                className={styles.input}
                type="text"
                placeholder="Type word here..."
                value={word}
                autoFocus
                onChange={(e) => setWord(e.target.value.replace(/\s.*/, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleWordSubmit()}
                maxLength={32}
              />
              <div className={styles.hint}>Press Enter or Next</div>
              <button
                type="button"
                className={styles.continueBtn}
                disabled={!word.trim()}
                onClick={handleWordSubmit}
              >
                Next →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              className={styles.step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className={styles.label}>A note on what follows</div>
              <div className={styles.prompt}>
                There are two ways in.
              </div>
              <div className={styles.framingMessage}>
                Explore the Atlas freely — moving between continents however feels right — or follow one of five guided paths, each shaped by a different perspective on psychedelics. Either way, you can always change course.
              </div>
              <button type="button" className={styles.enterBtn} onClick={handleEnter}>
                Enter the Atlas →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
