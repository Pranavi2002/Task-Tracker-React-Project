import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { Box, CssBaseline } from "@mui/material";

export default function App() {
  // const navStyle = {
  //   display: "flex",
  //   justifyContent: "center",
  //   gap: "20px",
  //   margin: "20px 0",
  //   fontSize: "18px",
  // };


  return (
    // <div>
    // no need to use div, while using  Box (for mui)
      <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline /> {/* ensures MUI components adapt to theme */}
    <Navbar />

      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      </Box>
    // </div>
  );
}