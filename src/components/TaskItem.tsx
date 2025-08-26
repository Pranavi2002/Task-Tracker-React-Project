// src/components/TaskItem.tsx
import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import { motion } from "framer-motion";
import { Task } from "../hooks/useTasks";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedFields: Partial<Task>) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.dueDate || "");
  const [errors, setErrors] = useState<{ text?: string; dueDate?: string }>({});

  const { theme } = useTheme();

  const handleSave = () => {
    const validationErrors: { text?: string; dueDate?: string } = {};

    if (!newText.trim()) validationErrors.text = "Task name is required";

    if (editDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new Date(editDate);
      if (due < today) validationErrors.dueDate = "Due date cannot be in the past";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onEdit(task.id, { text: newText, dueDate: editDate || "" });
    setIsEditing(false);
    setErrors({});
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDue = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = !task.completed && taskDue !== null && taskDue < today;

  const editButtonStyle = {
    padding: "5px 10px",
    marginLeft: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#87CEEB",
    color: "#fff",
    transition: "0.3s",
  };

  const deleteButtonStyle = {
    padding: "5px 10px",
    marginLeft: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#d32f2f",
    color: "#fff",
    transition: "0.3s",
  };

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      layout
      style={{
        marginBottom: "10px",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        boxShadow:
          theme === "light"
            ? "0 1px 4px rgba(0,0,0,0.1)"
            : "0 1px 4px rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{ flexGrow: 1, marginRight: "10px", padding: "5px" }}
          />
          {errors.text && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.text}</div>
          )}
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{ flexGrow: 1, marginRight: "10px", padding: "5px" }}
          />
          {errors.dueDate && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.dueDate}</div>
          )}
          <motion.button
            onClick={handleSave}
            style={editButtonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
          <motion.button
            onClick={() => setIsEditing(false)}
            style={editButtonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              color: isOverdue ? "red" : "inherit",
            }}
          >
            {task.text}{" "}
            {task.dueDate && `(Due: ${task.dueDate}${isOverdue ? " ⚠️ Overdue" : ""})`}
          </span>
          <motion.button
            onClick={() => setIsEditing(true)}
            style={editButtonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
          <motion.button
            onClick={() => onDelete(task.id)}
            style={deleteButtonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ❌ Delete
          </motion.button>
        </>
      )}
    </motion.li>
  );
};

export default React.memo(TaskItem);