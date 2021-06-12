import speakeasy from 'speakeasy';

export class Authenticator {
  static generateSecret() {
    return speakeasy.generateSecret({ length: 20 });
  }
  static verify(token: string, secret: string) {
    return speakeasy.totp.verify({
      secret,
      token,
      encoding: 'base32'
    });
  }
}
