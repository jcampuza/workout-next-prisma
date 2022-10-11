import { Redis } from '@upstash/redis/with-fetch';

const { REDIS_ENDPOINT, REDIS_PASSWORD } = process.env;

if (!REDIS_ENDPOINT || !REDIS_PASSWORD) {
  console.error('Invalid REDIS_ENDPOINT or REDIS_PASSWORD');
  process.exit(1);
}

const redis = new Redis({
  url: REDIS_ENDPOINT,
  token: REDIS_PASSWORD,
});

(async () => {
  console.log('flushing');
  try {
    await redis.flushall();
  } catch (err) {
    console.error(err, 'FAILED TO FLUSH');
  }
})();
