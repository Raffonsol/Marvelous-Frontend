import './TaskItem.css';

function TaskItem(props) {

  return (
    <div className='TaskItem'>
      <input 
        className='Checkbox'
        type={'checkbox'}
        checked={props.status === 'Done'}
        onChange={props.onClick}
      ></input>
      <span className='Value'>{props.name}</span>
    </div>
  );
}

export default TaskItem;
