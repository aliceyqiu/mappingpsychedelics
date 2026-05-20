import { useRef, useEffect, useState, useCallback, type ChangeEvent } from 'react';
import { continents } from '../../../data/continents';
import { PRESENT_OFFSETS, FUTURE_OFFSETS } from '../../../data/continentTimeline';
import type { ContinentId } from '../../../types';
import { nodes, getNodesByContinent } from '../../../data/nodes';
import { useMapStore } from '../../../store/mapStore';
import { useSessionStore } from '../../../store/sessionStore';
import { useMapZoom } from '../../../hooks/useMapZoom';
import ContinentFill from './ContinentFill';
import MapContinent from './MapContinent';
import HoverPreview from './HoverPreview';
import FutureVisionOverlay from './FutureVisionOverlay';
import styles from './AtlasMap.module.css';

// SVG viewBox coordinate space
const SVG_W = 1000;
const SVG_H = 620;

export default function AtlasMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [futureOverlayDismissed, setFutureOverlayDismissed] = useState(false);

  const transform = useMapStore((s) => s.transform);
  const queueMapCommand = useMapStore((s) => s.queueMapCommand);
  const exhibitNodeId = useMapStore((s) => s.exhibitNodeId);
  const visitedContinentIds = useSessionStore((s) => s.visitedContinentIds);
  const inExhibit = exhibitNodeId !== null;

  // Track container size for programmatic zoom calculations
  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize({ width, height });
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  useMapZoom(svgRef, gRef, containerSize);

  const handleBackClick = useCallback(() => {
    queueMapCommand({ type: 'zoomToOverview', duration: 500 });
  }, [queueMapCommand]);

  const handleTimelineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTimelinePosition(val);
    if (val < 1) setFutureOverlayDismissed(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {!inExhibit && transform.k > 0.8 && (
        <button type="button" className={styles.backBtn} onClick={handleBackClick}>
          Zoom out
        </button>
      )}

      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {continents.map((c) => (
            <ContinentFill
              key={c.id}
              continent={c}
              patternId={`pattern-${c.id}`}
              filterId={`filter-${c.id}`}
            />
          ))}
          <style>{`
            @keyframes nodePulse {
              0% { opacity: 0.8; r: 8; }
              60% { opacity: 0.4; r: 18; }
              100% { opacity: 0; r: 22; }
            }
          `}</style>
        </defs>

        {/* The zoomable group — D3 writes transform directly to this element */}
        <g ref={gRef}>
          {/* Cross-continent link lines — inside the zoom group so they pan/zoom with continents */}
          {nodes.flatMap((node) =>
            node.crossLinks.map((link) => {
              const target = nodes.find((n) => n.id === link.targetNodeId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${link.targetNodeId}`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={target.position.x}
                  y2={target.position.y}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="0.8"
                  strokeDasharray="3,6"
                  pointerEvents="none"
                  opacity={Math.max(0, 1 - timelinePosition * 3)}
                />
              );
            })
          )}

          {continents.map((continent) => (
            <MapContinent
              key={continent.id}
              continent={continent}
              continentNodes={getNodesByContinent(continent.id)}
              patternId={`pattern-${continent.id}`}
              filterId={`filter-${continent.id}`}
              svgScale={Math.max(0.1, transform.k)}
              timelinePosition={timelinePosition}
            />
          ))}

          {/* Labels rendered after all continent bodies so they always sit on top */}
          {continents.map((continent) => {
            const { cx, cy } = continent.position;
            const zero = { dx: 0, dy: 0, rotation: 0 };
            const p = PRESENT_OFFSETS[continent.id as ContinentId] ?? zero;
            const f = FUTURE_OFFSETS[continent.id as ContinentId] ?? zero;
            const dx = p.dx + (f.dx - p.dx) * timelinePosition;
            const dy = p.dy + (f.dy - p.dy) * timelinePosition;
            const k = Math.max(0.1, transform.k);
            return (
              <text
                key={`label-${continent.id}`}
                className="continent-label"
                data-label-size="13"
                data-base-ls="0.5"
                x={cx + dx}
                y={cy + dy}
                fontSize={13 / k}
                letterSpacing={0.5 / k}
                pointerEvents="none"
              >
                {continent.label}
              </text>
            );
          })}
        </g>
      </svg>

      {!inExhibit && <HoverPreview />}

      {!inExhibit && (
        <div className={styles.timelineBar}>
          <span className={styles.timelineLabel}>Present</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={timelinePosition}
            onChange={handleTimelineChange}
            className={styles.timelineSlider}
            aria-label="Timeline: Present to Future"
          />
          <span className={styles.timelineLabel}>Future</span>
        </div>
      )}

      {!inExhibit && (
        <div className={styles.progressLabel}>
          Perspectives explored: {visitedContinentIds.size}/{continents.length}
        </div>
      )}

      <FutureVisionOverlay
        show={!inExhibit && timelinePosition >= 1 && !futureOverlayDismissed}
        onClose={() => setFutureOverlayDismissed(true)}
      />
    </div>
  );
}
