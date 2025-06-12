import { Stack, Text } from '@chakra-ui/react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <Text>No tasks yet. Add a new task to get started!</Text>;
  }

  return (
    <Stack spacing={4}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </Stack>
  );
}
