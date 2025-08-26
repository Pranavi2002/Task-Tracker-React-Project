import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, TextField, Stack } from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { motion } from "framer-motion";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.dueDate || "");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const validationErrors = {};
    if (!newText.trim()) validationErrors.text = "Task name is required";
    if (editDate && editDate < todayStr) validationErrors.dueDate = "Due date cannot be in the past";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onEdit(task.id, { text: newText, dueDate: editDate || "" });
    setIsEditing(false);
    setErrors({});
  };

  const isOverdue = !task.completed && task.dueDate && task.dueDate < new Date().toISOString().split("T")[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <Card sx={{ my: 1, bgcolor: "background.paper", color: "text.primary" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {isEditing ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexGrow: 1, alignItems: "center" }}>
              <TextField
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                error={!!errors.text}
                helperText={errors.text || ""}
                fullWidth
              />
              <TextField
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dueDate}
                helperText={errors.dueDate || ""}
              />
              <IconButton color="primary" onClick={handleSave}><Save /></IconButton>
              <IconButton color="inherit" onClick={() => setIsEditing(false)}><Cancel /></IconButton>
            </Stack>
          ) : (
            <>
              <Typography
                onClick={() => onToggle(task.id)}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: isOverdue ? "error.main" : "inherit",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
              >
                {task.text} {task.dueDate && `(Due: ${task.dueDate}${isOverdue ? " ⚠️" : ""})`}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={() => setIsEditing(true)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => onDelete(task.id)}><Delete /></IconButton>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default React.memo(TaskItem);