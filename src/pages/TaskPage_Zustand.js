// use Zustand

import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";
import useTaskStore from "../store/useTaskStore";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TaskPage() {
  const { theme } = useTheme();

  // Zustand store
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sortOrder = useTaskStore((state) => state.sortOrder);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSortOrder = useTaskStore((state) => state.setSortOrder);

  const containerStyle = {
    padding: "20px",
    backgroundColor: theme === "light" ? "#f4f4f9" : "#222",
    color: theme === "light" ? "#222" : "#f4f4f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const selectStyle = { padding: "5px 8px", marginLeft: "10px", borderRadius: "5px", border: "1px solid #ccc" };

  // FILTER
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // SORT
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (sortOrder === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOrder === "desc") return new Date(b.dueDate) - new Date(a.dueDate);
    return 0;
  });

  return (
    <motion.div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Task Tracker</h1>

      <TaskForm />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <label>Filter: </label>
        <select style={selectStyle} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Sort by Due Date: </label>
        <select style={selectStyle} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </div>

      <TaskList tasks={sortedTasks} />
    </motion.div>
  );
}