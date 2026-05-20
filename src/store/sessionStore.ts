import { create } from 'zustand';
import type { AppPhase, ContinentId, OnboardingPerspective, PersonaId, UserSession } from '../types';

interface SessionState extends UserSession {
  setInitialWord: (word: string) => void;
  setPerspective: (p: OnboardingPerspective) => void;
  setPhase: (phase: AppPhase) => void;
  markNodeVisited: (nodeId: string) => void;
  markContinentVisited: (continentId: ContinentId) => void;
  setEndWord: (word: string) => void;
  setActivePersona: (personaId: PersonaId | null) => void;
  setBeat: (index: number) => void;
  reset: () => void;
}

const defaultState: UserSession = {
  initialWord: '',
  perspective: 'unsure',
  visitedNodeIds: new Set(),
  visitedContinentIds: new Set(),
  endWord: null,
  activePersonaId: null,
  currentBeatIndex: 0,
  startedAt: 0,
  phase: 'onboarding',
};

export const useSessionStore = create<SessionState>((set) => ({
  ...defaultState,
  setInitialWord: (word) => set({ initialWord: word }),
  setPerspective: (perspective) => set({ perspective }),
  setPhase: (phase) => set({ phase }),
  markNodeVisited: (nodeId) =>
    set((s) => ({ visitedNodeIds: new Set([...s.visitedNodeIds, nodeId]) })),
  markContinentVisited: (continentId) =>
    set((s) => ({ visitedContinentIds: new Set([...s.visitedContinentIds, continentId]) })),
  setEndWord: (endWord) => set({ endWord }),
  setActivePersona: (activePersonaId) => set({ activePersonaId, currentBeatIndex: 0 }),
  setBeat: (currentBeatIndex) => set({ currentBeatIndex }),
  reset: () => set({ ...defaultState, startedAt: Date.now(), visitedNodeIds: new Set(), visitedContinentIds: new Set() }),
}));
