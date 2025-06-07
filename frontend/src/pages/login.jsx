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
// Optional → if you want to use Swal for alerts:
// import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      // For now, use your own backend endpoint here:
      const response = await axios.post('http://localhost:4000/api/auth/login', requestBody);

      // AuthContext login
      login(response.data.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      // Optional → show error alert
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: error.response?.data?.message || 'Login failed',
      // });
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
              onClick={handleLogin}
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
