import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion import

function TaskForm({onAddTask}){
    // Controlled Component
    const [input, setInput] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState({}); // track validation errors

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        let validationErrors = {};
        // if (input.trim() === "") return; // ignore empty input
        // Task name required
        if (!input.trim()) {
        validationErrors.input = "Task name is required";
        }
        // // Due date cannot be past
        // if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
        // validationErrors.dueDate = "Due date cannot be in the past";
        // } // // this doesn't allow today's date also

          // Due date cannot be past
          // Get today's date in local timezone
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // months 0-11
            const dd = String(today.getDate()).padStart(2, '0');
            const todayStr = `${yyyy}-${mm}-${dd}`;

            // Compare input
            if (dueDate && dueDate < todayStr) {
                validationErrors.dueDate = "Due date cannot be in the past";
            }

        // If there are errors, show them
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }
        onAddTask(input, dueDate || ""); // call function from parent send the input text and due date to parent component
        setInput(""); // clear input after adding
        setDueDate("") // clear date after adding
        setErrors({});
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

    return(
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input 
            type="text"
            placeholder="Enter a task"
            value={input} // controlled input
            onChange={(e) => setInput(e.target.value)} // update state
            style={inputStyle}/>
            {errors.input && <div style={{ color: "red" }}>{errors.input}</div>}
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={inputStyle}
            />
            {errors.dueDate && <div style={{ color: "red" }}>{errors.dueDate}</div>}
            {/* <button 
            type="submit" 
            style={addButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2e7d32")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
                Add
            </button> */}
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
}

export default TaskForm;