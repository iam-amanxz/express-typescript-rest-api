import code from 'http-status-codes';
import { validate } from 'class-validator';

import { EOnlineStatus, User } from '../entity/User.entity';
import { Exception } from '../utils/Exception';
import logger from '../server/logger';
import { Profile } from '../entity/Profile.entity';
import userService from '../services/user.service';

export class UserService {
  async getUserByUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(username, password) {
    const isExists = await this.getUserByUsername(username);
    if (isExists) {
      throw new Exception('username already exists', code.CONFLICT);
    }

    // construct user
    const user = new User({ username, password });

    // check if request body is valid
    const errors = await validate(user);
    if (errors.length > 0)
      throw new Exception(undefined, code.BAD_REQUEST, errors);

    // construct empty profile
    const profile = new Profile({});

    try {
      await profile.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }

    // create user
    try {
      user.profile = profile;
      return await user.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOnlineStatus(username: string, status: EOnlineStatus) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    user.onlineStatus = status;

    try {
      await user.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new UserService();
