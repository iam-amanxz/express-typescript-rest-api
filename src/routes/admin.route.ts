import { Router } from 'express';

import requireAdmin from '../middleware/requireAdmin';
import adminController from '../controllers/admin.controller';

const router = Router();

// change user role
router.put(
  '/admin/users/:username/role/:role',
  requireAdmin,
  adminController.updateUserRole,
);

// router.post('/users', userController.createUser);

export default router;
