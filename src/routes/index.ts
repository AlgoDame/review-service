import { Application, Router } from 'express';
import reviewerRoutes from './v1/reviewer.route';

export const loadRoutes = (app: Application): Router => {
  const router = Router();

  // Register all routes here
  router.use('/reviewers', reviewerRoutes);

  return router;
};
