import code from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { errorResponse } from '../utils/response.util';

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user)
    return errorResponse(res, code.UNAUTHORIZED, 'invalid session');

  return next();
};
