import Note from './Note';
import { Wrapper, Empty } from './Notes.styles';

interface Props {
  notes: {
    _id: string;
    text: string;
    createdAt: number;
    __v: number;
  }[];
  getNotes: () => void;
  apiBase: string;
}

const Notes: React.FC<Props> = ({ notes, getNotes, apiBase }) => {
  return (
    <Wrapper>
      {notes.length ? (
        <>
          {notes.map((note, index) => (
            <Note
              note={note}
              index={index}
              key={note._id}
              apiBase={apiBase}
              getNotes={getNotes}
            />
          ))}
        </>
      ) : (
        <Empty>
          <h3>...is empty!</h3>
        </Empty>
      )}
    </Wrapper>
  );
};

export default Notes;
