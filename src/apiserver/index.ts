import express from 'express';

export const initApiServer = () => {
  const app = express();
  return app;
};