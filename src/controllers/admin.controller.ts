import { Request, Response } from 'express';
import code from 'http-status-codes';

import adminService from '../services/admin.service';
import userService from '../services/user.service';
import { errorResponse, successResponse } from '../utils/response.util';

export class AdminController {
  async updateUserRole(req: Request, res: Response) {
    const { username, role } = req.params;

    try {
      await adminService.updateUserRole(username, +role);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { username } = req.params;

    try {
      await userService.deleteUser(username);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async getUser(req: Request, res: Response) {
    const { username } = req.params;

    try {
      const user = await userService.getUserByUsername(username);
      return successResponse(res, code.OK, user);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      return successResponse(res, code.OK, users);
    } catch (e) {
      return errorResponse(res, e.code, e.message);
    }
  }
}

export default new AdminController();
