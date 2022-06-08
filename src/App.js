import logo from './logo.svg';
import './App.css';
import Example from './table.js';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Example />

      </div>
    </ChakraProvider>

  );
}

export default App;
