import { Request, Response } from 'express';
import code from 'http-status-codes';

import userService from '../services/user.service';
import { errorResponse, successResponse } from '../utils/response.util';

export class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await userService.createUser(username, password);
      return successResponse(res, code.CREATED, user);
    } catch (e) {
      return errorResponse(res, e.code, e.message, e.errors);
    }
  }

  async updateOnlineStatus(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const { status } = req.params;

    try {
      await userService.updateOnlineStatus(username, +status);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }
}

export default new UserController();
