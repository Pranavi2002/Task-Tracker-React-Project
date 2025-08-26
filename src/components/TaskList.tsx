import React from "react";
import TaskItem from "./TaskItem";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { AnimatePresence } from "framer-motion";
import { Task } from "../hooks/useTasks";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedFields: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => (
    <div style={style}>
      <TaskItem task={tasks[index]} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );

  return (
    <AnimatePresence>
      <List height={400} itemCount={tasks.length} itemSize={60} width="100%">
        {Row}
      </List>
    </AnimatePresence>
  );
};

export default TaskList;