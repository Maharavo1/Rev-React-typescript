import React, { ChangeEvent } from "react";
import { useTaskManager } from "./useTaskManager";
import "./TaskManager.css";

export const TaskManager = () => {
  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    getFilteredTasks,
  } = useTaskManager();

  const [title, setTitle] = React.useState<string>("");
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  const saveTask = () => {
    addTask(title);
    setTitle("");
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = getFilteredTasks(searchKeyword);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Task"
        />
      </div>
      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button onClick={saveTask}>Add Task</button>
      </div>
      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) =>
                  updateTask(task.id, { title: e.target.value })
                }
              />
              <button onClick={() => deleteTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
