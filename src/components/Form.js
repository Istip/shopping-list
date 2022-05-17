import { useState } from 'react';
import axios from 'axios';
import { Form as FormWrapper, Input, ButtonGroup, Button } from './Form.styles';

const Form = ({ filter, view, setList, setNotes, setFilter }) => {
  const [text, setText] = useState('');
  const API_BASE = process.env.REACT_APP_BASE_URL;

  const createData = (e) => {
    e.preventDefault();

    const data = {
      text: text,
      createdAt: Date.now(),
    };

    if (view === 'list') {
      axios
        .post(API_BASE + 'todos', data)
        .then((res) => {
          setList((prevState) => [res.data, ...prevState]);
          setText('');
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(API_BASE + 'notes', data)
        .then((res) => {
          setNotes((prevState) => [res.data, ...prevState]);
          setText('');
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  return (
    <FormWrapper onSubmit={createData} autoComplete="off">
      <Input
        name="text"
        value={text}
        onChange={handleChangeInput}
        placeholder="Enter item name.."
        required
      />

      <ButtonGroup>
        {view !== 'notes' && (
          <Button
            type="button"
            onClick={() => setFilter((prevState) => !prevState)}
            className="secondary"
          >
            <i className={`fas ${filter ? 'fa-eye' : 'fa-eye-slash'}`} />{' '}
            {filter ? 'Show' : 'Hide'}
          </Button>
        )}
        <Button type="submit">
          <i
            className={
              view === 'list' ? 'fas fa-paper-plane' : 'fas fa-comment-alt'
            }
          />
          {view === 'list' ? 'Add to List' : 'Create a new Note'}
        </Button>
      </ButtonGroup>
    </FormWrapper>
  );
};

export default Form;
