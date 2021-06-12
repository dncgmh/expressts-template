import { Middleware } from '@decorators/express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BaseError, errorCode } from '../helper';

export type ReqType = 'body' | 'headers' | 'params' | 'query';

export const isValid = (
  dto: ClassConstructor<object>,
  type: ReqType = 'body',
  validatorOptions: ValidatorOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: true
  }
) => {
  return class Validator implements Middleware {
    use = validateData({ dto, type, validatorOptions });
  };
};

const validateData =
  ({
    dto,
    type,
    validatorOptions
  }: {
    dto: ClassConstructor<object>;
    type: string;
    validatorOptions: ValidatorOptions;
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const object = plainToClass(dto, req[type]);
      const errors = await validate(object, validatorOptions);
      if (errors.length) {
        const errorTransformed = {};
        errors.map((el) => {
          el.constraints &&
            Object.assign(errorTransformed, { [el.property]: Object.values(el.constraints).join(', ') });
          while (el?.children?.length) {
            Object.assign(errorTransformed, { [el.property]: {} });
            el.children.map((child) => {
              child.constraints &&
                Object.assign(errorTransformed[el.property], {
                  [child.property]: Object.values(child.constraints).join(', ')
                });
              el.children = child.children;
            });
          }
        });
        throw new BaseError(400, errorCode.common.VALIDATE).fields(errorTransformed);
      }
      req[type] = object;
      return next();
    } catch (error) {
      next(error);
    }
  };
