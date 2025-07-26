import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

function Signup({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage("✅ Registered successfully! Now login.");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <Box className="signup-container">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Admin Signup
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            fullWidth
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button onClick={onBackToLogin} fullWidth sx={{ mt: 1 }}>
            Back to Login
          </Button>
        </form>

        {message && (
          <Typography sx={{ mt: 2 }} color={message.startsWith("✅") ? "green" : "error"}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Signup;
