import jwt from 'jsonwebtoken';
import moment from 'moment';
import passport from 'passport';
import { authStrategy } from './jwt.strategy';
import { Payload } from './auth.interface';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import { configService } from '../common/config';

export const authService = {
  init() {
    try {
      passport.use('bearer', authStrategy);
    } catch (error) {
      logger.error(error);
    }
  },
  createToken({ _id, createdAt }: { _id?: string; createdAt: Date }) {
    const payload: Payload = {
      sub: _id,
      exp: moment().add(configService.getEnv('ACCESS_TOKEN_LIFE'), 's').unix(),
      iat: moment().unix(),
      createdAt
    };
    const accessToken = jwt.sign(payload, configService.getEnv('ACCESS_TOKEN_SECRET'));
    return {
      expiresIn: +configService.getEnv('ACCESS_TOKEN_LIFE'),
      accessToken
    };
  }
};
