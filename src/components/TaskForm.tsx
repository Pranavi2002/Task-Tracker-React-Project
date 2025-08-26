import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface TaskFormProps {
  onAddTask: (text: string, dueDate: string) => void;
}

interface Errors {
  input?: string;
  dueDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: Errors = {};

    if (!input.trim()) {
      validationErrors.input = "Task name is required";
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (dueDate && dueDate < todayStr) {
      validationErrors.dueDate = "Due date cannot be in the past";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddTask(input, dueDate || "");
    setInput("");
    setDueDate("");
    setErrors({});
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  };

  const addButtonStyle: React.CSSProperties = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    transition: "0.3s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={inputStyle}
      />
      {errors.input && <div style={{ color: "red" }}>{errors.input}</div>}

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={inputStyle}
      />
      {errors.dueDate && <div style={{ color: "red" }}>{errors.dueDate}</div>}

      <motion.button
        type="submit"
        style={addButtonStyle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add
      </motion.button>
    </form>
  );
};

export default TaskForm;