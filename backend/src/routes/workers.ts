import express from 'express';
import { authenticateToken } from '../middleware/auth';
// Import worker controllers here

const router = express.Router();

router.use(authenticateToken);

// Routes will be implemented here
// GET /api/workers - Get all workers
// GET /api/workers/:id - Get worker by ID

export default router;


