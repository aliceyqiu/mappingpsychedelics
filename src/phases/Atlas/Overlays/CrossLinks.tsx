import type { CrossLink } from '../../../types';
import { useMapStore } from '../../../store/mapStore';
import { nodes } from '../../../data/nodes';
import styles from './Overlay.module.css';

interface Props {
  crossLinks: CrossLink[];
}

export default function CrossLinks({ crossLinks }: Props) {
  const queueMapCommand = useMapStore((s) => s.queueMapCommand);
  const setActiveNode = useMapStore((s) => s.setActiveNode);

  if (!crossLinks.length) return null;

  const handleCrossLink = (targetNodeId: string) => {
    // Close current overlay, zoom to target, open target overlay after zoom
    setActiveNode(null);
    queueMapCommand({
      type: 'zoomToNode',
      nodeId: targetNodeId,
      duration: 850,
      pendingOverlayNodeId: targetNodeId,
    });
  };

  return (
    <div className={styles.crossLinks}>
      <div className={styles.crossLinksHeading}>This connects to…</div>
      {crossLinks.map((link) => {
        const target = nodes.find((n) => n.id === link.targetNodeId);
        if (!target) return null;
        return (
          <button
            type="button"
            key={link.targetNodeId}
            className={styles.crossLinkBtn}
            onClick={() => handleCrossLink(link.targetNodeId)}
          >
            <span>{link.relationshipLabel}</span>
            <span className={styles.crossLinkArrow}>→</span>
          </button>
        );
      })}
    </div>
  );
}
