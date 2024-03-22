import './App.css';
import TaskForm from './taskForm';
import Task from './Task';
import { useState, useEffect } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
 

// Local Storage saves the tasks in the browser
  useEffect( () => {
    if (tasks.length === 0) {
      return;
    }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect( () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks);
  } , []);

// Add Function
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name, done:false}]
    });
  }

// Remove Function
  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove)
    })
  }

//Update Function
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex] = {...newTasks[taskIndex], done: newDone};
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(task => task.done).length;
  const numberTotal = tasks.length;


  // Custom Msg
  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Au boulot ! ⚒️'; // Emoji marteau et pioche
    }
    if (percentage < 50) {
      return 'Encore un effort ! 💪'; // Emoji bras musclé
    }
    if (percentage === 100) {
      return 'Au repos ! 🌴'; // Emoji palmier
    }
    
    return 'Keep Going ! 👍'; // Emoji pouce levé
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName
      return newTasks
    })
  }
  

  return (
    <main className="Todo">
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask}/>
      {tasks.map((tasks,index) => (
        <Task {...tasks}
         onRename={newName => renameTask(index, newName)}
         onTrash={() => removeTask(index)}
         onToggle={done => updateTaskDone(index, done)}/>
      ))}
           
    </main>
  );
}

export default App;
