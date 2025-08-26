import React, { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
// import { ThemeContext } from "../context/ThemeContext";
import useTheme from "../hooks/useTheme";
import useTasks from "../hooks/useTasks"; 
import { motion } from "framer-motion"; // for page animation

function TaskPage() {
    // const { theme } = useContext(ThemeContext);
    const { theme } = useTheme(); 
    const { tasks, addTask, deleteTask, editTask, toggleTask } = useTasks();

    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("none"); // none | asc | desc

    // Memoize callbacks
    const handleToggle = useCallback((id) => toggleTask(id), [toggleTask]);
    const handleDelete = useCallback((id) => deleteTask(id), [deleteTask]);
    const handleEdit = useCallback((id, updatedFields) => editTask(id, updatedFields), [editTask]);

    // Filter tasks
    const filteredTasks = tasks.filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "active") return !t.completed;
      return true;
    });

    // Sort tasks by dueDate
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      if (sortOrder === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortOrder === "desc") return new Date(b.dueDate) - new Date(a.dueDate);
      return 0;
    });

    const containerStyle = {
      padding: "20px",
      backgroundColor: theme === "light" ? "#f4f4f9" : "#222",
      color: theme === "light" ? "#222" : "#f4f4f9",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const selectStyle = { padding: "5px 8px", marginLeft: "10px", borderRadius: "5px", border: "1px solid #ccc" };

    return (
      // <div 
      <motion.div
      style={containerStyle}>
        <h1 style={{ textAlign: "center" }}>Task Tracker</h1>
        <TaskForm onAddTask={addTask} />

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

        <TaskList tasks={sortedTasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
        </motion.div>
      // </div>
    );
}

export default TaskPage;