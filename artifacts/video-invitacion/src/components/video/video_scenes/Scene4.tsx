import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // Venue name
      setTimeout(() => setPhase(2), 1200), // Address
      setTimeout(() => setPhase(3), 2000), // Map pin / accent
      setTimeout(() => setPhase(4), 4000), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-end justify-center pb-[10vh]"
      {...sceneTransitions.clipPolygon}
    >
      <div className="relative w-[90vw] z-10">
        
        {/* Stadium Name */}
        <motion.div 
          className="bg-[#FFD700] text-[#0f2d18] font-display text-[8vw] px-8 py-4 inline-block shadow-[0_10px_30px_rgba(255,215,0,0.3)] mb-2"
          style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={phase >= 1 && phase < 4 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            EL AGUACATE
          </motion.div>
        </motion.div>

        {/* Address */}
        <motion.div 
          className="bg-[#0f2d18]/90 backdrop-blur-md text-white font-body text-[2.5vw] px-8 py-4 border-l-4 border-[#FFD700] max-w-[70vw]"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 && phase < 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div 
            className="w-full h-[1px] bg-white/20 mb-3"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex items-start gap-4">
            <motion.div 
              className="mt-1 text-[#FFD700]"
              initial={{ scale: 0 }}
              animate={phase >= 3 ? { scale: 1 } : { scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </motion.div>
            <p>Dr. Pedro Noriega 902, Col. Treviño, Mty. N.L.</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
