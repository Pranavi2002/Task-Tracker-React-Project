import { create } from "zustand";
import { nanoid } from "nanoid";

const useTaskStore = create((set) => ({
  tasks: [],              // List of tasks
  theme: "light",         // Theme
  filter: "all",          // all | active | completed
  sortOrder: "none",      // none | asc | desc

  // TASK ACTIONS
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks, 
        { ...task, id: nanoid(), completed: false }
      ],
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  editTask: (id, updatedFields) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      ),
    })),

  // THEME ACTION
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  // FILTER & SORT
  setFilter: (filter) => set({ filter }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));

export default useTaskStore;