import { Tab, Wrapper, Badge } from './Switch.styles';

const Switch = ({ list, notes, view, setView }) => {
  const setViewToList = () => setView('list');
  const setViewToNotes = () => setView('notes');

  return (
    <Wrapper>
      <Tab
        className={view === 'list' ? 'active-left' : ''}
        onClick={setViewToList}
      >
        <h4>Shopping</h4>
        <Badge>{list.length}</Badge>
      </Tab>
      <Tab
        className={view === 'notes' ? 'active-right' : ''}
        onClick={setViewToNotes}
      >
        <h4>Notes</h4>
        <Badge>{notes.length}</Badge>
      </Tab>
    </Wrapper>
  );
};

export default Switch;
