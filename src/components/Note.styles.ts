import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
  list-style-type: none;
  padding: 18px;
  background: #eff5fd;
  color: #111;
  border: 1px solid #b5d3f8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
`;

export const DeleteButton = styled.button`
  all: unset;
  opacity: 1;
  cursor: pointer;
  font-size: 12px;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  border: 1px solid #e6354d;
  color: #f1f1f1;
  background: #e6354d;
  text-align: center;

  &:disabled {
    opacity: 0.5;
  }

  i {
    margin-right: 4px;
  }
`;

export const CancelButton = styled.button`
  all: unset;
  opacity: 1;
  cursor: pointer;
  font-size: 12px;
  border-radius: 12px;
  width: 50px;
  height: 40px;
  border: 1px solid #333;
  color: #f1f1f1;
  background: #333;
  text-align: center;

  &:disabled {
    opacity: 0.5;
  }
`;

export const SuccessButton = styled.button`
  all: unset;
  opacity: 1;
  cursor: pointer;
  font-size: 12px;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  border: 1px solid #3e9e47;
  color: #f1f1f1;
  background: #3e9e47;
  text-align: center;

  &:disabled {
    opacity: 0.5;
  }

  i {
    margin-right: 4px;
  }
`;

export const Time = styled.div`
  font-size: 12px;
  font-weight: bold;
  opacity: 0.25;
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`;

export const Text = styled.div`
  padding: 10px 0 20px;
  font-size: 14px;
`;

export const Textarea = styled.textarea`
  border: 1px solid #b5d3f8;
  background: #fff;
  margin: 12px 0;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  width: 100%;
  outline: none;
  resize: none;
`;

export const Form = styled.div``;

export const DeleteButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;
