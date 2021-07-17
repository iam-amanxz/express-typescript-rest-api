import { Request, Response } from 'express';
import code from 'http-status-codes';

import adminService from '../services/admin.service';
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
}

export default new AdminController();
