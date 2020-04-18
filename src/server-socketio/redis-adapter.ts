import redisAdapter from 'socket.io-redis';
import { createClient } from 'redis';

import { cfgOptional } from '../configurator';
import { logger } from '../logger';
import { ConfigurationError } from '../errors';

const log = logger({ tag: 'redis-connector' });

const REDIS_HOST = cfgOptional('REDIS_HOST', null);
const REDIS_PORT = cfgOptional('REDIS_PORT', 6379);

const inspectRedisConnection =
  () =>
    new Promise((resolve, reject) => {
      log.info(`establishing redis connnection... host:${REDIS_HOST}`);
      const client = createClient({
        host: REDIS_HOST,
        port: REDIS_PORT
      });
      client.on('ready', () => {
        log.info(`redis-connection ok.`);
        resolve();
      });
      client.on('error', reject);
    });

export const initRedisAdapter =
  async () => {
    if (!REDIS_HOST) {
      throw new ConfigurationError('REDIS_HOST is mandantory');
    }
    await inspectRedisConnection();

    log.info('redis-adapter initialized');
    return redisAdapter({
      host: REDIS_HOST,
      port: REDIS_PORT
    });
  };
