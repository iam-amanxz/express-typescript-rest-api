import { Router } from 'express';
import topicController from '../controllers/topic.controller';

import requireAuth from '../middleware/requireAuth';

const router = Router();

// create topic
router.post('/topics', requireAuth, topicController.createTopic);

// join topic
router.post('/topics/:topic/join/me', requireAuth, topicController.joinTopic);

// leave topic -> cant leave if you are the only superadmin
router.post('/topics/:topic/leave/me', requireAuth, topicController.leaveTopic);

// TODO:
// update topic -> role from role.mod

// add mod to topic -> role from role.admin

// remove mod from topic -> role from role.admin

// add admin / superadmin -> role.superadmin

// remove topic -> role.superadmin

export default router;
