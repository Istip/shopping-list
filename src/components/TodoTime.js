import moment from 'moment';

const TodoTime = ({ todo }) => {
  return (
    <>
      <i
        className="far fa-clock"
        style={{
          color:
            moment().diff(moment(todo.createdAt), 'months') >= 1
              ? '#e6354d99'
              : '#999',
        }}
      />
      <span>
        <b
          style={{
            color:
              moment().diff(moment(todo.createdAt), 'months') >= 1
                ? '#e6354d99'
                : '#aaa',
          }}
        >
          {moment(todo.createdAt).fromNow()}
        </b>
      </span>
    </>
  );
};

export default TodoTime;
