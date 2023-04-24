import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTasks } from "./modules/repository";

const MINUTE_MS = 60000;

const usePresenter = () => {
  const [loading, setLoading] = useState(true);
  // all items
  const [activeTasks, setActiveTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  // items after filtering down from search
  const [filteredActiveTasks, setFilteredActiveTasks] = useState(activeTasks);
  const [filteredDoneTasks, setFilteredDoneTasks] = useState(doneTasks);

  const [nameToAdd, setNameToAdd] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteDoneOnly, setDeleteDoneOnly] = useState(false);
  
  // when loading is set to true, this fetches tasks
  useEffect(() => {
    getTasks('To Do').then((data) => {
      setActiveTasks(data);
      // apply filters
      setFilteredActiveTasks(data.filter((task) => task.name.includes(activeSearch)));
    }).then(() => {
      return getTasks('Done');
    }).then( (data) => {
      setDoneTasks(data);
      // apply filters
      setFilteredDoneTasks(data.filter((task) => task.name.includes(activeSearch)));
    }).finally(() => {
      // finish loading
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // polling function to keep frontent updated. Checks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
    }, MINUTE_MS);

    // prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  if (loading) return { loading };

  // Function to map props for a list, based on status
  const mapTaskList = (status) => {
    return {
      // status will be either 'To Do' or 'Done'
      title: status,
      items: (status === 'To Do' ? filteredActiveTasks : filteredDoneTasks).map(
        (task, index) => {
          return {
            ...task,
            key: index,
            onClick: async () => {
              await updateTask(task.id);
              setLoading(true);
            },
          }
        },
      ),
    };
  };

  // all the data avilable to the App.js file
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
      onClick: async () => {
        await addTask(nameToAdd);
        setNameToAdd('');
        setLoading(true);
      },
    },
    search: {
      placeholder: 'Search..',
      onTextChanged: (text) => {
        // keeps track of value on search field
        setActiveSearch(text.target.value);
        // filtering tasks
        setFilteredActiveTasks(activeTasks.filter((task) => task.name.includes(text.target.value)));
        setFilteredDoneTasks(doneTasks.filter((task) => task.name.includes(text.target.value)));
      },
      value: activeSearch,
    },
    toDo: mapTaskList('To Do'),
    done: mapTaskList('Done'),
    deleteLink: {
      onClick: (event) => {
        event.preventDefault();
        setShowConfirmationModal(true);
      },
    },
    confirmationModal: {
      show: showConfirmationModal,
      label: 'Delete all tasks?',
      checkBoxLabel: 'Done only',
      onCheckboxChange: (value) => {
        setDeleteDoneOnly(value.target?.checked);
      },
      yesButton: {
        value: 'Yes',
        onClick: async () => {
          await deleteTasks(deleteDoneOnly ? 'Done' : undefined);
          setLoading(true);
        },
      },
      noButton: {
        value: 'No',
      },
      onOverlayClick: () => {
        if (!['ConfirmationModal', 'checkbox'].includes(document.activeElement.className)) {
          setShowConfirmationModal(false);
          setDeleteDoneOnly(false);
        }
      },
    },
  };
  
  return props;
};

export default usePresenter;