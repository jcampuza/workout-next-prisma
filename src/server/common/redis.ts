import { Redis } from '@upstash/redis';
import { env } from '../../env/server';

export const redis = new Redis({
  url: env.REDIS_ENDPOINT,
  token: env.REDIS_PASSWORD,
});
