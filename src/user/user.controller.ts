import { Injectable } from '@decorators/di';
import { Controller, Get, Request as Req, Response as Res } from '@decorators/express';
import { Request, Response } from 'express';
import { BaseResponse } from '../common/helper';

@Injectable()
@Controller('/user')
export class UserController {
  @Get('/me')
  async getData(@Req() req: Request, @Res() res: Response) {
    return new BaseResponse(req.user).json(res);
  }
}
