import type { Continent } from '../../../types';

// Visual identity fills defined inline as SVG pattern/filter elements.
// Each style is meaningfully distinct per the brief.

interface Props {
  continent: Continent;
  patternId: string;
  filterId: string;
}

export default function ContinentFill({ continent, patternId, filterId }: Props) {
  const { visualStyle, colorPrimary } = continent;

  if (visualStyle === 'grid') {
    return (
      <>
        <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={colorPrimary} strokeWidth="0.4" opacity="0.5" />
        </pattern>
      </>
    );
  }

  if (visualStyle === 'organic') {
    return (
      <>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id={patternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.2" fill={colorPrimary} opacity="0.4" />
          <circle cx="5" cy="5" r="0.6" fill={colorPrimary} opacity="0.25" />
          <circle cx="35" cy="12" r="0.8" fill={colorPrimary} opacity="0.3" />
        </pattern>
      </>
    );
  }

  if (visualStyle === 'bounded-fragmented') {
    return (
      <>
        <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="8" height="8" fill="none" stroke={colorPrimary} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
          <rect x="14" y="14" width="8" height="8" fill="none" stroke={colorPrimary} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.35" />
        </pattern>
      </>
    );
  }

  if (visualStyle === 'human-textured') {
    return (
      <>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="turbulence" baseFrequency="0.05 0.04" numOctaves="2" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id={patternId} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d={`M 0 15 Q 8 ${12} 15 15 Q 22 ${18} 30 15`} fill="none" stroke={colorPrimary} strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </>
    );
  }

  if (visualStyle === 'abstract-diagrammatic') {
    return (
      <>
        <pattern id={patternId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="5" fill="none" stroke={colorPrimary} strokeWidth="0.5" opacity="0.4" />
          <line x1="16" y1="0" x2="16" y2="11" stroke={colorPrimary} strokeWidth="0.4" opacity="0.3" />
          <line x1="0" y1="16" x2="11" y2="16" stroke={colorPrimary} strokeWidth="0.4" opacity="0.3" />
          <line x1="21" y1="16" x2="32" y2="16" stroke={colorPrimary} strokeWidth="0.4" opacity="0.3" />
          <line x1="16" y1="21" x2="16" y2="32" stroke={colorPrimary} strokeWidth="0.4" opacity="0.3" />
        </pattern>
      </>
    );
  }

  // caution-contrast
  return (
    <>
      <pattern id={patternId} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 0 16 L 16 0" fill="none" stroke={colorPrimary} strokeWidth="0.5" opacity="0.35" />
        <path d="M -4 4 L 4 -4" fill="none" stroke={colorPrimary} strokeWidth="0.5" opacity="0.2" />
        <path d="M 12 20 L 20 12" fill="none" stroke={colorPrimary} strokeWidth="0.5" opacity="0.2" />
      </pattern>
    </>
  );
}
