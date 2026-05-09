import { Router, type IRouter } from "express";
import { db, rsvpsTable } from "@workspace/db";
import { sum } from "drizzle-orm";
import { CreateRsvpBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/rsvps", async (req, res) => {
  try {
    const rsvps = await db.select().from(rsvpsTable).orderBy(rsvpsTable.createdAt);
    const totalResult = await db
      .select({ total: sum(rsvpsTable.count) })
      .from(rsvpsTable);
    const total = Number(totalResult[0]?.total ?? 0);
    res.json({ rsvps, total });
  } catch (err) {
    req.log.error({ err }, "Failed to list RSVPs");
    res.status(500).json({ error: "Error al obtener confirmaciones" });
  }
});

router.post("/rsvps", async (req, res) => {
  const parsed = CreateRsvpBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [rsvp] = await db
      .insert(rsvpsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(rsvp);
  } catch (err) {
    req.log.error({ err }, "Failed to create RSVP");
    res.status(500).json({ error: "Error al guardar confirmación" });
  }
});

export default router;
