import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { configService } from '../common/config';
import { userService } from '../user/user.service';
import { Payload } from './auth.interface';

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configService.getEnv('ACCESS_TOKEN_SECRET')
};

const jwt: VerifiedCallback = async (payload: Payload, done) => {
  try {
    const user = await userService.findOne({ _id: payload.sub });
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};
export const authStrategy = new JwtStrategy(jwtOptions, jwt);
