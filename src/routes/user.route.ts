import { Router } from 'express';

import requireAuth from '../middleware/requireAuth';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/users', userController.createUser);
router.put(
  '/users/status/:status',
  requireAuth,
  userController.updateOnlineStatus,
);

export default router;
