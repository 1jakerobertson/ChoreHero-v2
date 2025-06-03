import { Button } from "@chakra-ui/react";

function App() {
  console.log("✅ App component is rendering");
  console.log("✅ React + Chakra loaded");

  return (
    <>
      <Button colorScheme="teal">Hello from Chakra</Button>
    </>
  );
}

export default App;