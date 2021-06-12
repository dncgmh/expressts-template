import { extendService } from '../common/helper';
import { userModel } from './user.model';

export const userService = {
  ...extendService(userModel)
};
