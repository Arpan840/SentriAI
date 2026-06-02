import Redis  from 'ioredis';

export function createRedisClient() {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = Number(process.env.REDIS_PORT || '777');
  const redisPassword = process.env.REDIS_PASSWORD || undefined;
  const redis = new Redis({
    host: redisHost,
    port: redisPort,
    password: redisPassword,
  })
    redis.on('error', (err) => {
        console.error('Redis connection error:', err);
    });
    redis.on('connect', () => {
        console.log('Connected to Redis successfully:', redisHost + ':' + redisPort);
    });
    return redis
}