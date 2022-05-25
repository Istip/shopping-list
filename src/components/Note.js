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

  return (
    <Wrapper>
      <Time>
        <div>
          <i className="far fa-clock" />
        </div>
        <div>{moment(note.createdAt).format('YYYY-MM-DD')}</div>
      </Time>

      {editing ? (
        <Form ref={itemRef}>
          <Textarea rows="3" />
          <SuccessButton disabled={loading}>
            <i className="fas fa-save"></i>
            {loading ? 'Updating the note...' : 'Update'}
          </SuccessButton>
        </Form>
      ) : (
        <div onClick={() => setEditing((prev) => !prev)}>
          <Text>{note.text}</Text>

          <div>
            <DeleteButton
              onClick={() => handleDelete(note._id)}
              disabled={loading}
            >
              <i className="fa fa-trash" />
              {loading ? 'Removing from note...' : 'Remove'}
            </DeleteButton>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Note;
