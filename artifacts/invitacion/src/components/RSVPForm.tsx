import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getWhatsAppNumber } from "@/components/WhatsAppConfig";

const formSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo"),
  count: z.coerce.number().min(1, "Mínimo 1 persona").max(10, "Máximo 10 personas"),
});

interface RSVPFormProps {
  onConfirm: (name: string, count: number) => void;
}

export default function RSVPForm({ onConfirm }: RSVPFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", count: 1 },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const number = getWhatsAppNumber();
    const message = `¡Hola! Confirmo mi asistencia al festejo de Dulce & Tadeo 🎉⚽\n\nNombre: ${values.name}\nPersonas: ${values.count}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onConfirm(values.name, values.count);
  }

  const waNumber = getWhatsAppNumber();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Lionel Messi"
                  autoComplete="name"
                  autoCorrect="off"
                  autoCapitalize="words"
                  inputMode="text"
                  {...field}
                  className="bg-background/50 border-primary/30 focus-visible:ring-primary font-sans h-12 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">¿Cuántos asisten?</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  {...field}
                  className="bg-background/50 border-primary/30 focus-visible:ring-primary font-sans h-12 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!waNumber && (
          <p className="text-xs text-yellow-400/80 text-center">
            ⚠️ El organizador aún no ha configurado el número de WhatsApp
          </p>
        )}

        <Button
          type="submit"
          disabled={!waNumber}
          className="w-full h-14 font-display text-2xl tracking-wider hover-elevate shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          📲 CONFIRMAR POR WHATSAPP
        </Button>
      </form>
    </Form>
  );
}
