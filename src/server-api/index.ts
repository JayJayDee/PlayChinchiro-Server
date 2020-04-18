import express from 'express';

import { wrapAsync } from './handlers';
import { logger } from '../logger';

const log = logger({ tag: 'api' });

export const initApiServer =
  async () => {
    const app = express();
    app.get('/', wrapAsync(async (req, res) => {
      res.status(200).json({});
    }));

    log.info('api server initialized');
    return app;
  };