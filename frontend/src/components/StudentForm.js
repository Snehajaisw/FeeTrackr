import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

function StudentForm({ addStudent, adminUsername }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [className, setClassName] = useState("");
  const [fee, setFee] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [startDate, setStartDate] = useState("");
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !className || !fee || !startDate || !username || !password) return;
    addStudent({ name, phone, className, fee,startDate, username, password });
    setName("");
    setPhone("");
    setClassName("");
    setFee("");
    setStartDate("")
    setUsername("");
    setPassword("");
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* 🔒 Admin Info Section */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: "#e3f2fd",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
  variant="body1"
  sx={{
    fontWeight: 'bold',
   
    color: '#0D47A1', // dark blue for visibility
    letterSpacing: 1,
    fontSize: '1rem'
  }}
>
   Logged in as: {adminUsername}
</Typography>

      </Box>

      {/* 👨‍🎓 Student Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          label="Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          label="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          label="Monthly Fee"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
  label="Start Date"
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  size="small"
  InputLabelProps={{
    shrink: true, // Keeps label above even if date is selected
  }}
  sx={{ mr: 1, mb: 1 }}
/>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
        >
          Add Student
        </Button>
      </Box>
    </Box>
  );
}

export default StudentForm;