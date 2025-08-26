import React, {useContext} from "react";
// import { ThemeContext } from "../context/ThemeContext";
import useTheme from "../hooks/useTheme";

export default function About() {
    // const { theme } = useContext(ThemeContext);
    const { theme } = useTheme();

     const style = {
    padding: "20px",
    minHeight: "70vh",
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#222" : "#f4f4f9",
    transition: "0.3s",
    textAlign: "center",
  };

  return (
    <div style={style}>
      <h1>About Page</h1>
      <p>This is a React Task Tracker app. Features include add/edit/delete tasks, filter, sort, and theme toggle.</p>
    </div>
  );
}