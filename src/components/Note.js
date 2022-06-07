import axios from 'axios';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useState, useRef, useEffect } from 'react';
import {
  DeleteButton,
  Wrapper,
  Time,
  Text,
  Textarea,
  SuccessButton,
  Form,
  DeleteButtonGroup,
  CancelButton,
} from './Note.styles';

const Note = ({ note, getNotes, apiBase, index }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [confirm, setConfirm] = useState(false);

  const itemRef = useRef();

  const handleDelete = (id) => {
    if (confirm) {
      setLoading(true);
      axios
        .delete(`${apiBase}/${id}`)
        .then(() => {
          getNotes();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setConfirm(false);
    setEditText(note.text);
  };

  const handleUpdate = (id) => {
    if (note.text === editText) {
      return setEditing(false);
    }

    if (editText) {
      setLoading(true);

      const data = { text: editText };

      axios
        .patch(`${apiBase}/${id}`, data)
        .then(() => {
          setEditing(false);
          getNotes();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClickOutside = (e) => {
    if (itemRef.current && itemRef.current.contains(e.target)) {
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

  return (
    <Wrapper
      as={motion.div}
      initial={{ translateX: -50, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ duration: 0.25, delay: index * 0.025 }}
    >
      <Time>
        <div>
          <i className="fas fa-calendar"></i>
        </div>
        <div>{moment(note.createdAt).format('MMMM DD')}</div>

        <div>
          <i className="far fa-clock" />
        </div>
        <div>{moment(note.createdAt).format('HH:mm')}</div>
      </Time>

      <div ref={itemRef}>
        {editing ? (
          <Form>
            <Textarea
              rows="3"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <SuccessButton
              onClick={() => handleUpdate(note._id)}
              disabled={loading}
            >
              <i className="fas fa-save"></i>
              {loading ? 'Updating the note...' : 'Update'}
            </SuccessButton>
          </Form>
        ) : (
          <>
            <Text onClick={handleEdit}>{note.text}</Text>

            {!loading ? (
              <DeleteButtonGroup>
                <DeleteButton
                  onClick={() =>
                    confirm ? handleDelete(note._id) : setConfirm(true)
                  }
                  disabled={loading}
                >
                  <i className="fa fa-trash" />
                  {confirm ? 'Remove permanently' : 'Remove'}
                </DeleteButton>

                {confirm && (
                  <CancelButton onClick={() => setConfirm(false)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </CancelButton>
                )}
              </DeleteButtonGroup>
            ) : (
              <DeleteButton
                onClick={() => handleDelete(note._id)}
                disabled={loading}
              >
                <i className="fa fa-trash" />
                Removing from note...
              </DeleteButton>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Note;
