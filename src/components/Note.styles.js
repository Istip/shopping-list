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
  transition: 250ms ease;
`;

export const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  transition: 250ms ease;
  border: 1px solid #e6354d;
  color: #f1f1f1;
  background: #e6354d;
  text-align: center;

  i {
    margin-right: 4px;
  }
`;

export const Time = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`;

export const Text = styled.div`
  padding: 10px 0 20px;
  font-size: 14px;
`;
