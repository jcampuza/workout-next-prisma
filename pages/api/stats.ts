import { authOptions } from '@/lib/auth';
import { cache, CACHE_KEYS } from '@/lib/cache';
import { db } from '@/lib/db';
import { patchUserStatsSchema } from '@/lib/schemas';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ZodError } from 'zod';

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'PATCH') {
    try {
      const input = patchUserStatsSchema.parse(req.body);

      const response = await db.userStats.upsert({
        where: {
          userId: session.user.id,
        },
        create: {
          bench: input.bench,
          squat: input.squat,
          deadlift: input.deadlift,
          ohp: input.ohp,
          mode: input.mode,
          userId: session.user.id,
        },
        update: {
          bench: input.bench,
          squat: input.squat,
          deadlift: input.deadlift,
          ohp: input.ohp,
          mode: input.mode,
        },
      });

      await cache.invalidate(cache.getCacheKey(CACHE_KEYS.ALL_STATS, session.user.id));

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
};

export default handler;
