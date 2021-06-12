import { logger } from '@typegoose/typegoose/lib/logSettings';
import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../util';

export const errorCatcher = (req: Request, res: Response, next: NextFunction) => {
  next(new BaseError(404));
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) res.status(error.statusCode).json(error.toObject());
  else {
    logger.error(error);
    const internalError = new BaseError(500);
    res.status(internalError.statusCode).json(internalError.toObject());
  }
};
