import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

function StudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [className, setClassName] = useState("");
  const [fee, setFee] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !className || !fee || !username || !password) return;
    addStudent({ name, phone, className, fee, username, password });
    setName("");
    setphone("");
    setClassName("");
    setFee("");
    setUsername("");
    setPassword("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Phone No."
        value={phone}
        onChange={(e) => setphone(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Monthly Fee"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
        type="number"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Student
      </Button>
    </Box>
  );
}

export default StudentForm;