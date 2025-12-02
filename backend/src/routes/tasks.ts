import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth';
// Import task controllers here

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Routes will be implemented here
// GET /api/tasks - Get all tasks
// POST /api/tasks - Create task (admin only)
// PUT /api/tasks/:id - Update task
// DELETE /api/tasks/:id - Delete task (admin only)

export default router;


