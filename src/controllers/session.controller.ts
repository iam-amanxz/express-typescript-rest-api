import code from 'http-status-codes';
import { Request, Response } from 'express';
import { compare } from 'bcrypt';

import userService from '../services/user.service';
import { createSession, invalidateSession } from '../services/session.service';
import { signJWT } from '../utils/jwt.util';
import { errorResponse, successResponse } from '../utils/response.util';

export class SessionController {
  async createSession(req: Request, res: Response) {
    // get username and password from body
    const { username, password } = req.body;

    // check if user exists in database
    const user = await userService.getUserByUsername(username);

    // if user doesn't exists
    if (!user)
      return errorResponse(res, code.UNAUTHORIZED, 'invalid credentials');

    // check if password matches db entry
    const isMatch = await compare(password, user.password);

    // if password doesn't match
    if (!isMatch)
      return errorResponse(res, code.UNAUTHORIZED, 'invalid credentials');

    // create session
    const session = createSession(user.id, username);

    // create access token
    const accessToken = signJWT(
      {
        userId: user.id,
        username: user.username,
        sessionId: session.sessionId,
      },
      '1hr',
    );

    // create refresh token
    const refreshToken = signJWT({ sessionId: session.sessionId }, '1y');

    // set access token in cookie
    res.cookie('accessToken', accessToken, {
      maxAge: 3.6e6, // 1 hr
      httpOnly: true,
    });

    // set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
    });

    // return session
    return successResponse(res, code.OK, session);
  }

  getSession(req: Request, res: Response) {
    // @ts-ignore
    return successResponse(res, code.OK, req.user);
  }

  deleteSession(req: Request, res: Response) {
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });

    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    });

    // @ts-ignore
    invalidateSession(req.user.sessionId);

    return successResponse(res, code.OK);
  }
}

export default new SessionController();
