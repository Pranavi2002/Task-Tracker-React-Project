// use Zustand

import React from "react";
import useTaskStore from "../store/useTaskStore";

export default function TaskItem({ task }) {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#fff",
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            marginLeft: "10px",
          }}
        >
          {task.title} {task.dueDate && `(Due: ${task.dueDate})`}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}