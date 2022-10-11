import { redis } from './redis';

export const CACHE_KEYS = {
  ALL_STATS: 'ALL_STATS',
} as const;

type CACHE_KEY = typeof CACHE_KEYS[keyof typeof CACHE_KEYS];

const set = async (key: string, data: unknown) => {
  await redis.set(key, data);
};

const get = async <T>(key: string) => {
  const item = await redis.get<T>(key);
  return item;
};

const flush = async () => {
  await redis.flushall();
};

const invalidate = async (key: string) => {
  await redis.del(key);
};

const getCacheKey = (keyConst: CACHE_KEY, params: string) => {
  return `${keyConst}/${params}`;
};

export const cache = {
  set,
  get,
  flush,
  invalidate,
  getCacheKey,
};
