// models/task.model.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true, index: true },
  task_desc: { type: String, maxlength: 500, default: "" },
  task_status: {
    type: String,
    enum: ['not started', 'in progress', 'completed'],
    default: 'not started',
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
