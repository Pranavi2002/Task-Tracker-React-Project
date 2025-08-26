import React from "react";
import { Box, Typography, useTheme as useMUITheme } from "@mui/material";

export default function About() {
  const muiTheme = useMUITheme();

  return (
    <Box sx={{ p: 3, minHeight: "70vh", bgcolor: "background.default", color: "text.primary" }}>
      <Typography variant="h4" gutterBottom>
        About Page
      </Typography>
      <Typography>
        This is a React Task Tracker app. Features include add/edit/delete tasks, filter, sort, and theme toggle.
      </Typography>
    </Box>
  );
}