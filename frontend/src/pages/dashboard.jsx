import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../services/taskService';
import TaskForm from '../components/task/TaskForm';
import TaskItem from '../components/task/TaskItem';
import TaskList from '../components/task/TaskList';
import { Box, Heading, Button, Stack, Spinner } from '@chakra-ui/react';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data.tasks);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData, token);
      fetchTasks(); // refresh task list
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await updateTask(taskId, updatedData, token);
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Your Tasks</Heading>
      <Button colorScheme="red" mb={6} onClick={handleLogout}>
        Logout
      </Button>
      <TaskForm onCreateTask={handleCreateTask} />
      {loading ? (
        <Spinner mt={6} />
      ) : (
      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      )}
    </Box>
  );
}
