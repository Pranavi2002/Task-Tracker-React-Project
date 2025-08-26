// using react-hook-form

import React from "react";
import { motion } from "framer-motion"; // For button animations
import { useForm } from "react-hook-form";

function TaskForm({ onAddTask }) {
  // Initialize react-hook-form
  const {
    register,      // register inputs for validation
    handleSubmit,  // handle form submission
    reset,         // reset form fields
    formState: { errors }, // track validation errors
  } = useForm();

  // Function called on form submit
  const onSubmit = (data) => {
    // data has { text, dueDate }
    onAddTask(data.text, data.dueDate || ""); // send to parent
    reset(); // clear the form
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  };

  const addButtonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    transition: "0.3s",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // react-hook-form submit handler
      style={{ marginTop: "20px" }}
    >
      {/* Task Name Input */}
      <input
        type="text"
        placeholder="Enter a task"
        style={inputStyle}
        {...register("text", { required: "Task name is required" })} // validation rule
      />
      {/* Show error if task name is missing */}
      {errors.text && <div style={{ color: "red" }}>{errors.text.message}</div>}

      {/* Due Date Input */}
      <input
        type="date"
        style={inputStyle}
        {...register("dueDate", {
          validate: (value) => {
            if (!value) return true; // due date is optional
            const today = new Date().setHours(0, 0, 0, 0);
            return new Date(value) >= today || "Due date cannot be in the past";
          },
        })}
      />
      {/* Show error if due date is in the past */}
      {errors.dueDate && <div style={{ color: "red" }}>{errors.dueDate.message}</div>}

      {/* Submit Button with Framer Motion hover/tap effects */}
      <motion.button
        type="submit"
        style={addButtonStyle}
        whileHover={{ scale: 1.05 }} // hover animation
        whileTap={{ scale: 0.95 }}   // tap animation
      >
        Add
      </motion.button>
    </form>
  );
}

export default TaskForm;