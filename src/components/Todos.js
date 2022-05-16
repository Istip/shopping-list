import { useEffect } from 'react';
import Todo from './Todo';
import { Img, Empty, List, Wrapper } from './Todos.styles';

const Todos = ({ list, loading, filter, getTodos, apiBase }) => {
  const filteredTodos = list.filter((todo) =>
    filter ? !todo.completed : todo
  );

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Img
        src="https://www.scudamores.com/assets/damsel/assets/img/load.gif"
        alt="Loading..."
      />
    );
  }

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
