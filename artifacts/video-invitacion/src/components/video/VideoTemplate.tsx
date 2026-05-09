import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import stadiumImg from '@/assets/images/stadium.png';
import confettiImg from '@/assets/images/confetti.png';

export const SCENE_DURATIONS: Record<string, number> = {
  opening: 7000,
  match: 6000,
  details: 7000,
  venue: 7000,
  closing: 8000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  opening: Scene1,
  match: Scene2,
  details: Scene3,
  venue: Scene4,
  closing: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#0a1f10]">
      {/* Persistent Background Layer */}
      <div className="absolute inset-0">
        <motion.img
          src={stadiumImg}
          alt="Stadium"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          animate={{
            scale: sceneIndex === 0 ? 1.1 : sceneIndex === 4 ? 1.2 : 1.05,
            opacity: sceneIndex === 0 ? 0.8 : sceneIndex === 4 ? 0.9 : 0.5,
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f10] via-transparent to-[#0a1f10]/80" />
        <div className="absolute inset-0 bg-[#0a1f10]/30" />
      </div>

      {/* Floating Stadium Lights effect */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)' }}
        animate={{
          x: ['0%', '10%', '0%'],
          y: ['0%', '5%', '0%'],
          opacity: sceneIndex === 0 ? 0.8 : 0.4,
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
        animate={{
          x: ['0%', '-10%', '0%'],
          y: ['0%', '10%', '0%'],
          opacity: sceneIndex === 4 ? 0.8 : 0.3,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Persistent confetti for closing */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneIndex === 4 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {sceneIndex === 4 && (
          <img src={confettiImg} alt="Confetti" className="w-full h-full object-cover mix-blend-screen opacity-60" />
        )}
      </motion.div>

      {/* Foreground scenes */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
