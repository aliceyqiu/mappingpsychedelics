import type { ContinentId } from '../types';

export interface TimelineState {
  dx: number;
  dy: number;
  rotation: number;
}

// t=0  Present: extra scatter beyond the base exploration positions
export const PRESENT_OFFSETS: Record<ContinentId, TimelineState> = {
  'personal-narrative':   { dx: -120, dy:  -80, rotation:  35 },
  science:                { dx:   60, dy: -110, rotation: -28 },
  history:                { dx:  140, dy:  -60, rotation:  20 },
  'indigenous-knowledge': { dx: -100, dy:   90, rotation: -42 },
  'harm-reduction':       { dx:   80, dy:  100, rotation:  30 },
  'literacy-island':      { dx:  100, dy:   80, rotation: -30 },
};

// t=1  Future: heart assembly — positions derived from Figma layout (1512×828 → 1000×620)
export const FUTURE_OFFSETS: Record<ContinentId, TimelineState> = {
  'personal-narrative':   { dx:  188, dy:   74, rotation:  0 },
  science:                { dx:   -1, dy:  -26, rotation:  0 },
  history:                { dx: -162, dy:   36, rotation:  0 },
  'indigenous-knowledge': { dx:  246, dy:  -44, rotation:  0 },
  'harm-reduction':       { dx:    0, dy: -135, rotation:  0 },
  'literacy-island':      { dx: -841, dy: -330, rotation:  0 },
};
