import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";
import MatchTicket from "./MatchTicket";
import { Button } from "@/components/ui/button";
import { TWINS_NAMES } from "@/lib/eventConfig";

interface GoalCelebrationProps {
  name: string;
  count: number;
  onClose: () => void;
}

export default function GoalCelebration({ name, count, onClose }: GoalCelebrationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const shareText = `¡Confirmé mi asistencia al cumpleaños de ${TWINS_NAMES}! 🎉⚽`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-6 overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch", WebkitBackdropFilter: "blur(4px)", backdropFilter: "blur(4px)" }}
    >
      <Confetti />
      
      <motion.div 
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: [0, 1.2, 1], rotate: [-10, 5, 0] }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute top-20 w-full text-center"
      >
        <h2 className="font-display text-7xl md:text-9xl text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse">
          ¡¡¡GOOOOOL!!!
        </h2>
      </motion.div>

      {showContent && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center mt-32 w-full max-w-md"
        >
          <p className="text-xl text-center mb-8 font-medium">
            ¡<span className="text-primary font-bold">{name}</span> ya está en la lista!<br/>
            Te esperamos en el partido 🏆
          </p>

          <MatchTicket name={name} count={count} />

          <div className="mt-8 flex flex-col w-full gap-4">
            <Button 
              asChild
              className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Compartir por WhatsApp
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="w-full text-muted-foreground hover:text-white"
            >
              Volver a la invitación
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
