// routes/task.routes.js
import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();


// Create task
router.post('/', verifyToken, createTask); 

// Route to get all tasks
router.get('/', verifyToken, getTasks);

// Get specific task
router.get('/:id', verifyToken, getTaskById);

// Update task
router.put('/:id', verifyToken, updateTask);

// Delete Task
router.delete('/:id', verifyToken, deleteTask);




export default router;
