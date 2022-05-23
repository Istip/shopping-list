import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { DeleteButton, Wrapper, Time, Text } from './Note.styles';

const Note = ({ note, getNotes, apiBase }) => {
  const [loading, setLoading] = useState(false);

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

      <Text>{note.text}</Text>

      <div>
        <DeleteButton onClick={() => handleDelete(note._id)} disabled={loading}>
          <i className="fa fa-trash" />{' '}
          {loading ? 'Removing from list...' : 'Remove'}
        </DeleteButton>
      </div>
    </Wrapper>
  );
};

export default Note;
