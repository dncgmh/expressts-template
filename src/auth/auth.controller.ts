import { Body, Controller, Get, Post, Request as Req, Response as Res } from '@decorators/express';
import { Request, Response, Router } from 'express';
import { isValid } from '../common/middleware';
import { BaseError, BaseResponse, errorCode } from '../common/helper';
import { userService } from '../user/user.service';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import { isAuthorized } from './auth.middleware';
import { authService } from './auth.service';

export const authRoutes: Router = Router();

@Controller('/auth')
export class AuthController {
  @Get('/', [isAuthorized()])
  getAuth(@Req() req: Request, @Res() res) {
    return new BaseResponse(req.user.transform()).json(res);
  }

  @Post('/login', [isValid(LoginUserDto)])
  async login(@Req() req: Request, @Res() res: Response, @Body() userLogin: LoginUserDto) {
    const user = await userService.findOne({ email: userLogin.email });
    if (user && user.comparePassword(userLogin.password)) {
      const token = authService.createToken(user._id);
      return new BaseResponse({ ...user.transform(), token }).json(res);
    } else throw new BaseError(400, errorCode.user.PASSWORD_INVALID);
  }

  @Post('/register', [isValid(RegisterUserDto)])
  async register(@Req() req: Request, @Res() res: Response, @Body() user: RegisterUserDto) {
    const isExistedUser = await userService.findOne({
      $or: [{ username: user.username.toLowerCase() }, { email: user.email.toLowerCase() }]
    });
    if (isExistedUser) {
      if (isExistedUser.email === user.email.toLowerCase()) throw new BaseError(400, errorCode.user.EMAIL_EXIST);
      if (isExistedUser.username === user.username.toLowerCase())
        throw new BaseError(400, errorCode.user.USERNAME_EXIST);
    }
    const newUser = await userService.create(user);

    return new BaseResponse(newUser).json(res);
  }
}
