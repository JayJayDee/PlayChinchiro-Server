import express from 'express';

import { wrapAsync } from './handlers';
import { logger } from '../logger';
import { initMysqlConnection } from '../mysql';
import { initRedisConnection } from '../redis';

const log = logger({ tag: 'api' });

export const initApiServer =
  async () => {
    // initialize connections
    await initMysqlConnection();
    await initRedisConnection();

    // regiseter express-endpoints
    const app = express();
    app.get('/', wrapAsync(async (req, res) => {
      res.status(200).json({});
    }));

    log.info('api server initialized');
    return app;
  };