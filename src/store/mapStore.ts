import { create } from 'zustand';
import type { ContinentId, MapCommand, MapTransform } from '../types';

interface MapState {
  transform: MapTransform;
  activeNodeId: string | null;
  hoveredNodeId: string | null;
  hoveredContinentId: ContinentId | null;
  activeContinentId: ContinentId | null;
  highlightedNodeId: string | null;
  pendingOverlayNodeId: string | null;
  pendingHoverNodeId: string | null;
  pinnedPreviewNodeId: string | null;
  pinnedPreviewScreenPos: { x: number; y: number } | null;
  command: MapCommand | null;
  gardenOpen: boolean;
  exhibitNodeId: string | null;
  exhibitReturnNodeId: string | null;

  setTransform: (t: MapTransform) => void;
  setActiveNode: (nodeId: string | null) => void;
  setHoveredNode: (nodeId: string | null) => void;
  setHoveredContinent: (continentId: ContinentId | null) => void;
  setActiveContinent: (continentId: ContinentId | null) => void;
  setHighlightedNode: (nodeId: string | null) => void;
  setPendingOverlay: (nodeId: string | null) => void;
  setPendingHover: (nodeId: string | null) => void;
  setPinnedPreview: (nodeId: string | null, pos?: { x: number; y: number }) => void;
  queueMapCommand: (cmd: MapCommand) => void;
  clearCommand: () => void;
  openGarden: () => void;
  closeGarden: () => void;
  enterExhibit: (nodeId: string, returnNodeId: string) => void;
  exitExhibit: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  transform: { x: 0, y: 0, k: 1 },
  activeNodeId: null,
  hoveredNodeId: null,
  hoveredContinentId: null,
  activeContinentId: null,
  highlightedNodeId: null,
  pendingOverlayNodeId: null,
  pendingHoverNodeId: null,
  pinnedPreviewNodeId: null,
  pinnedPreviewScreenPos: null,
  command: null,
  gardenOpen: false,
  exhibitNodeId: null,
  exhibitReturnNodeId: null,

  setTransform: (transform) => set({ transform }),
  setActiveNode: (activeNodeId) => set({ activeNodeId, pinnedPreviewNodeId: null, pinnedPreviewScreenPos: null }),
  setHoveredNode: (hoveredNodeId) => set({ hoveredNodeId }),
  setHoveredContinent: (hoveredContinentId) => set({ hoveredContinentId }),
  setActiveContinent: (activeContinentId) => set({ activeContinentId }),
  setHighlightedNode: (highlightedNodeId) => set({ highlightedNodeId }),
  setPendingOverlay: (pendingOverlayNodeId) => set({ pendingOverlayNodeId }),
  setPendingHover: (pendingHoverNodeId) => set({ pendingHoverNodeId }),
  setPinnedPreview: (nodeId, pos) => set({ pinnedPreviewNodeId: nodeId, pinnedPreviewScreenPos: pos ?? null }),
  queueMapCommand: (command) => set({ command }),
  clearCommand: () => set({ command: null }),
  openGarden: () => set({ gardenOpen: true }),
  closeGarden: () => set({ gardenOpen: false }),
  enterExhibit: (exhibitNodeId, exhibitReturnNodeId) => set({
    exhibitNodeId,
    exhibitReturnNodeId,
    activeNodeId: null,
    pinnedPreviewNodeId: null,
    pinnedPreviewScreenPos: null,
  }),
  exitExhibit: () => set((state) => ({
    exhibitNodeId: null,
    exhibitReturnNodeId: null,
    activeNodeId: state.exhibitReturnNodeId,
    pinnedPreviewNodeId: null,
    pinnedPreviewScreenPos: null,
  })),
}));
