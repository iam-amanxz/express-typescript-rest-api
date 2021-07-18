import code from 'http-status-codes';
import { validate } from 'class-validator';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { genSalt, hash } from 'bcrypt';
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

  async getUsers() {
    try {
      return await User.find();
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

  async updatePassword(username: string, password: string) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    try {
      await User.update({ username }, { password: hashedPassword });
    } catch (e) {
      logger.error(e);
      if (e.message.includes('No entity column'))
        throw new Exception('illegal entry', code.BAD_REQUEST);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async updateProfile(
    username: string,
    updates: QueryDeepPartialEntity<Profile>,
  ) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    try {
      await Profile.update({ id: user.profile.id }, updates);
      return await userService.getUserByUsername(username);
    } catch (e) {
      logger.error(e);
      if (e.message.includes('No entity column'))
        throw new Exception('illegal entry', code.BAD_REQUEST);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(username: string) {
    const user = await this.getUserByUsername(username);

    try {
      await user.remove();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }

    try {
      await Profile.delete({ id: user.profile.id });
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new UserService();
