import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Action,
  Loading,
  ListItem,
  ListContent,
  InputWrapper,
  Input,
  ListText,
  ListDate,
  Button,
} from './Todo.styles';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import TodoTime from './TodoTime';

const Todo = ({ todo, apiBase, getTodos, index }) => {
  const [selected, setSelected] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const itemRef = useRef();

  const handleDelete = (id) => {
    axios
      .delete(`${apiBase}/${id}`)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleteStatus = async (id) => {
    setLoading(true);

    await axios
      .put(`${apiBase}/${id}`)
      .then(() => {
        setLoading(false);
        getTodos();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
    setLoading(true);

    const data = { text: selected.text };

    axios
      .patch(`${apiBase}/${id}`, data)
      .then(() => {
        getTodos();
        setEditing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClickOutside = (e) => {
    if (itemRef.current.contains(e.target)) {
      return;
    }
    setEditing(false);
  };

  useEffect(() => {
    if (itemRef) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          handleCompleteStatus(todo._id);
          navigator.vibrate(200);
        }}
      >
        <Action className="success">
          {todo.completed ? 'UNDO' : 'COMPLETE'}
        </Action>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDelete(todo._id)}>
        <Action className="danger">REMOVE</Action>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <SwipeableListItem
          leadingActions={!loading && leadingActions()}
          trailingActions={!loading && trailingActions()}
        >
          <ListItem
            completed={todo.completed}
            ref={itemRef}
            initial={{ translateX: -50, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 10, opacity: 0 }}
            transition={{ duration: 0.25, delay: index * 0.025 }}
          >
            <ListContent>
              {editing ? (
                <InputWrapper>
                  <Input
                    value={selected.text}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                  />
                </InputWrapper>
              ) : (
                <ListText onClick={() => handleEdit(todo)}>
                  {todo.text}
                </ListText>
              )}
              <ListDate>
                <TodoTime todo={todo} />
              </ListDate>
            </ListContent>

            {editing && (
              <Button
                className="success"
                onClick={() => handleUpdate(todo._id)}
              >
                <i className="fas fa-save"></i>
              </Button>
            )}
          </ListItem>
        </SwipeableListItem>
      )}
    </SwipeableList>
  );
};

export default Todo;
