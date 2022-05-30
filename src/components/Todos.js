import { useEffect } from 'react';
import Todo from './Todo';
import { Empty, List, Wrapper } from './Todos.styles';

const Todos = ({ list, filter, getTodos, apiBase }) => {
  const filteredTodos = list.filter((todo) =>
    filter ? !todo.completed : todo
  );

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {filteredTodos.length ? (
        <List>
          {filteredTodos.map((todo, i) => (
            <Todo
              key={todo._id}
              todo={todo}
              apiBase={apiBase}
              getTodos={getTodos}
              index={i}
            />
          ))}
        </List>
      ) : (
        <Empty>
          <h3>...is empty!</h3>
        </Empty>
      )}
    </Wrapper>
  );
};

export default Todos;
