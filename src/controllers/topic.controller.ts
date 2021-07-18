import { Request, Response } from 'express';
import code from 'http-status-codes';

import topicService from '../services/topic.service';
import { errorResponse, successResponse } from '../utils/response.util';

export class TopicController {
  async createTopic(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const { name } = req.body;

    try {
      const topic = await topicService.createTopic(username, name);
      return successResponse(res, code.OK, topic);
    } catch (e) {
      return errorResponse(res, e.code, e.message, e.errors);
    }
  }

  async joinTopic(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const { topic } = req.params;

    try {
      await topicService.joinTopic(username, topic);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message, e.errors);
    }
  }

  async leaveTopic(req: Request, res: Response) {
    // @ts-ignore
    const { username } = req.user;
    const { topic } = req.params;

    try {
      await topicService.leaveTopic(username, topic);
      return successResponse(res, code.OK);
    } catch (e) {
      return errorResponse(res, e.code, e.message, e.errors);
    }
  }
}

export default new TopicController();
