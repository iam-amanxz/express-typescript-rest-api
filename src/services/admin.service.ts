import code from 'http-status-codes';

import { ERole } from '../entity/User.entity';
import { Exception } from '../utils/Exception';
import logger from '../server/logger';
import userService from '../services/user.service';

export class AdminService {
  async updateUserRole(username: string, role: ERole) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    user.role = role;

    try {
      await user.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new AdminService();
