import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import def from "ajv/dist/vocabularies/discriminator";

function useTasks() {
  // const [tasks, setTasks] = useState(() => {
  //   const saved = localStorage.getItem("tasks");
  //   return saved ? JSON.parse(saved) : [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (text, dueDate) => {
    setTasks([...tasks, { 
      id: Date.now(), 
      text: String(text).trim(), // always ensure string
      completed: false, 
      dueDate: dueDate || "",   // always ensure string, never undefined
    }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // const editTask = (id, newText) => {
  //   setTasks(tasks.map((task) =>
  //     task.id === id ? { ...task, text: newText } : task
  //   ));
  // };

  const editTask = (id, updatedFields) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return { tasks, addTask, deleteTask, editTask, toggleTask };
}

export default useTasks;