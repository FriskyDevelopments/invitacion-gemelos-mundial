import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Main text
      setTimeout(() => setPhase(2), 1500), // Glow/pulse
      setTimeout(() => setPhase(3), 5000), // Exit (loop)
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.crossDissolve}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* Glow behind text */}
        <motion.div 
          className="absolute w-[80vw] h-[40vw] bg-[#FFD700] rounded-full blur-[120px] opacity-0"
          animate={
            phase >= 2 ? { 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1] 
            } : { opacity: 0 }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Text */}
        <motion.div 
          className="text-center z-10"
          initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
          animate={phase >= 1 && phase < 3 ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[12vw] font-display text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            ¡TE ESPERAMOS!
          </h2>
          <motion.div 
            className="w-full h-[4px] bg-[#FFD700] mt-4"
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
