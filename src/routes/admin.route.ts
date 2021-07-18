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

// get user
router.get('/admin/users/:username', requireAdmin, adminController.getUser);

// delete user
router.delete(
  '/admin/users/:username',
  requireAdmin,
  adminController.deleteUser,
);

// delete user
router.get('/admin/users', requireAdmin, adminController.getUsers);

export default router;
