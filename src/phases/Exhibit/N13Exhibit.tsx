import { motion } from 'framer-motion';
import videoSrc from '../../assets/MSB.psilocybin.mp4';
import styles from './N13Exhibit.module.css';

interface Props {
  onBack: () => void;
}

export default function N13Exhibit({ onBack }: Props) {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to atlas
      </button>

      <div className={styles.scene}>
        <video
          className={styles.video}
          src={videoSrc}
          controls
          autoPlay
          playsInline
        />
      </div>
    </motion.div>
  );
}
