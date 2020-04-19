import { ErrorRequestHandler } from 'express';

export const errorHandler = (): ErrorRequestHandler =>
  async (err, req, res, next) => {
    // TODO: error handler must be implemented
    next(err);
  };
