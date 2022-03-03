import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

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
    setEditing(false);

    const data = { text: selected.text };

    axios
      .patch(`${apiBase}/${id}`, data)
      .then(() => getTodos())
      .catch((error) => console.log(error));
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
      <SwipeAction onClick={() => handleCompleteStatus(todo._id)}>
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
                    autoFocus
                  />
                </InputWrapper>
              ) : (
                <ListText onClick={() => handleEdit(todo)}>
                  {todo.text}
                </ListText>
              )}
              <ListDate>
                <i className="far fa-clock"></i>
                <span>
                  {moment(todo.createdAt).format('YYYY.MM.DD')} -{' '}
                  <b>{moment(todo.createdAt).fromNow()}</b>
                </span>
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

// Styled components
const ListItem = styled(motion.li)`
  width: 100%;
  list-style-type: none;
  padding: 12px;
  background: ${(props) => (props.completed ? '#fff' : '#f1f1f1')};
  color: ${(props) => (props.completed ? '#aaa' : '#111')};
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  text-align: left;
  transition: 250ms ease;
  border-bottom: 1px solid #ddd;

  &:hover {
    border: 1px solid #e1e1e1;
  }
`;

const ListContent = styled.div`
  margin-right: 20px;
  overflow: hidden;
`;

const ListText = styled.h4`
  cursor: pointer;
`;

const ListDate = styled.small`
  color: #999;
  font-size: 10px;

  span {
    margin-left: 6px;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 10px;

  &.success {
    background: #3e9e47;
  }

  &.danger {
    background: #e6354d;
  }
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

const Loading = styled.div`
  background: #f1f1f1;
  color: #666;
  font-size: 12px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 67px;
`;

export default Todo;
