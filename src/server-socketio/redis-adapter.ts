import redisAdapter from 'socket.io-redis';

import { configOptional, configMandatory } from '../configurator';
import { logger } from '../logger';
import { ConfigurationError } from '../errors';
import { initRedisConnection } from '../redis';

const log = logger({ tag: 'redis-connector' });

const REDIS_PORT = configOptional<number>('REDIS_PORT', 6379);

export const initRedisAdapter =
  async () => {
    const REDIS_HOST = configMandatory<string>('REDIS_HOST');
    await initRedisConnection();

    log.info('redis-adapter initialized');
    return redisAdapter({
      host: REDIS_HOST,
      port: REDIS_PORT
    });
  };
