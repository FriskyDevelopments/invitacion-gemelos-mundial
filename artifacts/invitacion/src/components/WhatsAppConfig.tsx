import { useState, useEffect } from "react";

export const WA_NUMBER_KEY = "wa_organizer_number";

export function getWhatsAppNumber(): string {
  return localStorage.getItem(WA_NUMBER_KEY) ?? "";
}

export default function WhatsAppConfig() {
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInput(getWhatsAppNumber());
  }, []);

  const handleSave = () => {
    const clean = input.replace(/\D/g, "");
    localStorage.setItem(WA_NUMBER_KEY, clean);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mt-8 pt-5 border-t border-white/10">
      <p className="text-xs text-white/40 mb-3 text-center uppercase tracking-widest">
        ⚙️ Configuración del organizador
      </p>
      <p className="text-xs text-white/50 mb-3 text-center">
        Número de WhatsApp donde llegarán las confirmaciones
      </p>
      <div className="flex gap-2">
        <input
          type="tel"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="528112345678"
          className="flex-1 h-11 px-3 rounded-xl bg-background/50 border border-white/20 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/60 transition-colors"
        />
        <button
          onClick={handleSave}
          className="px-4 h-11 rounded-xl bg-primary/20 border border-primary/40 text-primary text-sm font-bold hover:bg-primary/30 active:scale-95 transition-all"
        >
          {saved ? "✓ Listo" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
