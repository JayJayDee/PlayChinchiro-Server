import { sign } from 'jsonwebtoken';

import { configMandatory } from '../../configurator';

const AUTH_PRIVATE_KEY = configMandatory<string>('AUTH_PRIVATE_KEY');
const AUTH_JWT_EXPIRES = configMandatory<number>('AUTH_JWT_EXPIRES');

export const generateJwt =
  ({ id, nick, loginId }: {
    id: number,
    nick: string,
    loginId: string
  }) =>
    sign({
      sub: id,
      user: {
        nick,
        loginId
      }
    }, AUTH_PRIVATE_KEY, {
      expiresIn: `${AUTH_JWT_EXPIRES}s`
    });
