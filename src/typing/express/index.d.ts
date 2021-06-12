import { UserDocument } from '../../user/user.model';

declare module 'express' {
  interface Request {
    user?: UserDocument;
    params: any;
    query: any;
  }
}
