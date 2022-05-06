import { useState } from 'react';
import styled from 'styled-components';
import Todos from './components/Todos';

function App() {
  const [background, setBackground] = useState('#3486eb33');

  return (
    <Container background={background}>
      <Todos />
    </Container>
  );
}

// Styled components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: 'white';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
  background: ${({ background }) => background};
`;

export default App;
