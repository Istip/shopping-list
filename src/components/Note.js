import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import {
  DeleteButton,
  Wrapper,
  Time,
  Text,
  Textarea,
  SuccessButton,
} from './Note.styles';

const Note = ({ note, getNotes, apiBase }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

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

  return (
    <Wrapper>
      <Time>
        <div>
          <i className="far fa-clock" />
        </div>
        <div>{moment(note.createdAt).format('YYYY-MM-DD')}</div>
      </Time>

      {editing ? (
        <>
          <Textarea rows="3" />
          <SuccessButton disabled={loading}>
            <i className="fas fa-save"></i>
            {loading ? 'Updating the note...' : 'Update'}
          </SuccessButton>
        </>
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
