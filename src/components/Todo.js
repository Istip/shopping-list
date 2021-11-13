import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';

const Todo = ({ todo, apiBase, getTodos }) => {
  const [selected, setSelected] = useState({});
  const [editing, setEditing] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`${apiBase}/${id}`)
      .then(() => getTodos())
      .catch((error) => console.log(error));
  };

  const handleCompleteStatus = (id) => {
    axios
      .put(`${apiBase}/${id}`)
      .then(() => getTodos())
      .catch((error) => console.log(error));
  };

  const handleEdit = (item) => {
    if (!item.completed) {
      setSelected(item);
      setEditing(!editing);
    }
  };

  const handleChange = (e) => {
    setSelected({ ...selected, text: e.target.value });
  };

  const handleUpdate = (id) => {
    const data = { text: selected.text };

    setEditing(false);

    axios
      .patch(`${apiBase}/${id}`, data)
      .then(() => getTodos())
      .catch((error) => console.log(error));
  };

  return (
    <ListItem completed={todo.completed}>
      <ListContent>
        {editing ? (
          <InputWrapper>
            <Input value={selected.text} onChange={handleChange} autoFocus />
          </InputWrapper>
        ) : (
          <ListText onClick={() => handleEdit(todo)}>{todo.text}</ListText>
        )}
        <ListDate>{dayjs(todo.createdAt).format('MMM. DD - HH:mm')}</ListDate>
      </ListContent>

      {editing ? (
        <Button className="success" onClick={() => handleUpdate(todo._id)}>
          <i className="fas fa-save"></i>
        </Button>
      ) : (
        <ButtonGroup>
          <Button className="danger" onClick={() => handleDelete(todo._id)}>
            <i className="fas fa-times"></i>
          </Button>
          <Button
            className="success"
            onClick={() => handleCompleteStatus(todo._id)}
          >
            <i className="fas fa-check"></i>
          </Button>
        </ButtonGroup>
      )}
    </ListItem>
  );
};

// Styled components
const ListItem = styled.li`
  list-style-type: none;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 10px;
  opacity: ${(props) => (props.completed ? 0.3 : 1)};
  transition: 250ms ease;

  &:hover {
    border: 1px solid #e1e1e1;
  }

  &:first-child {
    margin-top: 10px;
  }
`;

const ListContent = styled.div`
  margin-right: 40px;
`;

const ListText = styled.h4`
  cursor: pointer;
`;

const ListDate = styled.small`
  color: #999;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
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

const InputWrapper = styled.div``;

const Input = styled.input`
  width: 172px;
  height: 40px;
  padding: 0 12px;
  outline: none;
  border: 1px solid #3486eb;
  border-radius: 12px;
  font-size: 16px;
`;

export default Todo;
