import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useMapStore } from '../../../store/mapStore';
import { continents } from '../../../data/continents';
import { nodes } from '../../../data/nodes';
import styles from './HoverPreview.module.css';

function boldPrefix(title: string): React.ReactNode {
  const prefixes = ['Learn More:', 'Did you know...'];
  for (const prefix of prefixes) {
    if (title.startsWith(prefix)) {
      return <><strong>{prefix}</strong>{title.slice(prefix.length)}</>;
    }
  }
  return title;
}

export default function HoverPreview() {
  const hoveredContinentId = useMapStore((s) => s.hoveredContinentId);
  const hoveredNodeId = useMapStore((s) => s.hoveredNodeId);
  const pinnedPreviewNodeId = useMapStore((s) => s.pinnedPreviewNodeId);
  const pinnedPreviewScreenPos = useMapStore((s) => s.pinnedPreviewScreenPos);
  const setActiveNode = useMapStore((s) => s.setActiveNode);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const activeContinent = hoveredContinentId
    ? continents.find((c) => c.id === hoveredContinentId)
    : null;
  const hoveredNode = hoveredNodeId ? nodes.find((n) => n.id === hoveredNodeId) : null;
  const pinnedNode = (!hoveredNode && pinnedPreviewNodeId)
    ? nodes.find((n) => n.id === pinnedPreviewNodeId)
    : null;
  const activeNode = hoveredNode ?? pinnedNode;
  const isPinned = !hoveredNode && !!pinnedNode;
  const showExplore = activeNode?.nodeType === 'immersive' || activeNode?.nodeType === 'standard';

  if (!activeContinent && !activeNode) return null;

  const OFFSET_X = 16;
  const OFFSET_Y = -8;
  const style = isPinned && pinnedPreviewScreenPos
    ? { left: pinnedPreviewScreenPos.x, top: pinnedPreviewScreenPos.y }
    : { left: mousePos.x + OFFSET_X, top: mousePos.y + OFFSET_Y };

  const portal = document.getElementById('tooltip-root');
  if (!portal) return null;

  const handlePinnedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pinnedNode) setActiveNode(pinnedNode.id);
  };

  return ReactDOM.createPortal(
    <div
      className={activeNode ? styles.nodeTooltip : styles.continentTooltip}
      data-continent={activeNode?.continentId ?? activeContinent?.id}
      style={isPinned ? { ...style, pointerEvents: 'auto', cursor: 'pointer' } : style}
      onClick={isPinned ? handlePinnedClick : undefined}
    >
      {activeNode ? (
        <>
          <div className={styles.nodeTitle}>{boldPrefix(activeNode.title)}</div>
          <div className={styles.nodeInsight}>{activeNode.keyInsight}</div>
          {showExplore && (
            <button
              type="button"
              className={styles.exploreBtn}
              onClick={(e) => { e.stopPropagation(); setActiveNode(activeNode.id); }}
            >
              Click to Explore →
            </button>
          )}
        </>
      ) : activeContinent ? (
        <>
          <div className={styles.continentName}>{activeContinent.label}</div>
          <div className={styles.tagline}>{activeContinent.tagline}</div>
          <div className={styles.previewNodes}>
            {activeContinent.previewNodeIds
              .map((id) => nodes.find((n) => n.id === id))
              .filter(Boolean)
              .map((n) => (
                <div key={n!.id} className={styles.previewNode}>
                  {n!.title}
                </div>
              ))}
          </div>
        </>
      ) : null}
    </div>,
    portal
  );
}
