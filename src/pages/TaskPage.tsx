import React, { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useTheme from "../hooks/useTheme";
import useTasks, { Task } from "../hooks/useTasks";
import { motion } from "framer-motion";

const TaskPage: React.FC = () => {
  const { theme } = useTheme();
  const { tasks, addTask, deleteTask, editTask, toggleTask } = useTasks();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const handleToggle = useCallback((id: number) => toggleTask(id), [toggleTask]);
  const handleDelete = useCallback((id: number) => deleteTask(id), [deleteTask]);
  const handleEdit = useCallback((id: number, updatedFields: Partial<Task>) => editTask(id, updatedFields), [editTask]);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (sortOrder === "asc") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortOrder === "desc") return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    return 0;
  });

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    backgroundColor: theme === "light" ? "#f4f4f9" : "#222",
    color: theme === "light" ? "#222" : "#f4f4f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const selectStyle: React.CSSProperties = {
    padding: "5px 8px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <motion.div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Task Tracker</h1>
      <TaskForm onAddTask={addTask} />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <label>Filter: </label>
        <select style={selectStyle} value={filter} onChange={(e) => setFilter(e.target.value as "all" | "active" | "completed")}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Sort by Due Date: </label>
        <select style={selectStyle} value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}>
          <option value="none">None</option>
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </div>

      <TaskList tasks={sortedTasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </motion.div>
  );
};

export default TaskPage;