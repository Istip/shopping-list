import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Todo from './Todo';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const API_BASE = 'https://isti-list.herokuapp.com/todos';

  const getTodos = () => {
    axios
      .get(API_BASE)
      .then((res) => setTodos(res.data))
      .catch((error) => console.log(error));
  };

  const createTodo = (e) => {
    e.preventDefault();

    const data = {
      text: text,
      createdAt: Date.now(),
    };

    axios
      .post(API_BASE, data)
      .then((res) => {
        setTodos([...todos, res.data]);
        setText('');
      })
      .catch((error) => console.log(error));
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodosWrapper>
      <h1>Hello!</h1>

      <Form onSubmit={createTodo}>
        <Input
          name="text"
          value={text}
          onChange={handleInput}
          placeholder="Enter item name.."
          required
        />
        <Button type="submit">
          <i className="fas fa-paper-plane"></i>
        </Button>
      </Form>

      <h2>Your list</h2>

      {todos.length ? (
        <List>
          {todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              apiBase={API_BASE}
              getTodos={getTodos}
            />
          ))}
        </List>
      ) : (
        <Empty>
          <h3>...is empty!</h3>
        </Empty>
      )}
    </TodosWrapper>
  );
};

// Styled components
const TodosWrapper = styled.div`
  min-width: 300px;
  max-width: 500px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  border: 1px solid lightgray;
  box-shadow: 0px 5px 100px 20px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  padding: 0;
  width: 100%;
`;

const Empty = styled.div`
  padding: 18px 64px;
  color: #e1e1e1;
`;

const Form = styled.form`
  width: 100%;
  margin: 20px 0;
  display: flex;
  gap: 5px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0 12px;
  outline: none;
  border: 1px solid #3486eb;
  border-radius: 12px;
  font-size: 16px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 250ms ease;
  border: 1px solid #3486eb;
  color: #f1f1f1;
  background: #3486eb;

  &:hover {
    background: #2663ad;
    border: 1px solid #2663ad;
  }
`;

export default Todos;
