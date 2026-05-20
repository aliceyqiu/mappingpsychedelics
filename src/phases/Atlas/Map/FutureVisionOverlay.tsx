import { AnimatePresence, motion } from 'framer-motion';
import styles from './FutureVisionOverlay.module.css';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function FutureVisionOverlay({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.card}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.heading}>Our Vision for the Future</h2>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className={styles.body}>
              <p>In this future, it starts with a word.</p>
              <p>Learning about psychedelics doesn't feel overwhelming or out of reach. It unfolds gradually — through stories, research, and different perspectives you can explore at your own pace. You start to see not just what psychedelics are, but how people understand and use them in different contexts.</p>
              <p>For many, clinical research is where things begin. It helps make the topic feel more familiar. But it's not the whole picture. As people explore further, they also encounter the broader context—where these substances come from, how they've been used across cultures, and how that knowledge continues to shape understanding today.</p>
              <p>In this future, that awareness also leads to a deeper recognition of where this knowledge comes from. Psychedelics are understood not just as compounds, but as part of living systems and traditions that have been carried forward by Indigenous communities for generations. In this future, those communities are not referenced from a distance. They are present, shaping the conversation, guiding how knowledge is shared, and participating in how benefits flow back.</p>
              <p>What emerges from the Psychedelic Atlas isn't a single conclusion, it's a clearer way of seeing, one that gives people more context, more support, and more confidence in deciding what matters to them.</p>
              <p>Our hope is that this project becomes a starting point for that shift. A place where whatever word first came to mind can evolve into something more informed, more connected, and a little less uncertain.</p>
              <p>Because sometimes, that’s where change begins. With a word.</p>
            </div>

            <div className={styles.footer}>
              <button type="button" className={styles.returnBtn} onClick={onClose}>
                Return to map
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
