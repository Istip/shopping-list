import Note from './Note';
import { Wrapper, Empty } from './Notes.styles';

const Notes = ({ notes, getNotes, apiBase }) => {
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
