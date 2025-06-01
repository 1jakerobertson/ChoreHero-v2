import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { task_name, task_desc, task_status } = req.body;

    if (!task_name || !task_desc || !task_status) {
      return res.status(400).json({ message: "Please fill in the required fields." });
    }

    const newTask = await Task.create({
      task_name,
      task_desc,
      task_status,
    });

    res.status(201).json({
      message: "Task created successfully!",
      task: newTask,
    });
  } catch (error) {
    console.error("❌ Task creation error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};