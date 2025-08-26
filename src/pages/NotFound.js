import React, {useContext} from "react";
// import { ThemeContext } from "../context/ThemeContext";
import useTheme from "../hooks/useTheme";

function NotFound() {
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
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default NotFound;