import { useEffect } from "react";
import { useState } from "react";
import { getTasks, addTask, updateTask } from "./modules/repository";

const usePresenter = () => {
  const [loading, setLoading] = useState(true);
  const [activeTasks, setActiveTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [nameToAdd, setNameToAdd] = useState('');
  
  // when loading is set to true, this fetches tasks
  useEffect(() => {
    getTasks('To Do').then((data) => {
      setActiveTasks(data);
    }).then(() => {
      return getTasks('Done');
    }).then( (data) => {
      setDoneTasks(data);
      setLoading(false);
    });
  }, [loading]);

  if (loading) return { loading };

  // Function to map props for a list, based on status
  const mapTaskList = (status) => {
    return {
      // status will be either 'To Do' or 'Done'
      title: status,
      items: (status === 'To Do' ? activeTasks : doneTasks).map(
        (task, index) => {
          return {
            ...task,
            key: index,
            onClick: () => {
              updateTask(task.id);
              setLoading(true);
            },
          }
        },
      ),
    };
  };

  const props = {
    appName: 'Marvelous v2.0',
    nameInput: {
      onTextChanged: (text) => {
        // keeps track of value on input field
        setNameToAdd(text.target.value);
      },
      value: nameToAdd,
    },
    button: {
      text: 'Add',
      onClick: () => {
        addTask(nameToAdd);
        setNameToAdd('');
        setLoading(true);
      },
    },
    search: {
      placeholder: 'Search..'
    },
    toDo: mapTaskList('To Do'),
    done: mapTaskList('Done'),
  };
  
  return props;
};

export default usePresenter;