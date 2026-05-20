import { AnimatePresence, motion } from 'framer-motion';
import { useSessionStore } from './store/sessionStore';
import Onboarding from './phases/Onboarding/Onboarding';
import Atlas from './phases/Atlas/Atlas';

export default function App() {
  const phase = useSessionStore((s) => s.phase);

  return (
    <AnimatePresence mode="sync">
      {phase === 'onboarding' ? (
        <motion.div
          key="onboarding"
          style={{ position: 'fixed', inset: 0 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Onboarding />
        </motion.div>
      ) : (
        <motion.div
          key="atlas"
          style={{ position: 'fixed', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Atlas />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
