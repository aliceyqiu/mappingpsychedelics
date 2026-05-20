import React, { memo } from 'react';
import type { AtlasNode, Continent, ContinentId } from '../../../types';
import { useMapStore } from '../../../store/mapStore';
import { useSessionStore } from '../../../store/sessionStore';
import { PRESENT_OFFSETS, FUTURE_OFFSETS } from '../../../data/continentTimeline';
import MapNode from './MapNode';
import asset2 from '../../../assets/Asset 2.png';
import asset3 from '../../../assets/Asset 3.png';
import asset4 from '../../../assets/Asset 4.png';
import asset5 from '../../../assets/Asset 5.png';
import asset6 from '../../../assets/Asset 6.png';
import asset7 from '../../../assets/Asset 7.png';

const CONTINENT_IMAGES: Record<string, string> = {
  'literacy-island': asset2,
  'indigenous-knowledge': asset3,
  'harm-reduction': asset4,
  history: asset5,
  'personal-narrative': asset6,
  science: asset7,
};

// Figma-derived dimensions scaled to SVG 1000×620 space (scaleX=1000/1512, scaleY=620/828)
const CONTINENT_DIMS: Record<string, { w: number; h: number }> = {
  'personal-narrative':   { w: 234, h: 277 },
  science:                { w: 214, h: 217 },
  history:                { w: 249, h: 184 },
  'indigenous-knowledge': { w: 296, h: 205 },
  'harm-reduction':       { w: 208, h: 221 },
  'literacy-island':      { w:  41, h:  35 },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildTimelineTransform(id: string, t: number, cx: number, cy: number): { transform: string; rot: number } {
  const zero = { dx: 0, dy: 0, rotation: 0 };
  const p = PRESENT_OFFSETS[id as ContinentId] ?? zero;
  const f = FUTURE_OFFSETS[id as ContinentId] ?? zero;
  const dx  = lerp(p.dx, f.dx, t);
  const dy  = lerp(p.dy, f.dy, t);
  const rot = lerp(p.rotation, f.rotation, t);
  return {
    transform: `translate(${dx.toFixed(2)},${dy.toFixed(2)}) rotate(${rot.toFixed(2)},${cx},${cy})`,
    rot,
  };
}

interface Props {
  continent: Continent;
  continentNodes: AtlasNode[];
  patternId: string;
  filterId: string;
  svgScale: number;
  timelinePosition: number;
}

const MapContinent = memo(function MapContinent({
  continent,
  continentNodes,
  patternId: _patternId,
  filterId: _filterId,
  svgScale,
  timelinePosition,
}: Props) {
  const setHoveredContinent = useMapStore((s) => s.setHoveredContinent);
  const hoveredContinentId = useMapStore((s) => s.hoveredContinentId);
  const queueMapCommand = useMapStore((s) => s.queueMapCommand);
  const visitedContinentIds = useSessionStore((s) => s.visitedContinentIds);

  const isHovered = hoveredContinentId === continent.id;
  const isVisited = visitedContinentIds.has(continent.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    queueMapCommand({ type: 'zoomToContinent', continentId: continent.id, duration: 650, timelineT: timelinePosition });
  };

  const { cx, cy, radius } = continent.position;
  const fillOpacity = isHovered ? 1 : isVisited ? 0.92 : 0.82;
  const imageSrc = CONTINENT_IMAGES[continent.id];
  const dims = CONTINENT_DIMS[continent.id] ?? { w: radius * 2, h: radius * 2 };
  const { transform } = buildTimelineTransform(continent.id, timelinePosition, cx, cy);

  return (
    <g
      data-continent={continent.id}
      transform={transform}
      onMouseEnter={() => setHoveredContinent(continent.id)}
      onMouseLeave={() => setHoveredContinent(null)}
      onClick={handleClick}
    >
      {/* Fill: transparent PNG image for all continents, solid colour fallback */}
      {imageSrc ? (
        <image
          className="continent-base"
          href={imageSrc}
          x={cx - dims.w / 2}
          y={cy - dims.h / 2}
          width={dims.w}
          height={dims.h}
          preserveAspectRatio="xMidYMid meet"
          opacity={fillOpacity}
          aria-label={`${continent.label} continent`}
        />
      ) : (
        <>
          <path
            className="continent-base"
            d={continent.svgPath}
            fill={continent.colorPrimary}
            opacity={fillOpacity}
          />
          <path
            className="continent-stroke"
            d={continent.svgPath}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={isHovered ? 2 : 1.5}
            strokeDasharray={continent.visualStyle === 'bounded-fragmented' ? '6,3' : undefined}
            opacity={1}
          />
        </>
      )}

      {/* Nodes */}
      {continentNodes.map((node) => (
        <MapNode key={node.id} node={node} svgScale={svgScale} />
      ))}
    </g>
  );
});

export default MapContinent;
