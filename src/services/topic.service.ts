import code from 'http-status-codes';
import { validate } from 'class-validator';

import logger from '../server/logger';
import userService from './user.service';
import { Exception } from '../utils/Exception';
import { Topic, EModRole } from '../entity/Topic.entity';

export class TopicService {
  async createTopic(username: string, name: string) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    const topic = new Topic({ name });
    topic.moderators = [
      {
        username,
        role: EModRole.SUPERADMIN,
      },
    ];

    topic.members = [user];

    const errors = await validate(topic);
    if (errors.length > 0)
      throw new Exception(undefined, code.BAD_REQUEST, errors);

    try {
      return await topic.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async joinTopic(username: string, topicName: string) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    const topic = await Topic.findOne(
      { name: topicName },
      { relations: ['members'] },
    );
    if (!topic) throw new Exception('topic not found', code.NOT_FOUND);

    const { members } = topic;

    // todo
    if (members.indexOf(user) !== -1)
      throw new Exception('member already exists', code.CONFLICT);

    topic.members = [...members, user];

    try {
      return await topic.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }

  async leaveTopic(username: string, topicName: string) {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Exception('user not found', code.NOT_FOUND);

    const topic = await Topic.findOne(
      { name: topicName },
      { relations: ['members'] },
    );
    if (!topic) throw new Exception('topic not found', code.NOT_FOUND);

    const { members } = topic;

    // todo
    // cant leave if you are the only superadmin

    // todo
    // if (members.indexOf(user) === -1)
    //   throw new Exception('member does not exists', code.CONFLICT);

    topic.members = members.filter((member) => member.username !== username);

    try {
      return await topic.save();
    } catch (e) {
      logger.error(e);
      throw new Exception('something went wrong', code.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new TopicService();
