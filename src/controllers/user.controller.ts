import { Request, Response } from 'express';
import code from 'http-status-codes';
import { Profile } from '../entity/Profile.entity';

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

  async updatePassword(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const { password } = req.body;

    try {
      await userService.updatePassword(username, password);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async updateProfile(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const updates = req.body;

    try {
      const result = await userService.updateProfile(username, updates);
      return successResponse(res, code.OK, result);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;

    try {
      await userService.deleteUser(username);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async getUser(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;

    try {
      const user = await userService.getUserByUsername(username);
      return successResponse(res, code.OK, user);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }
}

export default new UserController();
