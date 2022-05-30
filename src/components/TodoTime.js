import moment from 'moment';

const TodoTime = ({ todo }) => {
  const passedMonth = moment().diff(moment(todo.createdAt), 'months') >= 1;
  const icon = passedMonth ? 'fas fa-circle-exclamation' : 'far fa-clock';
  const styles = {
    color: passedMonth ? 'red' : '#111',
    opacity: 0.25,
  };

  return (
    <>
      <i className={icon} style={styles} />
      <span>
        <b style={styles}>{moment(todo.createdAt).fromNow()}</b>
      </span>
    </>
  );
};

export default TodoTime;
