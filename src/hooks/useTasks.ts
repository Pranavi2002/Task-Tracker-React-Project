// src/hooks/useTasks.ts
import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

// Task type
export type Task = {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
};

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const addTask = useCallback((text: string, dueDate: string = "") => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: text.trim(), completed: false, dueDate: dueDate || "" },
    ]);
  }, [tasks, setTasks]);

  const deleteTask = useCallback((id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }, [tasks, setTasks]);

  const editTask = useCallback((id: number, updatedFields: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedFields } : task)));
  }, [tasks, setTasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }, [tasks, setTasks]);

  return { tasks, addTask, deleteTask, editTask, toggleTask };
}