import React, { useState, useContext, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none"); // none | asc | desc
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Add Task
  const addTask = (taskText, dueDate) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      dueDate: dueDate || null,
    };
    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // Toggle Complete
  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // Edit Task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (sortOrder === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOrder === "desc") return new Date(b.dueDate) - new Date(a.dueDate);
    return 0;
  });

  // Styling
  const appStyle = {
    // display: "flex",     // Turns this container into a flex container.
                            // Its direct children (<h1>, TaskForm, etc.) become flex items.
    flexDirection: "column",    // Arranges the flex items vertically (one below the other)
                                // instead of the default horizontal row layout.
    // alignItems: "center",    // Horizontally centers all flex items along the cross axis.
                                // For column direction, the cross axis is horizontal.
    // justifyContent: "center",    // Vertically centers all flex items along the main axis.
                                   // For column direction, the main axis is vertical. 
    padding: "40px 20px",
    backgroundColor: theme === "light" ? "#f4f4f9" : "#222",
    color: theme === "light" ? "#222" : "#f4f4f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const buttonStyle = {
    padding: "6px 12px",
    marginLeft: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    transition: "0.3s",
  };

  const selectStyle = {
    padding: "5px 8px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <div style={appStyle}>
      <h1 style={{ textAlign: "center" }}>Task Tracker</h1>
      <button
        onClick={toggleTheme}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2e7d32")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Task Input */}
      <TaskForm onAddTask={addTask} />

      {/* Filters */}
      <div style={{ marginTop: "20px" }}>
        <label>Filter Tasks: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Sorting */}
      <div style={{ marginTop: "10px" }}>
        <label>Sort by Due Date: </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={selectStyle}
        >
          <option value="none">None</option>
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </div>

      {/* Task List */}
      <h2 style={{ marginTop: "20px" }}>Tasks</h2>
      <TaskList
        // tasks={filteredTasks}
        tasks={sortedTasks} // now the tasks are sorted
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
