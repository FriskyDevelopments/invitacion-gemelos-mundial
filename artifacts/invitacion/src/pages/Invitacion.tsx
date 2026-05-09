import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RSVPForm from "@/components/RSVPForm";
import WhatsAppConfig from "@/components/WhatsAppConfig";
import Countdown from "@/components/Countdown";
import GoalCelebration from "@/components/GoalCelebration";
import { EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_TIME_DISPLAY, EVENT_VENUE, EVENT_ADDRESS, TWINS_NAMES, TWIN_BOY, TWIN_GIRL } from "@/lib/eventConfig";

export default function Invitacion() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(0);

  const handleConfirm = (name: string, count: number) => {
    setGuestName(name);
    setGuestCount(count);
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <AnimatePresence>
        {isConfirmed && (
          <GoalCelebration
            name={guestName}
            count={guestCount}
            onClose={() => setIsConfirmed(false)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />

        <motion.div
          className="absolute text-6xl z-0 opacity-20"
          animate={{
            x: ["-100vw", "100vw"],
            y: [0, -100, 0, -50, 0],
            rotate: 360,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ⚽
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary text-primary font-bold tracking-widest text-sm mb-4"
          >
            CUMPLEAÑOS
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-7xl md:text-9xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
          >
            {TWINS_NAMES}
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-display text-4xl md:text-5xl text-primary tracking-wide mt-4"
          >
            ¡SE ARMÓ EL PARTIDO!
          </motion.h2>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-card-border p-8 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.1)] flex flex-col gap-6"
        >
          <div className="text-center pb-6 border-b border-card-border/50">
            <h3 className="font-display text-3xl text-primary">Detalles del Partido</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Fecha</p>
              <p className="font-display text-2xl">{EVENT_DATE_DISPLAY}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Hora</p>
              <p className="font-display text-2xl">{EVENT_TIME_DISPLAY}</p>
            </div>
            <div className="col-span-2 space-y-1 mt-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Estadio</p>
              <p className="font-display text-2xl">{EVENT_VENUE}</p>
              <p className="text-sm text-muted-foreground">{EVENT_ADDRESS}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-black/40 border-y border-primary/10">
        <div className="max-w-md mx-auto px-6 text-center">
          <h3 className="font-display text-2xl text-white/80 mb-6 tracking-widest">TIEMPO PARA EL PITAZO INICIAL</h3>
          <Countdown targetDate={EVENT_DATE} />
        </div>
      </section>

      {/* Protagonists Section */}
      <section className="py-20 px-6 max-w-md mx-auto">
        <h3 className="font-display text-4xl text-center mb-12 text-primary">LOS PROTAGONISTAS</h3>

        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-card/50 p-6 rounded-2xl border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-8xl">10</div>
            <div className="text-6xl drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">👧🏽⚽</div>
            <div>
              <h4 className="font-display text-3xl">{TWIN_GIRL}</h4>
              <p className="text-primary font-bold uppercase tracking-wider text-sm">Capitana</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-card/50 p-6 rounded-2xl border border-primary/20 relative overflow-hidden flex-row-reverse text-right"
          >
            <div className="absolute top-0 left-0 p-4 opacity-10 font-display text-8xl">9</div>
            <div className="text-6xl drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">👦🏽⚽</div>
            <div>
              <h4 className="font-display text-3xl">{TWIN_BOY}</h4>
              <p className="text-primary font-bold uppercase tracking-wider text-sm">Delantero</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-6 max-w-md mx-auto mb-20">
        <div className="bg-card border border-primary/30 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,215,0,0.15)]">
          <h3 className="font-display text-4xl text-center mb-2">CONVOCATORIA</h3>
          <p className="text-center text-muted-foreground mb-6 text-sm">
            Confirmá tu lugar en la tribuna por WhatsApp
          </p>

          <RSVPForm onConfirm={handleConfirm} />

          <WhatsAppConfig />
        </div>
      </section>
    </div>
  );
}
