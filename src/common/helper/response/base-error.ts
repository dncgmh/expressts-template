import { configService } from '../../config';
import { httpStatus, HttpStatusCode } from './http-status';

/**
 *
 *
 * @export
 * @class BaseError
 * @extends {Error}
 * @description customError
 */
export class BaseError extends Error {
  /**
   *Creates an instance of BaseError.
   * @param {Error} error
   * @memberof BaseError
   */
  id: string;
  error: string;
  _fields: Record<string, any>;
  _meta: Record<string, any>;
  constructor(readonly statusCode: HttpStatusCode, error?: { id: string; error: string }) {
    super();
    this.message = httpStatus[this.statusCode];
    this.id = error?.id;
    this.error = error?.error;
  }
  /**
   *
   * add fields with error
   * @param {Record<string, any>} fields
   * @return {this}
   * @memberof BaseError
   */
  fields(fields: Record<string, any>): this {
    this._fields = fields;
    return this;
  }
  /**
   *
   * add fields to this
   * @param {Record<string, any>} meta
   * @return {this}
   * @memberof BaseError
   */
  meta(meta: Record<string, any>): this {
    this._meta = meta;
    return this;
  }
  /**
   *
   * convert to pure object
   * @return {Record<any, any>}
   * @memberof BaseError
   */
  toObject(): Record<any, any> {
    const stack = configService.getEnv('NODE_ENV') !== 'production' ? this.stack : undefined;
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.error,
      id: this.id,
      fields: this._fields,
      stack,
      ...this._meta
    };
  }
}
