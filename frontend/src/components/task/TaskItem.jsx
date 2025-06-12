import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const [task_name, setTaskName] = useState(task.task_name);
  const [task_desc, setTaskDesc] = useState(task.task_desc);
  const [task_status, setTaskStatus] = useState(task.task_status);

  const handleUpdate = () => {
    onUpdateTask(task._id, { task_name, task_desc, task_status });
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  return (
    <Box borderWidth={1} p={4} borderRadius="md" boxShadow="sm">
      <Stack spacing={3}>
        <Text fontWeight="bold">Task ID: {task._id}</Text>
        <FormControl>
          <FormLabel>Task Name</FormLabel>
          <Input value={task_name} onChange={(e) => setTaskName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Task Description</FormLabel>
          <Input value={task_desc} onChange={(e) => setTaskDesc(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select value={task_status} onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update Task
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete Task
        </Button>
      </Stack>
    </Box>
  );
}
