// use Zustand

import React, { useState } from "react";
import useTaskStore from "../store/useTaskStore";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Prevent past due dates
    const today = new Date().toISOString().split("T")[0];
    if (dueDate && dueDate < today) {
      alert("Due date cannot be in the past");
      return;
    }

    addTask({ title, dueDate, completed: false });
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "5px", width: "200px", marginRight: "10px" }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}