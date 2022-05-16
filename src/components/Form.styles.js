import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

export const Input = styled.input`
  padding: 0 12px;
  height: 40px;
  outline: none;
  border: 1px solid #3486eb;
  border-radius: 12px;
  font-size: 16px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  transition: 250ms ease;
  border: 1px solid #3486eb;
  color: #f1f1f1;
  background: #3486eb;

  i {
    margin-right: 4px;
  }

  &:hover {
    background: #2663ad;
    border: 1px solid #2663ad;
  }

  &.secondary {
    border: 1px solid #3486eb;
    color: #3486eb;
    background: #3486eb33;

    &:hover {
      color: #2663ad;
      border: 1px solid #2663ad;
    }
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
