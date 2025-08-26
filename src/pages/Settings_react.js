import React, { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
import useTheme from "../hooks/useTheme";

export default function Settings() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { theme, toggleTheme } = useTheme();

    const style = {
    padding: "30px",
    minHeight: "70vh",
    backgroundColor: theme === "light" ? "#f9f9f9" : "#222",
    color: theme === "light" ? "#222" : "#f4f4f9",
    transition: "0.3s",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    padding: "20px 40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "100%",
  };

  const toggleContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  };

  const switchStyle = {
    position: "relative",
    display: "inline-block",
    width: "60px",
    height: "34px",
  };

  const sliderStyle = {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme === "light" ? "#ccc" : "#4caf50",
    transition: ".4s",
    borderRadius: "34px",
  };

  const knobStyle = {
    position: "absolute",
    height: "26px",
    width: "26px",
    left: theme === "light" ? "4px" : "30px",
    bottom: "4px",
    backgroundColor: "white",
    borderRadius: "50%",
    transition: ".4s",
  };

  return (
    <div style={style}>
      <div style={cardStyle}>
        <h1>Settings</h1>
        <div style={toggleContainer}>
          <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
          <div style={switchStyle} onClick={toggleTheme}>
            <div style={sliderStyle}></div>
            <div style={knobStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}