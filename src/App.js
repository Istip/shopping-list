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
  background: linear-gradient(
    145deg,
    rgba(66, 192, 228, 0.5) 0%,
    rgba(0, 69, 255, 0.5) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
`;

export default App;
