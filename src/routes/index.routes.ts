import { Router } from 'express';
import promotorRoutes from './promotor.routes';
import supervisorRoutes from './supervisor.routes';
import { logMiddleware } from "../middleware/logs.middleware"

const router = Router();
router.use(logMiddleware);

// WEB - Supervisor
router.use('/supervisor', supervisorRoutes);

// MOBILE - Promotor
router.use('/promotor', promotorRoutes);

export default router;
