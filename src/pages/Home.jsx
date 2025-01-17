import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete a single task
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[category].filter((t) => t !== taskToDelete);
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  // Delete all tasks in a category
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
                {t}
                <button onClick={() => moveTask('todo', 'ongoing', t)}>
                  Active
                </button>
                <button onClick={() => deleteTask('todo', t)}>
                  Delete
                </button>
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
                {t}
                <button onClick={() => moveTask('ongoing', 'completed', t)}>
                  Done
                </button>
                <button onClick={() => deleteTask('ongoing', t)}>
                  Delete
                </button>
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
                {t}
                <button onClick={() => deleteTask('completed', t)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;