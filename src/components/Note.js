import axios from 'axios';
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
} from './Note.styles';

const Note = ({ note, getNotes, apiBase }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');

  const itemRef = useRef();

  const handleDelete = (id) => {
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
  };

  const handleEdit = () => {
    setEditing(true);
    setEditText(note.text);
  };

  const handleUpdate = (id) => {
    if (editText) {
      setLoading(true);

      const data = { text: editText };

      axios
        .patch(`${apiBase}/${id}`, data)
        .then(() => {
          getNotes();
          setEditing(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
    <Wrapper>
      <Time>
        <div>
          <i className="far fa-clock" />
        </div>
        <div>{moment(note.createdAt).format('YYYY-MM-DD')}</div>
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

            <div>
              <DeleteButton
                onClick={() => handleDelete(note._id)}
                disabled={loading}
              >
                <i className="fa fa-trash" />
                {loading ? 'Removing from note...' : 'Remove'}
              </DeleteButton>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Note;
