import React from "react";
import { Box, Card, CardContent, Typography, FormControlLabel, Switch } from "@mui/material";
import useTheme from "../hooks/useTheme";

export default function Settings() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Box sx={{ p: 3, minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ maxWidth: 400, width: "100%", bgcolor: "background.paper", color: "text.primary" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
            label={mode === "light" ? "Light Mode" : "Dark Mode"}
            />
        </CardContent>
      </Card>
    </Box>
  );
}