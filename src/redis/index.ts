import Redis from 'ioredis';
import config from '../config';

const redis =
  config.redis.mode === 'cluster'
    ? new Redis.Cluster(
        [
          {
            port: config.redis.port,
            host: config.redis.host,
          },
        ],
        {
          redisOptions: {
            password: config.redis.password,
          },
        }
      )
    : new Redis({
        port: config.redis.port,
        host: config.redis.host,
        password: config.redis.password,
      });

export default redis;
