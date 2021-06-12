export interface Payload {
  sub: string;
  exp: number;
  iat: number;
  createdAt: Date;
}

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh'
}
