// routes/task.routes.js
import express from 'express';
import { createTask } from '../controllers/task.controller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createTask); // Protected

export default router;
