import { attachControllers } from '@decorators/express';
import { Router } from 'express';
import { AuthController } from './auth';
import { UserController } from './user/user.controller';

export const apiRouter = Router();

attachControllers(apiRouter, [UserController, AuthController]);
