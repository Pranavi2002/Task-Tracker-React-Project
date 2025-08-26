import React, { useState } from "react";
// import { ThemeContext } from "../context/ThemeContext";
import useTheme from "../hooks/useTheme";
import { motion } from "framer-motion"; // Framer Motion import

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  // const { theme } = useContext(ThemeContext);
  const { theme } = useTheme();
  const [editDate, setEditDate] = useState(task.dueDate || ""); // ensure string
    const [errors, setErrors] = useState({}); // track validation errors during edit

  const handleSave = () => {
    // if (newText.trim()) {
    //   // update task text and dueDate
    //   onEdit(task.id, { text: newText, dueDate: editDate || "" });
    //   setIsEditing(false);
    // }
    let validationErrors = {};

  // Task name required
  if (!newText.trim()) {
    validationErrors.text = "Task name is required";
  }

  // // Due date cannot be past
  // if (editDate && new Date(editDate) < new Date().setHours(0, 0, 0, 0)) {
  //   validationErrors.dueDate = "Due date cannot be in the past";
  // } // this doesn't allow today's date also

  // Due date cannot be past
  // Get today's date in local timezone
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // months 0-11
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      // Compare input
      if (editDate && editDate < todayStr) {
          validationErrors.dueDate = "Due date cannot be in the past";
      }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors); // new state for errors
    return;
  }

  // Save changes
  onEdit(task.id, { text: newText, dueDate: editDate || "" });
  setIsEditing(false);
  setErrors({});
  };

    // Overdue check: only if not completed
  const isOverdue =
    !task.completed &&
    task.dueDate &&
    new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

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

  // Framer Motion variants for task animations
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    // <li
    <motion.li
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      layout // smooth layout animation for reordering
    style={{
      marginBottom: "10px",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      boxShadow: theme === "light" ? "0 1px 4px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
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
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.text}
              </div>
            )}
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{ flexGrow: 1, marginRight: "10px", padding: "5px" }}
          />
          {errors.dueDate && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.dueDate}
              </div>
            )}
          {/* <button
            onClick={handleSave}
            style={editButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565C0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#87CEEB")}
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={editButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565C0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#87CEEB")}
          >
            Cancel
          </button> */}

          <motion.button
            onClick={handleSave}
            style={editButtonStyle}
            whileHover={{ scale: 1.1 }} // // enlarge button slightly on hover animation
            whileTap={{ scale: 0.95 }}  // // shrink slightly on click/tap animation
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
              color: isOverdue ? "red" : "inherit", // red overdue
            }}
          >
            {task.text}{" "} 
            {task.dueDate && `(Due: ${task.dueDate}${
              isOverdue ? " ⚠️ Overdue" : ""
            })`}
          </span>
          {/* <button
            onClick={() => setIsEditing(true)}
            style={editButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565C0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#87CEEB")}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={deleteButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#9a0007")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
          >
            ❌ Delete
          </button> */}
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
    // </li>
  );
}

export default React.memo(TaskItem);