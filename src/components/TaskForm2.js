// using Formik

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion"; // Framer Motion import

export default function TaskForm({ onAddTask }) {
  // Today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    text: Yup.string().required("Task name is required"),
    dueDate: Yup.date()
      .min(today, "Due date cannot be in the past")
      .required("Due date is required"),
  });

  return (
    <Formik
      initialValues={{ text: "", dueDate: today }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        // Call parent handler
        onAddTask(values.text, values.dueDate);
        resetForm(); // Reset form after submit
      }}
    >
      {({ values, handleChange }) => (
        <Form style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {/* Task Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="text"
              placeholder="Enter a task"
              value={values.text}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <ErrorMessage
              name="text"
              component="div"
              style={{ color: "red", marginTop: "2px" }}
            />
          </div>

          {/* Due Date */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <ErrorMessage
              name="dueDate"
              component="div"
              style={{ color: "red", marginTop: "2px" }}
            />
          </div>

          {/* Submit Button with Framer Motion */}
          <motion.button
            type="submit"
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "#fff",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        </Form>
      )}
    </Formik>
  );
}