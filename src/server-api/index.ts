import express, { json } from 'express';

import { wrapAsync, errorHandler } from './handlers';
import { logger } from '../logger';
import { initMysqlConnection } from '../mysql';
import { initRedisConnection } from '../redis';
import { memberRouter } from './routers';

const log = logger({ tag: 'api' });

export const initApiServer =
  async () => {
    // initialize connections
    await initMysqlConnection();
    await initRedisConnection();

    // initialize express app
    const app = express();
    app.use(json());

    app.use(memberRouter());
    app.use(errorHandler());

    log.info('api server initialized');
    return app;
  };