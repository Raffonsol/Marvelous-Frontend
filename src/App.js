import './App.css';
import TaskItem from './components/TaskItem/TaskItem';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import usePresenter from './App.presenter';

const App = () => {
  const {
    appName,
    nameInput,
    button,
    search,
    toDo,
    done,
    loading,
    deleteLink,
    confirmationModal,
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
        <a href='#' {...deleteLink}>Delete all tasks</a>
      </header>

      <div className='InputsSection'>
        <div className='Add'>
          <input className='NameInput Input' value={(nameInput.value)} onChange={nameInput.onTextChanged}></input>
          <button className='AddButton Input' onClick={button?.onClick}>{button?.text}</button>
        </div>
        <input 
          className='SearchInput Input'
          value={(search.value)}
          onChange={search.onTextChanged}
          placeholder={search?.placeholder}
        ></input>
      </div>

      <div className='TaskListSection'>
        <div className='TodoSection TaskList'>
          <div className='ListHeader'>
            <span className='ListTitle'>{toDo?.title}</span>
          </div>
          <div className='ListItems'>
            {toDo?.items?.map((item) => (
              <TaskItem 
                {...item}
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
              item.id ? <TaskItem 
                {...item}
              /> : ''
            ))}
          </div>
        </div>
      </div>

      <ConfirmationModal {...confirmationModal}/>

    </div>
  );
}

export default App;
