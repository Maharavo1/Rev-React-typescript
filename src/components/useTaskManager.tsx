import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
  };

  const getFilteredTasks = (searchKeyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return {
    tasks,
    setTasks,
    updateTask,
    addTask,
    deleteTask,
    getFilteredTasks,
  };
};
