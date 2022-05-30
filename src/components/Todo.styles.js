import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ListItem = styled(motion.li)`
  width: 100%;
  margin-bottom: 8px;
  list-style-type: none;
  padding: 18px;
  background: ${(props) => (props.completed ? '#fff' : '#eff5fd')};
  color: ${(props) => (props.completed ? '#aaa' : '#111')};
  border: 1px solid #b5d3f8;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  transition: 250ms ease;
`;

export const ListContent = styled.div`
  overflow: hidden;
`;

export const ListText = styled.h4`
  cursor: pointer;
  line-height: 18px;
`;

export const ListDate = styled.small`
  font-size: 12px;

  span {
    margin-left: 6px;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px;
  margin: 0 8px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 10px;
  border-radius: 12px;

  &.success {
    background: #3e9e47;
  }

  &.danger {
    background: #e6354d;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 250ms ease;

  &.success {
    border: 1px solid #3e9e47;
    color: #3e9e47;
    background: none;

    &:hover {
      color: #f1f1f1;
      background: #3e9e47;
    }

    &:active {
      border: 1px solid #3e9e47;
      color: #3e9e47;
      background: none;
    }

    &:focus {
      border: 1px solid #3e9e47;
      color: #3e9e47;
      background: none;
    }
  }

  &.danger {
    border: 1px solid #e6354d;
    color: #e6354d;
    background: none;

    &:hover {
      color: #f1f1f1;
      background: #e6354d;
    }

    &:active {
      border: 1px solid #e6354d;
      color: #e6354d;
      background: none;
    }

    &:focus {
      border: 1px solid #e6354d;
      color: #e6354d;
      background: none;
    }
  }
`;

export const InputWrapper = styled.div``;

export const Input = styled.input`
  width: 172px;
  height: 40px;
  padding: 0 12px;
  outline: none;
  border: 1px solid #3486eb;
  border-radius: 12px;
  font-size: 16px;
`;

export const Loading = styled.div`
  background: #f1f1f1;
  color: #666;
  font-size: 12px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 86px;
  margin-bottom: 8px;
  border-radius: 12px;
`;
