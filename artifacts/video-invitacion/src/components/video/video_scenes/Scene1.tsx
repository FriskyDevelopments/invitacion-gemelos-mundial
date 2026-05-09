import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import soccerBallImg from '@/assets/images/soccer-ball.png';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Ball rolls in
      setTimeout(() => setPhase(2), 1500), // Ball explodes/hits
      setTimeout(() => setPhase(3), 1800), // Names appear
      setTimeout(() => setPhase(4), 4500), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* Ball Animation */}
        <motion.img 
          src={soccerBallImg} 
          className="w-[15vw] h-[15vw] absolute z-20"
          initial={{ x: '-60vw', y: '20vh', rotate: -360, scale: 0.5 }}
          animate={
            phase === 0 ? { x: '-60vw', y: '20vh', rotate: -360, scale: 0.5 } :
            phase === 1 ? { x: '0vw', y: '0vh', rotate: 0, scale: 1.5 } :
            phase >= 2 ? { x: '0vw', y: '0vh', rotate: 0, scale: 5, opacity: 0 } : {}
          }
          transition={{ 
            duration: phase === 1 ? 1 : 0.3, 
            ease: phase === 1 ? 'easeOut' : 'easeIn'
          }}
        />

        {/* Title Reveal */}
        <motion.div 
          className="flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 3 && phase < 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <h1 className="text-[10vw] font-display text-white text-center leading-[0.8] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            <span className="block text-stroke mb-2">DULCE</span>
            <span className="block text-[6vw] text-[#FFD700]">&</span>
            <span className="block">TADEO</span>
          </h1>
        </motion.div>

        {/* Flash Effect on Ball Hit */}
        <motion.div 
          className="absolute inset-0 bg-white z-0"
          initial={{ opacity: 0 }}
          animate={phase === 2 ? { opacity: 0.8 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

      </div>
    </motion.div>
  );
}
