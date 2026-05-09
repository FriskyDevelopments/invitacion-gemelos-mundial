import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // Scoreboard background
      setTimeout(() => setPhase(2), 800),  // Number 9 flips in
      setTimeout(() => setPhase(3), 1600), // AÑOS CUMPLEN appears
      setTimeout(() => setPhase(4), 4500), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.wipe}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* Scoreboard Container */}
        <motion.div 
          className="relative bg-[#051108] border-4 border-[#FFD700] p-12 rounded-xl shadow-[0_0_50px_rgba(255,215,0,0.3)] flex flex-col items-center justify-center min-w-[50vw]"
          initial={{ rotateX: 90, opacity: 0 }}
          animate={phase >= 1 && phase < 4 ? { rotateX: 0, opacity: 1 } : { rotateX: -90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformPerspective: 1200 }}
        >
          {/* LED grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

          <motion.div className="flex items-center gap-8 z-10 overflow-hidden">
            <motion.div
              className="text-[20vw] scoreboard-text text-[#FFD700] leading-none"
              initial={{ y: '100%' }}
              animate={phase >= 2 ? { y: '0%' } : { y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              9
            </motion.div>
            
            <motion.div
              className="flex flex-col gap-1 z-10"
              initial={{ x: -50, opacity: 0, filter: 'blur(10px)' }}
              animate={phase >= 3 ? { x: 0, opacity: 1, filter: 'blur(0px)' } : { x: -50, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="text-[10vw] scoreboard-text text-white leading-none">AÑOS</span>
              <span className="text-[6vw] scoreboard-text text-[#FFD700] leading-none tracking-widest">CUMPLEN</span>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
