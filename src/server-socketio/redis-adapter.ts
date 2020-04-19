import redisAdapter from 'socket.io-redis';

import { cfgOptional } from '../configurator';
import { logger } from '../logger';
import { ConfigurationError } from '../errors';
import { initRedisConnection } from '../redis';

const log = logger({ tag: 'redis-connector' });

const REDIS_HOST = cfgOptional('REDIS_HOST', null);
const REDIS_PORT = cfgOptional('REDIS_PORT', 6379);

export const initRedisAdapter =
  async () => {
    if (!REDIS_HOST) {
      throw new ConfigurationError('REDIS_HOST is mandantory');
    }
    await initRedisConnection();

    log.info('redis-adapter initialized');
    return redisAdapter({
      host: REDIS_HOST,
      port: REDIS_PORT
    });
  };
