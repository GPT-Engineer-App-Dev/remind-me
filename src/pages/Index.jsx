import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast, Flex, Heading, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Box p={8}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={4}>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="md"
          />
          <IconButton
            icon={<FaPlus />}
            type="submit"
            colorScheme="blue"
            ml={2}
          />
        </Flex>
        <List spacing={3} mt={6} w="100%" maxW="400px">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <IconButton
                  icon={<FaCheck />}
                  onClick={() => toggleComplete(task.id)}
                  colorScheme={task.completed ? "green" : "gray"}
                  aria-label="Complete task"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                  colorScheme="red"
                  aria-label="Delete task"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default Index;