import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  background: 'white';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
  background: #3486eb33;
`;

export const Wrapper = styled.div`
  width: 320px;
  margin: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #999;
  box-shadow: 0px 5px 100px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-top: 20px;
`;
