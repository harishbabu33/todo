import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask('');
    }
  };

  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[category].filter((t) => t !== taskToDelete);
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  const deleteAllTasks = (category) => {
    setTasks((prevTasks) => ({ ...prevTasks, [category]: [] }));
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <div className="header">
            <h2>Upcoming</h2>
            <button className="delete-all" onClick={() => deleteAllTasks('todo')}>Delete All</button>
          </div>
          <ul>
            {tasks.todo.map((t, index) => (
              <li className="tasks" key={index}>
                <div className="task-text">{t}</div>
                <div className="task-buttons">
                  <button onClick={() => moveTask('todo', 'ongoing', t)}>
                    Start Now
                  </button>
                  <button onClick={() => moveTask('todo', 'completed', t)}>
                    Complete
                  </button>
                  <button onClick={() => deleteTask('todo', t)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <div className="header">
            <h2>In Progress</h2>
            <button className="delete-all" onClick={() => deleteAllTasks('ongoing')}>Delete All</button>
          </div>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li className="tasks" key={index}>
                <div className="task-text">{t}</div>
                <div className="task-buttons">
                  <button onClick={() => moveTask('ongoing', 'todo', t)}>
                    Postpone
                  </button>
                  <button onClick={() => moveTask('ongoing', 'completed', t)}>
                    Complete
                  </button>
                  <button onClick={() => deleteTask('ongoing', t)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <div className="header">
            <h2>Finished</h2>
            <button className="delete-all" onClick={() => deleteAllTasks('completed')}>Delete All</button>
          </div>
          <ul>
            {tasks.completed.map((t, index) => (
              <li className="tasks" key={index}>
                <div className="task-text">{t}</div>
                <div className="task-buttons">
                  <button onClick={() => moveTask('completed', 'todo', t)}>
                    Repeat
                  </button>
                  <button onClick={() => moveTask('completed', 'ongoing', t)}>
                    Restart
                  </button>
                  <button onClick={() => deleteTask('completed', t)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;