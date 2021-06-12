export const commonError = {
  NOT_FOUND: { id: 'NOT_FOUND', error: 'Not found' },
  ONLY_DEV: { id: 'ONLY_DEV', error: 'Only for development environment' },
  DISABLED: { id: 'DISABLED', error: 'Feature is disabled' },
  VALIDATE: { id: 'VALIDATE', error: 'The input is invalid' }
};
export const userError = {
  EMAIL_EXIST: { id: 'EMAIL_EXIST', error: 'This email already exist' },
  USERNAME_EXIST: { id: 'USERNAME_EXIST', error: 'This username already exist' },
  PASSWORD_INVALID: { id: 'PASSWORD_INVALID', error: 'Your password is invalid' },
  TOKEN_INVALID: { id: 'TOKEN_INVALID', error: 'The token is invalid' }
};

export const errorCode = {
  user: userError,
  common: commonError
};
