import { FormEvent, ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Form as FormWrapper, Input, ButtonGroup, Button } from './Form.styles';
import { IList } from 'interfaces/List.interface';
import { INote } from 'interfaces/Note.interface';

interface Props {
  filter: boolean;
  view: string;
  list: IList[];
  notes: INote[];
  setFilter: (bool: boolean) => void;

  setNotes: (value: INote[]) => void;
  setList: (value: any) => void;
}

const Form: React.FC<Props> = ({
  list,
  notes,
  filter,
  view,
  setList,
  setNotes,
  setFilter,
}) => {
  const [text, setText] = useState('');
  const API_BASE = process.env.REACT_APP_BASE_URL;

  const createData = async (e: FormEvent) => {
    e.preventDefault();

    const data: { text: string; createdAt: number } = {
      text: text,
      createdAt: Date.now(),
    };

    if (view === 'list') {
      return await axios
        .post(API_BASE + 'todos', data)
        .then((res) => {
          const newList = [res.data, ...list];
          setList(newList);
          setText('');
        })
        .catch((error) => console.log(error));
    }

    return await axios
      .post(API_BASE + 'notes', data)
      .then((res) => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
        setText('');
      })
      .catch((error) => console.log(error));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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
            onClick={() => setFilter(!filter)}
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
