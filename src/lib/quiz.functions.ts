import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const deviceSchema = z.object({ deviceId: z.string().uuid() });
const answersSchema = z.record(z.string().max(20), z.number().int().min(1).max(5));

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const getProgress = createServerFn({ method: "POST" })
  .inputValidator((d) => deviceSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row, error } = await db
      .from("quiz_progress")
      .select("answers")
      .eq("device_id", data.deviceId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row?.answers ?? null) as Record<string, number> | null;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .inputValidator((d) => deviceSchema.extend({ answers: answersSchema }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { error } = await db
      .from("quiz_progress")
      .upsert({ device_id: data.deviceId, answers: data.answers });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const clearProgress = createServerFn({ method: "POST" })
  .inputValidator((d) => deviceSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { error } = await db.from("quiz_progress").delete().eq("device_id", data.deviceId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveResult = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    deviceSchema
      .extend({ typeCode: z.string().regex(/^[EI][SN][TF][JP]$/), answers: answersSchema })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { error } = await db.from("quiz_results").insert({
      device_id: data.deviceId,
      type_code: data.typeCode,
      answers: data.answers,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listResults = createServerFn({ method: "POST" })
  .inputValidator((d) => deviceSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: rows, error } = await db
      .from("quiz_results")
      .select("id, type_code, created_at")
      .eq("device_id", data.deviceId)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
