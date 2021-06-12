import express from 'express';
import { requestLogger } from './common/helper';
import { errorCatcher, errorHandler } from './common/middleware';
import { apiRouter } from './routes';

export function init() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(requestLogger);

  app.use('/v1/api', apiRouter);


  app.use(errorCatcher, errorHandler);
  return app;
}
