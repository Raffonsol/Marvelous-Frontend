import './App.css';
import TaskItem from './components/TaskItem/TaskItem';
import usePresenter from './App.presenter';

function App() {
  const {
    appName,
    nameInput,
    button,
    search,
    toDo,
    done,
    loading,
  } = usePresenter();
  if (loading) {
    return '...loading';
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <span className='Title'>
          {appName}
        </span>
        <a href='#' onClick={(event) =>event.preventDefault()}>Delete all tasks</a>
      </header>

      <div className='InputsSection'>
        <div className='Add'>
          <input className='NameInput Input' value={(nameInput.value)} onChange={nameInput.onTextChanged}></input>
          <button className='AddButton Input' onClick={button?.onClick}>{button?.text}</button>
        </div>
        <input className='SearchInput Input' placeholder={search?.placeholder}></input>
      </div>

      <div className='TaskListSection'>
        <div className='TodoSection TaskList'>
          <div className='ListHeader'>
            <span className='ListTitle'>{toDo?.title}</span>
          </div>
          <div className='ListItems'>
            {toDo?.items?.map((item) => (
              <TaskItem 
                name={item.name}
                status={item.status}
              />
            ))}
          </div>
        </div>

        <div className='DoneSection TaskList'>
          <div className='ListHeader'>
            <span className='ListTitle'>{done?.title}</span>
          </div>
          <div className='ListItems'>
          {done?.items?.map((item) => (
              <TaskItem 
                name={item.name}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
