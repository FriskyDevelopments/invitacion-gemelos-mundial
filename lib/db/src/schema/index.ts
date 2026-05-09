import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const rsvpsTable = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  count: integer("count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRsvpSchema = createInsertSchema(rsvpsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvpsTable.$inferSelect;
