import React, { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";
import useTheme from "../hooks/useTheme";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function TaskPage() {
  const { tasks, addTask, deleteTask, editTask, toggleTask } = useTasks();
  const { mode } = useTheme(); // use context mode
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const handleToggle = useCallback((id) => toggleTask(id), [toggleTask]);
  const handleDelete = useCallback((id) => deleteTask(id), [deleteTask]);
  const handleEdit = useCallback((id, updatedFields) => editTask(id, updatedFields), [editTask]);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (sortOrder === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOrder === "desc") return new Date(b.dueDate) - new Date(a.dueDate);
    return 0;
  });

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        bgcolor: "background.default", // uses MUI theme colors
        color: "text.primary",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Task Tracker
      </Typography>
      <TaskForm onAddTask={addTask} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        <FormControl>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Sort by Due Date</InputLabel>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="asc">Earliest First</MenuItem>
            <MenuItem value="desc">Latest First</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TaskList tasks={sortedTasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </Box>
  );
}