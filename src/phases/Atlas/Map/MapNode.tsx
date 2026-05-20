import { memo } from 'react';
import type { AtlasNode } from '../../../types';
import { useMapStore } from '../../../store/mapStore';
import { useSessionStore } from '../../../store/sessionStore';

interface Props {
  node: AtlasNode;
  svgScale: number;
}

const MapNode = memo(function MapNode({ node, svgScale }: Props) {
  const setActiveNode = useMapStore((s) => s.setActiveNode);
  const setHoveredNode = useMapStore((s) => s.setHoveredNode);
  const hoveredNodeId = useMapStore((s) => s.hoveredNodeId);
  const highlightedNodeId = useMapStore((s) => s.highlightedNodeId);
  const visitedNodeIds = useSessionStore((s) => s.visitedNodeIds);

  const isHovered = hoveredNodeId === node.id;
  const isHighlighted = highlightedNodeId === node.id;
  const isVisited = visitedNodeIds.has(node.id);

  // Scale radius inversely with zoom so nodes stay the same apparent pixel size
  const r = 4.5 / svgScale;
  const strokeW = 1.5 / svgScale;

  return (
    <g
      data-node-id={node.id}
      transform={`translate(${node.position.x}, ${node.position.y})`}
      onClick={(e) => {
        e.stopPropagation();
        setActiveNode(node.id);
      }}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      cursor="pointer"
    >
      {/* Pulse ring on highlight */}
      {isHighlighted && (
        <circle
          data-base-r="13.5"
          data-base-sw="1.5"
          r={r * 3}
          fill="none"
          stroke="#ffc250"
          strokeWidth={strokeW}
          opacity={0.4}
        />
      )}
      {/* Hover ring */}
      <circle
        data-base-r="9.9"
        r={r * 2.2}
        fill="var(--continent-primary, rgba(255,194,80,0.05))"
        opacity={isHovered ? 0.15 : 0}
      />
      {/* Filled circle — always a solid dot, filled when visited */}
      <circle
        data-base-r="4.5"
        r={r}
        fill={isHighlighted ? "var(--continent-color, #ffffff)" : "var(--continent-node-color, #ffffff)"}
        opacity={isHovered ? 1 : 0.85}
      />
      {/* Inner dot when visited (visual distinction) */}
      {isVisited && (
        <circle data-base-r="1.8" r={r * 0.4} fill="var(--color-bg, #0a0a0f)" opacity={0.7} />
      )}
    </g>
  );
});

export default MapNode;
