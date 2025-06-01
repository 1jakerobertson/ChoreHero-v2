import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { task_name, task_desc, task_status } = req.body;

    if (!task_name || !task_status) {
      return res.status(400).json({ message: "Please fill in the required fields." });
    }

    const newTask = await Task.create({
      task_name,
      task_desc,
      task_status,
      createdBy: req.user.id, // ✅ associate task with the authenticated user
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

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware attaches user info
    const tasks = await Task.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task_name, task_desc, task_status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { task_name, task_desc, task_status },
      { new: true } // return the updated doc
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};