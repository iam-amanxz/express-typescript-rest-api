import { NextFunction, Request, Response } from 'express';

import sessionService from '../services/session.service';
import { signJWT, verifyJWT } from '../utils/jwt.util';

export default (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const session = sessionService.getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, '1h');

  res.cookie('accessToken', newAccessToken, {
    maxAge: 3.6e6, // 1 hr
    httpOnly: true,
  });

  // @ts-ignore
  req.user = verifyJWT(newAccessToken).payload;

  return next();
};
