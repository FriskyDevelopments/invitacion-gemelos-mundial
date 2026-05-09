import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // Container slides up
      setTimeout(() => setPhase(2), 1000), // Date
      setTimeout(() => setPhase(3), 1800), // Time
      setTimeout(() => setPhase(4), 4000), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.slideUp}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10 space-y-8">
        
        {/* Ticker / Broadcast style container */}
        <motion.div 
          className="broadcast-lower-third w-[80vw] px-10 py-6 rounded-r-3xl shadow-2xl overflow-hidden relative"
          initial={{ x: '-100vw' }}
          animate={phase >= 1 && phase < 4 ? { x: 0 } : { x: '-100vw' }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <div className="absolute inset-0 bg-[#FFD700] opacity-10" />
          
          <div className="flex justify-between items-center z-10 relative">
            <motion.div 
              className="text-left"
              initial={{ y: 50, opacity: 0 }}
              animate={phase >= 2 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="text-[#FFD700] font-display text-[3vw] uppercase tracking-widest mb-1">FECHA DEL PARTIDO</div>
              <div className="text-white font-display text-[8vw] leading-none">27 JUN 2026</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="broadcast-lower-third w-[80vw] px-10 py-6 rounded-l-3xl shadow-2xl ml-auto overflow-hidden relative border-l-0 border-r-[8px] border-[#FFD700]"
          style={{ background: 'linear-gradient(-90deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
          initial={{ x: '100vw' }}
          animate={phase >= 1 && phase < 4 ? { x: 0 } : { x: '100vw' }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-white opacity-5" />
          
          <div className="flex justify-between items-center z-10 relative flex-row-reverse">
            <motion.div 
              className="text-right"
              initial={{ y: 50, opacity: 0 }}
              animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="text-[#FFD700] font-display text-[3vw] uppercase tracking-widest mb-1">PITAZO INICIAL</div>
              <div className="text-white font-display text-[8vw] leading-none">3:00 PM</div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
