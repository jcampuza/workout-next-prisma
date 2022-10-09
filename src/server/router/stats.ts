import { Mode, UserStats } from '@prisma/client';
import { createProtectedRouter } from './context';
import z from 'zod';

export const statsRouter = createProtectedRouter()
  .query('all', {
    async resolve({ ctx }): Promise<UserStats> {
      const results = await ctx.prisma.userStats.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!results) {
        return {
          id: '',
          bench: 0,
          squat: 0,
          deadlift: 0,
          ohp: 0,
          mode: Mode.LBS,
          userId: ctx.session.user.id,
          updatedAt: new Date(),
        };
      }

      return results;
    },
  })
  .mutation('updateAll', {
    input: z.object({
      bench: z.number().int(),
      squat: z.number().int(),
      deadlift: z.number().int(),
      ohp: z.number().int(),
      mode: z.enum([Mode.KGS, Mode.LBS]),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.userStats.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        create: {
          bench: input.bench,
          squat: input.squat,
          deadlift: input.deadlift,
          ohp: input.ohp,
          mode: input.mode,
          userId: ctx.session.user.id,
        },
        update: {
          bench: input.bench,
          squat: input.squat,
          deadlift: input.deadlift,
          ohp: input.ohp,
          mode: input.mode,
        },
      });
    },
  });
