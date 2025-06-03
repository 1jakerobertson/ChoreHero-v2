import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("❌ Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);