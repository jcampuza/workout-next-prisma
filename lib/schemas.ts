import { Mode } from '@prisma/client';
import z from 'zod';

export const patchUserStatsSchema = z.object({
  bench: z.number().int(),
  squat: z.number().int(),
  deadlift: z.number().int(),
  ohp: z.number().int(),
  mode: z.enum([Mode.KGS, Mode.LBS]),
});
