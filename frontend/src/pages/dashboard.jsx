import { Button, ButtonGroup } from "@chakra-ui/react"
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Page</h1>
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}