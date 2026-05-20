// ── Continent ──────────────────────────────────────────────────────────────

export type ContinentId =
  | 'personal-narrative'
  | 'science'
  | 'harm-reduction'
  | 'indigenous-knowledge'
  | 'history'
  | 'literacy-island';

export type ContinentVisualStyle =
  | 'grid'
  | 'organic'
  | 'bounded-fragmented'
  | 'human-textured'
  | 'abstract-diagrammatic'
  | 'caution-contrast';

export interface ContinentPosition {
  cx: number;
  cy: number;
  radius: number;
}

export interface Continent {
  id: ContinentId;
  label: string;
  tagline: string;
  visualStyle: ContinentVisualStyle;
  position: ContinentPosition;
  svgPath: string;
  colorPrimary: string;
  colorSecondary: string;
  previewNodeIds: string[];
}

// ── Node ───────────────────────────────────────────────────────────────────

export type InteractionType =
  | 'scroll-narrative'
  | 'visual-comparison'
  | 'simple-simulation'
  | 'audio-clip'
  | 'diagrammatic-breakdown'
  | 'garden-portal';

export interface ScrollNarrativeContent {
  type: 'scroll-narrative';
  paragraphs: string[];
  pullQuote?: string;
}

export interface VisualComparisonContent {
  type: 'visual-comparison';
  leftLabel: string;
  rightLabel: string;
  leftItems: string[];
  rightItems: string[];
}

export interface SimParam {
  id: string;
  label: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
}

export interface SimpleSimulationContent {
  type: 'simple-simulation';
  description: string;
  parameters: SimParam[];
  outputLabel: string;
  outputFormula: string; // e.g. "dose * efficacy / risk" — evaluated client-side
}

export interface AudioClipContent {
  type: 'audio-clip';
  audioSrc: string;
  transcriptLines: string[];
  speakerName: string;
  speakerContext: string;
}

export interface DiagramStep {
  label: string;
  annotation: string;
  x: number;
  y: number;
}

export interface DiagrammaticContent {
  type: 'diagrammatic-breakdown';
  title: string;
  steps: DiagramStep[];
}

export interface GardenPortalContent {
  type: 'garden-portal';
}

export type NodeInteractionContent =
  | ScrollNarrativeContent
  | VisualComparisonContent
  | SimpleSimulationContent
  | AudioClipContent
  | DiagrammaticContent
  | GardenPortalContent;

export interface CrossLink {
  targetNodeId: string;
  relationshipLabel: string;
}

export type NodeType = 'immersive' | 'standard' | 'callout';

export interface AtlasNode {
  id: string;
  continentId: ContinentId;
  title: string;
  keyInsight: string;
  nodeType?: NodeType;
  gardenLink?: boolean;
  position: { x: number; y: number };
  interaction: NodeInteractionContent;
  crossLinks: CrossLink[];
}

// ── Persona System ─────────────────────────────────────────────────────────

export type PersonaId = 'robert' | 'isabel' | 'zoe' | 'jordan' | 'cristina';

export interface PersonaBeat {
  storyText: string;
  emotionalLabel: string;
  targetNodeId: string | null;
  continueLabel: string;
}

export interface Persona {
  id: PersonaId;
  name: string;
  bio?: string;
  shortDescription: string;
  arcSummary: string;
  beats: PersonaBeat[];
  finalReflectionPrompt: string;
}

// ── User Session ───────────────────────────────────────────────────────────

export type OnboardingPerspective =
  | 'curious'
  | 'skeptical'
  | 'concerned'
  | 'familiar'
  | 'unsure';

export type AppPhase = 'onboarding' | 'atlas' | 'reflection';

export interface UserSession {
  initialWord: string;
  perspective: OnboardingPerspective;
  visitedNodeIds: Set<string>;
  visitedContinentIds: Set<ContinentId>;
  endWord: string | null;
  activePersonaId: PersonaId | null;
  currentBeatIndex: number;
  startedAt: number;
  phase: AppPhase;
}

// ── Map State ──────────────────────────────────────────────────────────────

export interface MapTransform {
  x: number;
  y: number;
  k: number;
}

export type MapCommandType = 'zoomToNode' | 'zoomToContinent' | 'zoomToOverview';

export interface MapCommand {
  type: MapCommandType;
  nodeId?: string;
  continentId?: ContinentId;
  duration?: number;
  pendingOverlayNodeId?: string;
  timelineT?: number;
}
