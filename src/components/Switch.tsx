import { Tab, Wrapper, Badge } from './Switch.styles';

interface Props {
  list: {
    completed: boolean;
    createdAt: string;
    text: string;
  }[];
  notes: {
    _id: boolean;
    createdAt: string;
    text: string;
  }[];
  view: string;
  setView: (value: 'list' | 'notes') => void;
}

const Switch: React.FC<Props> = ({ list, notes, view, setView }) => {
  const setViewToList = () => setView('list');
  const setViewToNotes = () => setView('notes');

  return (
    <Wrapper>
      <Tab
        className={view === 'list' ? 'active-left' : ''}
        onClick={setViewToList}
      >
        <h4>Shopping</h4>
        <Badge view={view === 'list'}>{list.length}</Badge>
      </Tab>
      <Tab
        className={view === 'notes' ? 'active-right' : ''}
        onClick={setViewToNotes}
      >
        <h4>Notes</h4>
        <Badge view={view === 'notes'}>{notes.length}</Badge>
      </Tab>
    </Wrapper>
  );
};

export default Switch;
