import code from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { errorResponse } from '../utils/response.util';
import userService from '../services/user.service';
import { ERole } from '../entity/User.entity';

export default async (req: Request, res: Response, next: NextFunction) => {
  // not logged in
  // @ts-ignore
  if (!req.user)
    return errorResponse(res, code.UNAUTHORIZED, 'invalid session');

  // somehow user is deleted from db
  // @ts-ignore
  const user = await userService.getUserByUsername(req.user.username);
  if (!user) errorResponse(res, code.UNAUTHORIZED, 'invalid session');

  // not admin
  if (user.role !== ERole.ADMIN)
    return errorResponse(res, code.FORBIDDEN, 'unauthorized');

  return next();
};
