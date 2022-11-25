import { Mode, UserStats } from '@prisma/client';
import z from 'zod';
import { cache, CACHE_KEYS } from '../../common/cache';
import { protectedProcedure, router } from '../trpc';

export const statsRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const cached = await cache.get<UserStats>(
      cache.getCacheKey(CACHE_KEYS.ALL_STATS, ctx.session.user.id)
    );

    if (cached) {
      return cached;
    }

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

    await cache.set(cache.getCacheKey(CACHE_KEYS.ALL_STATS, ctx.session.user.id), results);

    return results;
  }),

  updateAll: protectedProcedure
    .input(
      z.object({
        bench: z.number().int(),
        squat: z.number().int(),
        deadlift: z.number().int(),
        ohp: z.number().int(),
        mode: z.enum([Mode.KGS, Mode.LBS]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userStats.upsert({
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

      await cache.invalidate(cache.getCacheKey(CACHE_KEYS.ALL_STATS, ctx.session.user.id));

      return res;
    }),
});
