import { Request } from 'express';
import morgan from 'morgan';
import { logger } from './logger';

export const requestLogger: any = morgan(function (tokens, req: Request, res): any {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const responseTime = tokens['response-time'](req, res);
  const message = `${method} ${res.statusCode} ${url} ${responseTime + ' ms'}`;
  logger.info(
    `%s %s`,
    message,
    JSON.stringify({
      body: req.body,
      ...(req.user ? { user_id: req.user.id, username: req.user.username } : {})
    })
  );
});
