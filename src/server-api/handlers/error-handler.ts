import { ErrorRequestHandler } from 'express';

import { CcrApiError } from '../../errors';

export const errorHandler = (): ErrorRequestHandler =>
  async (err, req, res, next) => {
    if (err instanceof CcrApiError) {
      return res.status(err.statusCode).json({
        code: err.code,
        message: err.message
      });
    }

    console.error(err);
    return res.status(500).json({
      code: 'UNEXPECTED_SERVER_ERROR',
      message: err.message
    });
  };
