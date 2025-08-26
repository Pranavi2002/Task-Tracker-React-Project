// use Zustand

import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks yet!</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
}