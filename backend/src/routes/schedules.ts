import express from 'express';
import { authenticateToken } from '../middleware/auth';
// Import schedule controllers here

const router = express.Router();

router.use(authenticateToken);

// Routes will be implemented here
// GET /api/schedules - Get user's schedule
// POST /api/schedules - Create/update schedule
// GET /api/schedules/:workerId - Get worker's schedule

export default router;


