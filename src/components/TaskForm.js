import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { motion } from "framer-motion";

function TaskForm({ onAddTask }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split("T")[0];
    const validationErrors = {};
    if (!input.trim()) validationErrors.input = "Task name is required";
    if (dueDate && dueDate < todayStr) validationErrors.dueDate = "Due date cannot be in the past";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddTask(input, dueDate || "");
    setInput("");
    setDueDate("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2, alignItems: "center" }}>
        <TextField
          label="Task Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={!!errors.input}
          helperText={errors.input || ""}
          fullWidth
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors.dueDate}
          helperText={errors.dueDate || ""}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </motion.div>
      </Stack>
    </form>
  );
}

export default TaskForm;