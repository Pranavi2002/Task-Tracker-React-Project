import React, {useEffect, useState, useContext} from "react";
import TaskForm from "./TaskForm";
import { ThemeContext } from "./ThemeContext";

function App() {
  // useState
  // const [tasks, setTasks] = useState([]);
  // const [filter, setFilter] = useState("all"); // New state for filter

  // Updated to lazy initialization from localStorage
  // Load tasks from localStorage on mount
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks"); // get tasks from localStorage
    return storedTasks ? JSON.parse(storedTasks) : []; // parse if exists, else empty array
  });

  // Not working code
  // // Load tasks from localStorage on mount
  // useEffect(() => {
  //   const storedTasks = localStorage.getItem("tasks");
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // }, []); // empty dependency array → runs once on mount

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // update localStorage
  }, [tasks]); // dependency on tasks

  // Function to add a new task - arrow function
  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(), // Unique ID
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]) 
  };

  // Update State Immutably
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  };

  const [filter, setFilter] = useState("all"); // New state for filter

  // Filter Logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all other cases
  })

  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme

  // Conditional styles based on theme
  const appStyle = {
    padding: "20px",
    backgroundColor: theme === "light" ? "#f9f9f9" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
  };

  return(
    <div style={appStyle}>
      <h1>Task Tracker</h1>

      {/* Theme toggle button */}
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Props */}
      <TaskForm onAddTask={addTask}/>

      {/* Controlled Component (select input) */}
      <div style={{ marginTop: "20px" }}>
        <label>Filter Tasks: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <h2 style={{ marginTop: "20px" }}>Tasks</h2>
      {/* Lists and Keys */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "8px" }}>
            {/* Conditional Rendering + Inline Styles */}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(task.id)}
              >
            {task.text}
            </span>
            {/* Delete Button */}
            <button onClick={() => deleteTask(task.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;