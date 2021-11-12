import React from 'react';
import styled from 'styled-components';
import Todos from './components/Todos';
import './App.css';

function App() {
  return (
    <Container>
      <Todos />
    </Container>
  );
}

// Styled components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
`;

export default App;
