import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useMapStore } from '../../../store/mapStore';
import { useSessionStore } from '../../../store/sessionStore';
import { nodes } from '../../../data/nodes';
import { continents } from '../../../data/continents';
import CrossLinks from './CrossLinks';
import styles from './Overlay.module.css';
import type {
  ScrollNarrativeContent,
  VisualComparisonContent,
  SimpleSimulationContent,
  AudioClipContent,
  DiagrammaticContent,
} from '../../../types';

function linkify(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const mdLink = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;

  const pushPlain = (s: string, keyPrefix: string) => {
    s.split(/(https?:\/\/\S+)/).forEach((part, i) => {
      if (i % 2 === 1) {
        nodes.push(<a key={`${keyPrefix}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className={styles.narrativeLink}>{part}</a>);
      } else if (part) {
        nodes.push(part);
      }
    });
  };

  while ((m = mdLink.exec(text)) !== null) {
    if (m.index > last) pushPlain(text.slice(last, m.index), `p${m.index}`);
    nodes.push(<a key={`md${m.index}`} href={m[2]} target="_blank" rel="noopener noreferrer" className={styles.narrativeLink}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) pushPlain(text.slice(last), 'tail');
  return nodes;
}

function ScrollNarrative({ content }: { content: ScrollNarrativeContent }) {
  return (
    <div>
      {content.paragraphs.map((p, i) => (
        <p key={i} className={styles.narrativeParagraph}>{linkify(p)}</p>
      ))}
      {content.pullQuote && (
        <blockquote className={styles.pullQuote}>{content.pullQuote}</blockquote>
      )}
    </div>
  );
}

function VisualComparison({ content }: { content: VisualComparisonContent }) {
  return (
    <div className={styles.comparison}>
      <div className={styles.compCol}>
        <div className={styles.compLabel}>{content.leftLabel}</div>
        {content.leftItems.map((item, i) => (
          <div key={i} className={styles.compItem}>{item}</div>
        ))}
      </div>
      <div className={styles.compCol}>
        <div className={styles.compLabel}>{content.rightLabel}</div>
        {content.rightItems.map((item, i) => (
          <div key={i} className={styles.compItem}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function SimpleSimulation({ content }: { content: SimpleSimulationContent }) {
  const initValues = Object.fromEntries(content.parameters.map((p) => [p.id, p.default]));
  const [values, setValues] = useState<Record<string, number>>(initValues);

  const computeOutput = () => {
    try {
      const fn = new Function(...Object.keys(values), `return ${content.outputFormula}`);
      const result = fn(...Object.values(values));
      return Math.min(10, Math.max(0, result)).toFixed(1);
    } catch {
      return '—';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p className={styles.simDescription}>{content.description}</p>
      {content.parameters.map((param) => (
        <div key={param.id} className={styles.simParam}>
          <label htmlFor={`sim-${param.id}`} className={styles.simParamLabel}>
            <span>{param.label}</span>
            <span className={styles.simParamValue}>
              {param.unit === '' ? (values[param.id] === 1 ? 'Yes' : 'No') : `${values[param.id]}${param.unit}`}
            </span>
          </label>
          <input
            id={`sim-${param.id}`}
            type="range"
            className={styles.simSlider}
            min={param.min}
            max={param.max}
            step={param.step}
            value={values[param.id]}
            onChange={(e) => setValues((v) => ({ ...v, [param.id]: Number(e.target.value) }))}
          />
        </div>
      ))}
      <div className={styles.simOutput} aria-live="polite" aria-atomic="true">
        <div className={styles.simOutputLabel}>{content.outputLabel}</div>
        <div className={styles.simOutputValue}>{computeOutput()} / 10</div>
      </div>
    </div>
  );
}

function AudioClip({ content }: { content: AudioClipContent }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.audioMeta}>
        <div className={styles.audioSpeaker}>{content.speakerName}</div>
        <div className={styles.audioContext}>{content.speakerContext}</div>
      </div>
      {content.audioSrc ? (
        <>
          <audio ref={audioRef} src={content.audioSrc} onEnded={() => setPlaying(false)} />
          <button type="button" className={styles.crossLinkBtn} onClick={toggle}>
            {playing ? '⏸ Pause' : '▶ Play recording'}
          </button>
        </>
      ) : (
        <div className={styles.crossLinkBtn} style={{ cursor: 'default', opacity: 0.5 }}>
          Audio not available in this demo
        </div>
      )}
      <div className={styles.audioTranscript}>
        {content.transcriptLines.map((line, i) => (
          <div key={i} className={styles.audioLine}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function DiagramBreakdown({ content }: { content: DiagrammaticContent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className={styles.diagramTitle}>{content.title}</div>
      <div className={styles.diagramStepList}>
        {content.steps.map((step, i) => (
          <div key={i} className={styles.diagramStep}>
            <div className={styles.diagramStepYear}>{step.label}</div>
            <div className={styles.diagramStepAnnotation}>{step.annotation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverlayContent() {
  const activeNodeId = useMapStore((s) => s.activeNodeId);
  const setActiveNode = useMapStore((s) => s.setActiveNode);
  const openGarden = useMapStore((s) => s.openGarden);
  const enterExhibit = useMapStore((s) => s.enterExhibit);

  const EXHIBIT_NODE_IDS = new Set(['n01', 'n04', 'n08', 'n11', 'n13', 'n17']);
  const markNodeVisited = useSessionStore((s) => s.markNodeVisited);
  const markContinentVisited = useSessionStore((s) => s.markContinentVisited);

  const node = activeNodeId ? nodes.find((n) => n.id === activeNodeId) : null;
  const continent = node ? continents.find((c) => c.id === node.continentId) : null;

  useEffect(() => {
    if (!node) return;
    markNodeVisited(node.id);
    markContinentVisited(node.continentId);
  }, [node?.id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveNode(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setActiveNode]);

  if (!node || !continent) return null;

  if (node.interaction.type === 'garden-portal') {
    return (
      <>
        <motion.div
          className={styles.backdrop}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveNode(null)}
        />
        <motion.div
          className={styles.gardenCard}
          role="dialog"
          aria-modal="true"
          aria-label="Hidden garden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.gardenTitle}>???</div>
          <button
            type="button"
            className={styles.gardenEnterBtn}
            onClick={() => { openGarden(); setActiveNode(null); }}
          >
            Enter
          </button>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div
        className={styles.backdrop}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveNode(null)}
      />
      <motion.aside
        className={styles.panel}
        data-continent={node.continentId}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        aria-modal="true"
        role="dialog"
        aria-label={node.title}
      >
        <header className={styles.header}>
          <div className={styles.continentBadge}>{continent.label}</div>
          <h2 className={styles.title}>{node.title}</h2>
          <p className={styles.keyInsight}>{node.keyInsight}</p>
          <button type="button" className={`btn-close ${styles.closeBtn}`} onClick={() => setActiveNode(null)} aria-label="Close">
            ×
          </button>
        </header>

        <div className={styles.body}>
          {node.interaction.type === 'scroll-narrative' && (
            <ScrollNarrative content={node.interaction} />
          )}
          {node.interaction.type === 'visual-comparison' && (
            <VisualComparison content={node.interaction} />
          )}
          {node.interaction.type === 'simple-simulation' && (
            <SimpleSimulation content={node.interaction} />
          )}
          {node.interaction.type === 'audio-clip' && (
            <AudioClip content={node.interaction} />
          )}
          {node.interaction.type === 'diagrammatic-breakdown' && (
            <DiagramBreakdown content={node.interaction} />
          )}

          <CrossLinks crossLinks={node.crossLinks} />
        </div>

        {node.nodeType === 'immersive' && (
          <div className={styles.exhibitFooter}>
            <button
              type="button"
              className={styles.exhibitBtn}
              onClick={
                node.gardenLink
                  ? () => { openGarden(); setActiveNode(null); }
                  : EXHIBIT_NODE_IDS.has(node.id)
                  ? () => enterExhibit(node.id, node.id)
                  : undefined
              }
            >
              Enter exhibit →
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
}

export default function NodeOverlay() {
  const activeNodeId = useMapStore((s) => s.activeNodeId);
  const portal = document.getElementById('overlay-root');
  if (!portal) return null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {activeNodeId && <OverlayContent key={activeNodeId} />}
    </AnimatePresence>,
    portal
  );
}
