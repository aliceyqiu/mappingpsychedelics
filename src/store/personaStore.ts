import { create } from 'zustand';
import type { PersonaId } from '../types';

interface PersonaState {
  isPersonaModeActive: boolean;
  activePersonaId: PersonaId | null;
  currentBeatIndex: number;
  isTransitioning: boolean;

  activatePersona: (personaId: PersonaId) => void;
  advanceBeat: () => void;
  retreatBeat: () => void;
  deactivatePersona: () => void;
  setTransitioning: (v: boolean) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  isPersonaModeActive: false,
  activePersonaId: null,
  currentBeatIndex: 0,
  isTransitioning: false,

  activatePersona: (personaId) =>
    set({ isPersonaModeActive: true, activePersonaId: personaId, currentBeatIndex: 0 }),
  advanceBeat: () =>
    set((s) => ({ currentBeatIndex: s.currentBeatIndex + 1 })),
  retreatBeat: () =>
    set((s) => ({ currentBeatIndex: Math.max(0, s.currentBeatIndex - 1) })),
  deactivatePersona: () =>
    set({ isPersonaModeActive: false, activePersonaId: null, currentBeatIndex: 0 }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
}));
