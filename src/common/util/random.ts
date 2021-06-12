import cryptoRand, { Options } from 'crypto-random-string';

interface Params {
  (options: Options): string;
  (type: 'password' | 'token' | 'PIN'): string;
}
export const random: Params = (params: string | Options) => {
  if (typeof params === 'object') return cryptoRand(params);
  if (typeof params === 'string') {
    if (params === 'password') return cryptoRand({ type: 'base64', length: 12 });
    if (params === 'token') return cryptoRand({ type: 'url-safe', length: 28 });
    if (params === 'PIN') return cryptoRand({ characters: '1234567890', length: 6 });
  }
};
