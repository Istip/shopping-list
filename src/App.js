import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import axios from 'axios';

import { Container, Wrapper, Title } from './App.styles';
import Form from './components/Form';
import Todos from './components/Todos';
import Notes from './components/Notes';
import Switch from './components/Switch';

function App() {
  const [list, setList] = useState([]);
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useLocalStorage('viewFilter', true);

  const API_BASE = process.env.REACT_APP_BASE_URL;

  const getTodos = () => {
    axios
      .get(API_BASE + 'todos')
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const getNotes = () => {
    axios
      .get(API_BASE + 'notes')
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Our List</Title>
        <Form
          filter={filter}
          view={view}
          setList={setList}
          setNotes={setNotes}
          setFilter={setFilter}
        />
        <Switch list={list} notes={notes} view={view} setView={setView} />

        {view === 'list' && (
          <Todos
            list={list}
            loading={loading}
            filter={filter}
            getTodos={getTodos}
            apiBase={API_BASE + 'todos'}
          />
        )}

        {view === 'notes' && (
          <Notes
            notes={notes}
            getNotes={getNotes}
            apiBase={API_BASE + 'notes'}
          />
        )}
      </Wrapper>
    </Container>
  );
}

export default App;
