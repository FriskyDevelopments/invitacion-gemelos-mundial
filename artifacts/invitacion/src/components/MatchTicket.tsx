import { TWINS_NAMES, EVENT_DATE_DISPLAY } from "@/lib/eventConfig";

interface MatchTicketProps {
  name: string;
  count: number;
}

export default function MatchTicket({ name, count }: MatchTicketProps) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -rotate-2">
      {/* Top section - dark */}
      <div className="bg-sidebar p-4 border-b-2 border-dashed border-gray-300 relative">
        <div className="flex justify-between items-center text-primary">
          <span className="font-display tracking-widest">ENTRADA OFICIAL</span>
          <span className="font-display tracking-widest">VIP</span>
        </div>
        {/* Cutouts for ticket effect */}
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-background rounded-full"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-background rounded-full"></div>
      </div>
      
      {/* Middle section - white */}
      <div className="bg-white p-6 text-black relative">
        <div className="text-center mb-6">
          <h3 className="font-display text-4xl text-black">{TWINS_NAMES}</h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Cumpleaños Mundial</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Invitado</p>
            <p className="font-bold text-lg leading-tight uppercase truncate">{name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Asistentes</p>
              <p className="font-bold text-lg">{count}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Fecha</p>
              <p className="font-bold text-lg">{EVENT_DATE_DISPLAY}</p>
            </div>
          </div>
        </div>

        {/* Barcode placeholder */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px)] opacity-50"></div>
          <p className="text-center text-[10px] text-gray-400 mt-1 font-mono tracking-widest">000000000000</p>
        </div>
      </div>
    </div>
  );
}