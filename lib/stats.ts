import { cache, CACHE_KEYS } from '@/lib/cache';
import { db } from '@/lib/db';
import { Mode, UserStats } from '@prisma/client';
import { User } from 'next-auth';

export const getUserStats = async (user: User) => {
  const cached = await cache.get<UserStats>(cache.getCacheKey(CACHE_KEYS.ALL_STATS, user.id));

  if (cached) {
    return cached;
  }

  const results = await db.userStats.findFirst({
    where: {
      userId: user.id,
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
      userId: user.id,
      updatedAt: new Date(),
    };
  }

  await cache.set(cache.getCacheKey(CACHE_KEYS.ALL_STATS, user.id), results);

  return results;
};
