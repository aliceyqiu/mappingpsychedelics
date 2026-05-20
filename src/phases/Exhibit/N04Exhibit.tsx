import React, { useState } from 'react';
import { motion } from 'framer-motion';
import noToadBg from '../../assets/nature_walk_no_toad.png';
import toadBg from '../../assets/nature_walk_toad.png';
import styles from './Exhibit.module.css';

export default function N04Exhibit({ onBack }: { onBack: () => void }) {
  const [showToad, setShowToad] = useState(false);

  return (
    <motion.div
      className={`${styles.page} ${styles.pageBg}`}
      style={{ '--page-bg-url': `url(${showToad ? toadBg : noToadBg})` } as React.CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to atlas
      </button>
      {!showToad && (
        <div
          className={styles.hotspot}
          onClick={() => setShowToad(true)}
        />
      )}
    </motion.div>
  );
}
