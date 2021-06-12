import statuses from 'statuses';
import { Response as ExpressResponse } from 'express';

/**
 *
 *
 * @class BaseResponse
 * @description customResponse
 */
export class BaseResponse {
  private _statusCode = 200;
  private _meta: Record<string, any>;
  /**
   *Creates an instance of BaseResponse.
   * @param {Response} response
   * @memberof BaseResponse
   */
  constructor(private data: any, private message?: string) {}
  /**
   *
   * change status code
   * @param {number} statusCode
   * @memberof BaseResponse
   * @return {this}
   */
  statusCode(statusCode: number): this {
    this._statusCode = statusCode;
    return this;
  }
  /**
   *
   * add fields to this
   * @param {Record<string, any>} meta
   * @return {this}
   * @memberof BaseResponse
   */
  meta(meta: Record<string, any>): this {
    this._meta = meta;
    return this;
  }
  /**
   *
   * response to client
   * @param {ExpressResponse} res
   * @return {ExpressResponse}
   * @memberof BaseResponse
   */
  json(res: ExpressResponse): ExpressResponse {
    return res.status(this._statusCode).json({ data: this.data, message: this.message, ...this._meta });
  }
}
