import { Express } from 'express';

import sessionRoutes from './session.route';
import adminRoutes from './admin.route';
import userRoutes from './user.route';
import topicRoutes from './topic.route';

export default (app: Express) => {
  const routePrefix = '/api/v1';

  app.use(routePrefix, sessionRoutes);
  app.use(routePrefix, adminRoutes);
  app.use(routePrefix, userRoutes);
  app.use(routePrefix, topicRoutes);
};
