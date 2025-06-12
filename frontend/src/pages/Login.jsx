import {
  Box,
  Flex,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    console.log("Redirecting to /dashboard...");
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post('http://localhost:4500/api/auth/login', requestBody);

      // AuthContext login
      login(response.data.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const requestBody = { username, email, password };
      const response = await axios.post('http://localhost:4500/api/auth/register', requestBody);

      console.log('Registered:', response.data);

      // After successful registration → switch to login mode and redirect
      setIsLoginMode(true);
      navigate('/'); // Optional, since "/" already shows Login
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex height="100vh">
      {/* Left Panel → Banner */}
      <Box
        flex="1"
        bgImage="url('/limegreenbanner.svg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />

      {/* Right Panel → Form */}
      <Flex flex="1" align="center" justify="center" bg="white">
        <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Heading mb={6}>{isLoginMode ? 'Member Login' : 'Register'}</Heading>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Checkbox>Remember me</Checkbox>
            <Button
              bg="limegreen"
              color="white"
              _hover={{ bg: 'lime' }}
              onClick={isLoginMode ? handleLogin : handleRegister}
            >
              {isLoginMode ? 'Login' : 'Register'}
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
            <Button variant="link" onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? 'Register' : 'Login'}
            </Button>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
