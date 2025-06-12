import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';

export default function TaskForm({ onCreateTask }) {
  const [task_name, setTaskName] = useState('');
  const [task_desc, setTaskDesc] = useState('');
  const [task_status, setTaskStatus] = useState('not started');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask({ task_name, task_desc, task_status });
    setTaskName('');
    setTaskDesc('');
    setTaskStatus('not started');
  };

  return (
    <Box borderWidth={1} p={4} borderRadius="md" boxShadow="sm">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl isRequired>
            <FormLabel>Task Name</FormLabel>
            <Input value={task_name} onChange={(e) => setTaskName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Task Description</FormLabel>
            <Input value={task_desc} onChange={(e) => setTaskDesc(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select value={task_status} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="green">
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
