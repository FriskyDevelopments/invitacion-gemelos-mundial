import { useEffect, useState } from "react";

const EMOJIS = ["⚽", "🏆", "🎉", "🏅", "🎊", "🏴", "🇦🇷", "🇧🇷", "🇲🇽", "🇫🇷"];
const COLORS = ["#FFD700", "#ffffff", "#ff0000", "#00cc44", "#ff6600", "#00aaff"];

interface Particle {
  id: number;
  x: number;
  delay: number;
  size: number;
  color: string;
  isEmoji: boolean;
  emoji: string;
  duration: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: i < 15 ? Math.random() * 14 + 16 : Math.random() * 10 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isEmoji: i < 20,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      duration: 3 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>
        {`
          @keyframes fall {
            0%   { transform: translateY(-10vh) rotate(0deg);   opacity: 1; }
            80%  { opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
          @keyframes fallEmoji {
            0%   { transform: translateY(-10vh) scale(1);   opacity: 1; }
            50%  { transform: translateY(50vh)  scale(1.2); opacity: 1; }
            100% { transform: translateY(110vh) scale(0.8); opacity: 0; }
          }
        `}
      </style>
      {particles.map((p) =>
        p.isEmoji ? (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: "-10%",
              fontSize: `${p.size}px`,
              animation: `fallEmoji ${p.duration}s ease-in ${p.delay}s infinite`,
              userSelect: "none",
            }}
          >
            {p.emoji}
          </div>
        ) : (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: "-10%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
              borderRadius: p.id % 2 === 0 ? "50%" : "0%",
            }}
          />
        )
      )}
    </div>
  );
}
