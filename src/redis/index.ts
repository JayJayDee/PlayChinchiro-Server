import { createClient, RedisClient } from 'redis';

import { logger } from '../logger';
import { cfgMandantory, cfgOptional } from '../configurator';
import { ConfigurationError } from '../errors';

const log = logger({ tag: 'redis-connector' });

let redisClient: RedisClient | null = null;

export const getRedisConnection = () => {
  if (!redisClient) {
    throw new ConfigurationError('init redis first');
  }
  return redisClient;
};

export const initRedisConnection = () =>
  new Promise((resolve, reject) => {
    if (redisClient) {
      return resolve();
    }

    const REDIS_HOST = cfgMandantory('REDIS_HOST');
    const REDIS_PORT = cfgOptional('REDIS_PORT', 6379);

    log.info(`establishing redis connnection... host:${REDIS_HOST}`);
    const client = createClient({
      host: REDIS_HOST,
      port: REDIS_PORT
    });
    client.on('ready', () => {
      log.info(`redis-connection ok.`);
      redisClient = client;
      resolve();
    });
    client.on('error', reject);
  });