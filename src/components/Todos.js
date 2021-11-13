import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Todo from './Todo';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState(true);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_BASE_URL;

  const getTodos = () => {
    axios
      .get(API_BASE)
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
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
        setTodos([res.data, ...todos]);
        setText('');
      })
      .catch((error) => console.log(error));
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    filter ? !todo.completed : todo
  );

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <TodosWrapper pending>
        <Img
          src="https://www.unra.go.ug/assets/loaders/loader_2.gif"
          alt="Loading..."
        />
      </TodosWrapper>
    );
  }

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

        <Button
          type="button"
          onClick={() => setFilter(!filter)}
          className="secondary"
        >
          <i className="fas fa-filter"></i>
        </Button>
        <Button type="submit">
          <i className="fas fa-paper-plane"></i>
        </Button>
      </Form>

      <h2>Our list</h2>

      {filteredTodos.length ? (
        <List>
          {filteredTodos.map((todo) => (
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
  width: 320px;
  margin: 20px;
  padding: ${(props) => (props.pending ? '50px' : '20px')};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #111199;
  box-shadow: 0px 5px 100px 20px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  padding: 0;
  width: 100%;
`;

const Empty = styled.div`
  padding: 18px 64px;
  color: #c1c1c1;
`;

const Form = styled.form`
  width: 100%;
  margin: 20px 0;
  display: flex;
  gap: 5px;
`;

const Input = styled.input`
  max-width: 188px;
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

  &.secondary {
    width: 40px;

    border: 1px solid #3486eb;
    color: #3486eb;
    background: none;

    &:hover {
      color: #2663ad;
      border: 1px solid #2663ad;
    }
  }
`;

const Img = styled.img`
  width: 300px;
  height: auto;
`;

export default Todos;
