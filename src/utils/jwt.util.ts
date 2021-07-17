import { sign, verify } from 'jsonwebtoken';

import appConfig from '../config/app.config';

export const signJWT = (payload: object, expiresIn: string | number) =>
  sign(payload, appConfig.jwtSecret, { algorithm: 'HS256', expiresIn });

export const verifyJWT = (token: string) => {
  try {
    const decoded = verify(token, appConfig.jwtSecret);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes('jwt expired') };
  }
};
