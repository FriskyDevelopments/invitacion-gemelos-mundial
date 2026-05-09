import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = targetDate.getTime() - new Date().getTime() <= 0;

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center justify-center bg-card/80 border border-primary/30 rounded-lg p-3 w-20">
      <span className="font-display text-3xl text-primary">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );

  if (isExpired) {
    return (
      <p className="font-display text-3xl text-primary animate-pulse">
        ¡Hoy es el gran día!
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-3">
      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="text-primary font-display text-3xl pt-2">:</div>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <div className="text-primary font-display text-3xl pt-2">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-primary font-display text-3xl pt-2">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}