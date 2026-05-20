import { AnimatePresence } from 'framer-motion';
import { usePersonaStore } from '../../store/personaStore';
import { useSessionStore } from '../../store/sessionStore';
import { useMapStore } from '../../store/mapStore';
import AtlasMap from './Map/AtlasMap';
import NodeOverlay from './Overlays/NodeOverlay';
import PersonaSelector from './Persona/PersonaSelector';
import PersonaPanel from './Persona/PersonaPanel';
import EndReflection from './Reflection/EndReflection';
import GardenScene from './Garden/GardenScene';
import ExhibitPage from '../Exhibit/ExhibitPage';
import styles from './Atlas.module.css';

export default function Atlas() {
  const isPersonaModeActive = usePersonaStore((s) => s.isPersonaModeActive);
  const gardenOpen = useMapStore((s) => s.gardenOpen);
  const exhibitNodeId = useMapStore((s) => s.exhibitNodeId);
  const phase = useSessionStore((s) => s.phase);

  if (phase === 'reflection') {
    return <EndReflection />;
  }

  return (
    <div className={`${styles.layout} ${isPersonaModeActive ? styles.personaMode : ''}`}>
      {gardenOpen && <GardenScene />}
      {isPersonaModeActive && (
        <div className={styles.personaSide}>
          <PersonaPanel />
        </div>
      )}

      <div className={styles.mapSide}>
        <AtlasMap />
      </div>

      {/* Persona selector shown on first atlas entry */}
      <AnimatePresence>
        {!isPersonaModeActive && !exhibitNodeId && (
          <PersonaSelector />
        )}
      </AnimatePresence>

      {/* Node overlay — portal-rendered */}
      <NodeOverlay />

      {/* Full-screen exhibit pages */}
      <AnimatePresence>
        {exhibitNodeId && <ExhibitPage key={exhibitNodeId} />}
      </AnimatePresence>

    </div>
  );
}
