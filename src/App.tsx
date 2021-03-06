import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import axios from 'axios';

import { Container, Wrapper, Title, Img } from './App.styles';
import Form from './components/Form';
import Todos from './components/Todos';
import Notes from './components/Notes';
import Switch from './components/Switch';
import { generateHexColor } from './utils/generateHexColor';
import { IList } from 'interfaces/List.interface';

const App: React.FC = () => {
  const [list, setList] = useState<IList[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState('3486eb');

  const [view, setView] = useLocalStorage('tab', 'list');
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
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      onDoubleClick={() => generateHexColor(setBgColor)}
      bgColor={bgColor}
    >
      <Wrapper>
        <Title data-cy="main-title">Our List</Title>
        {loading ? (
          <Img
            // src="https://gifimage.net/wp-content/uploads/2017/08/spinner-gif-7.gif"
            src="https://i.pinimg.com/originals/dc/62/38/dc62389d416fe466fd88d3c29c31f8c6.gif"
            alt="is loading..."
          />
        ) : (
          <>
            <Form
              list={list}
              notes={notes}
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
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default App;
