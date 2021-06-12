import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export function isAuthorized() {
  return AuthorizedMiddleware;
}

class AuthorizedMiddleware implements Middleware {
  public use(request: Request, response: Response, next: NextFunction) {
    return passport.authenticate('bearer', { session: false })(request, response, next);
  }
}
