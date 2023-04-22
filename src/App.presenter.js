import { useEffect } from "react";
import { useState } from "react";
import { getTasks, addTask } from "./modules/repository";

const usePresenter = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [nameToAdd, setNameToAdd] = useState('');
  
  // when loading is set to true, this fetches tasks
  useEffect(() => {
    getTasks().then((data) => {
      setLoading(false);
      setTasks(data);
    });
  }, [loading]);

  if (loading) return { loading };

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
    toDo: {
      title: 'To Do',
      items: tasks.filter(task => task.status === 'To Do').map((task) => {
        return {
          name: task.name,
          status: task.status,
        }
      }),
    },
    done: {
      title: 'Done',
      items: tasks.filter(task => task.status === 'Done').map((task) => {
        return {
          name: task.name,
          status: task.status,
        }
      }),
    },
  };
  
  return props;
};

export default usePresenter;