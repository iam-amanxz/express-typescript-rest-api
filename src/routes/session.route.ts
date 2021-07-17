import { Router } from 'express';

import requireAuth from '../middleware/requireAuth';
import sessionController from '../controllers/session.controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('ok');
});

router.post('/sessions', sessionController.createSession);
router.get('/session', requireAuth, sessionController.getSession);
router.delete('/session', requireAuth, sessionController.deleteSession);

export default router;
