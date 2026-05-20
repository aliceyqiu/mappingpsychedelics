import { motion } from 'framer-motion';
import { useMapStore } from '../../store/mapStore';
import { nodes } from '../../data/nodes';
import { continents } from '../../data/continents';
import N01Timeline from './N01Timeline';
import N04Exhibit from './N04Exhibit';
import N08Exhibit from './N08Exhibit';
import N13Exhibit from './N13Exhibit';
import N17Exhibit from './N17Exhibit';
import styles from './Exhibit.module.css';

export default function ExhibitPage() {
  const exhibitNodeId = useMapStore((s) => s.exhibitNodeId);
  const exitExhibit = useMapStore((s) => s.exitExhibit);

  const node = exhibitNodeId ? nodes.find((n) => n.id === exhibitNodeId) : null;
  const continent = node ? continents.find((c) => c.id === node.continentId) : null;

  if (!node || !continent) return null;

  if (node.id === 'n04') {
    return <N04Exhibit onBack={exitExhibit} />;
  }

  if (node.id === 'n08') {
    return <N08Exhibit onBack={exitExhibit} />;
  }

  if (node.id === 'n13') {
    return <N13Exhibit onBack={exitExhibit} />;
  }

  if (node.id === 'n17') {
    return <N17Exhibit onBack={exitExhibit} />;
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button type="button" className={styles.backBtn} onClick={exitExhibit}>
        ← Back to atlas
      </button>

      <div className={`${styles.content} ${node.id === 'n01' ? styles.contentWide : ''}`}>
        <div className={styles.eyebrow}>{continent.label}</div>
        <h1 className={styles.title}>{node.title}</h1>
        <p className={styles.keyInsight}>{node.keyInsight}</p>

        {node.id === 'n01' ? (
          <N01Timeline />
        ) : node.interaction.type === 'scroll-narrative' ? (
          <div className={styles.paragraphs}>
            {node.interaction.paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
