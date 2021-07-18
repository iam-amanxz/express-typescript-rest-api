import { Router } from 'express';

import requireAuth from '../middleware/requireAuth';
import userController from '../controllers/user.controller';

const router = Router();

// create user
router.post('/users', userController.createUser);

// update online status
router.put(
  '/users/me/status/:status',
  requireAuth,
  userController.updateOnlineStatus,
);

// update password
router.put('/users/me/password', requireAuth, userController.updatePassword);

// update profile
router.put('/users/me/profile', requireAuth, userController.updateProfile);

// delete user
router.delete('/users/me', requireAuth, userController.deleteUser);

// get user
router.get('/users/me', requireAuth, userController.getUser);

export default router;
