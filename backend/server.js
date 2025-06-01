import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready, hello world");
});

connectDB();
app.listen(4500, () => {
  console.log("Server started at http://localhost:4500");
});


// test login json
/* 
{
  "email": "test@example.com",
  "password": "test123"
} 
  */

// login
// POST http://localhost:4500/api/users/login

// tasks
// http://localhost:4500/api/tasks