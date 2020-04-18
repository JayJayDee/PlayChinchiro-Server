import express from 'express';

import { wrapAsync } from './handlers';
import { logger } from '../logger';
import { createMySQLConnection } from '../mysql';

const log = logger({ tag: 'api' });

export const initApiServer =
  async () => {
    await createMySQLConnection();

    const app = express();
    app.get('/', wrapAsync(async (req, res) => {
      res.status(200).json({});
    }));

    log.info('api server initialized');
    return app;
  };