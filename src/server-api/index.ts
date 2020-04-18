import express from 'express';
import { wrapAsync } from './handlers';

export const initApiServer =
  async () => {
    const app = express();
    app.get('/', wrapAsync(async (req, res) => {
      res.status(200).json({});
    }));
    return app;
  };