import express from 'express';

import { wrapAsync, errorHandler } from './handlers';
import { logger } from '../logger';
import { initMysqlConnection } from '../mysql';
import { initRedisConnection } from '../redis';

const log = logger({ tag: 'api' });

export const initApiServer =
  async () => {
    // initialize connections
    await initMysqlConnection();
    await initRedisConnection();

    // initialize express app
    const app = express();

    app.get('/', wrapAsync(async (req, res) => {
      res.status(200).json({});
    }));

    app.use(errorHandler());

    log.info('api server initialized');
    return app;
  };