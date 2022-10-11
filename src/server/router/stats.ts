import { Mode, UserStats } from '@prisma/client';
import { createProtectedRouter } from './context';
import z from 'zod';
import { cache, CACHE_KEYS } from '../common/cache';

export const statsRouter = createProtectedRouter()
  .query('all', {
    async resolve({ ctx }): Promise<UserStats> {
      const cached = await cache.get<UserStats>(
        cache.getCacheKey(CACHE_KEYS.ALL_STATS, ctx.session.user.id)
      );

      console.log('CACHED ITEM', cached);

      if (cached) {
        return cached;
      }

      console.log('MAKING QUERY?', ctx.session.user.id);
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
    },
  });
