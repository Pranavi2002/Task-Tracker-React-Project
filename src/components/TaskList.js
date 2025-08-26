import React from "react";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";
import { FixedSizeList as List } from "react-window";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <TaskItem task={tasks[index]} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );

  return (
    <AnimatePresence>
      <List height={400} itemCount={tasks.length} itemSize={80} width="100%">
        {Row}
      </List>
    </AnimatePresence>
  );
}