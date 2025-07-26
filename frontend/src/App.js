import axios from "axios";
import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import FeeTable from "./components/FeeTable";
import Signup from "./signup";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Modal, Box as MuiBox } from "@mui/material";


import {
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";



function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "", role: "admin" });
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);



  const adminUsername = localStorage.getItem("adminUsername");
  const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


  const handleViewDetails = (student) => {
  setViewStudent(student);
};


  // ✅ Logout function (FIXED)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginData({ username: "", password: "", role: "admin" });
    setSelectedStudent(null);
    localStorage.removeItem("token");
  };

  // ✅ Load students (only for admin after login)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && currentUser?.role === "admin") {
      axios
        .get("https://feetrackr-backend.onrender.com", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            adminId: currentUser?.id,
          },
        })
        .then((res) => {
          const fetched = res.data.students.map((s) => ({
            ...s,
            fees: s.fees || {},
          }));
          setStudents(fetched);
        })
        .catch((err) => console.error("Error loading students:", err));
    }
  }, [currentUser]);

  // ✅ LOGIN
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://feetrackr-backend.onrender.com", {
      username: loginData.username,
      password: loginData.password,
    });
    const data = res.data;
    localStorage.setItem("token", data.token);

    // 🟢 SAVE ADMIN NAME HERE
    localStorage.setItem("adminUsername", loginData.username);

    setIsLoggedIn(true);
    setCurrentUser({
      role: loginData.role,
      username: loginData.username,
      id: data.userId,
    });
    setLoginError("");
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    setLoginError("Login failed. Please check credentials.");
  }
};


  // ✅ ADD STUDENT (admin only)
  const addStudent = (student) => {
  const token = localStorage.getItem("token");

  axios
    .post(
      "https://feetrackr-backend.onrender.com",
      { ...student, adminId: currentUser?.id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Student added:", res.data.student); // Debugging
      alert("✅ Student added: " + res.data.student.name);
      setStudents((prev) => [...prev, res.data.student]);
    })
    .catch((err) => {
      console.error("❌ Add student error:", err.response?.data || err.message);
      alert("❌ Error: " + (err.response?.data?.message || "Unknown error"));
    });
};

  // ✅ DELETE STUDENT (admin only)
  const deleteStudent = async (index) => {
    const student = students[index];
    if (!student || !student._id) return;

    const confirm = window.confirm(`Delete student ${student.name}?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`https://feetrackr-backend.onrender.com${student._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          adminId: currentUser?.id,
        },
      });

      if (res.status === 200) {
        alert("✅ Student deleted!");
        const updated = [...students];
        updated.splice(index, 1);
        setStudents(updated);
      } else {
        alert("❌ Failed to delete: " + res.data.message);
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("❌ Could not connect to backend");
    }
  };

  // ✅ UPDATE FEES (admin only)
  const updateFees = async (studentIndex, month, amount) => {
    const student = students[studentIndex];
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://feetrackr-backend.onrender.com/${student._id}/fees`,
        {
          month,
          amount,
          adminId: currentUser?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const updated = [...students];
        updated[studentIndex] = {
          ...student,
          fees: {
            ...student.fees,
            [month]: {
              amount,
              date: new Date().toISOString().slice(0, 10),
            },
          },
        };
        setStudents(updated);
        alert("✅ Fee updated successfully!");
      } else {
        alert("❌ Failed to update fees: " + res.data.message);
      }
    } catch (err) {
      alert("❌ Failed to connect to backend");
      console.error("Fee update error:", err);
    }
  };

  // ✅ LOGIN SCREEN
  return (
    
  <Router>
    <Routes>
      {/* 🚀 Landing Page Route */}
      <Route path="/" element={<LandingPage />} />

      {/* 🔐 Login Route with Role-Based Views */}
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Box className="login-container">
              <Paper elevation={4} className="login-card">
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Welcome to FeeTrackr
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#00BFFF", fontWeight: 500 }}>
                    Simplify your fee records.
                  </Typography>
                </Box>
                {showSignup ? (
                  <Signup onBackToLogin={() => setShowSignup(false)} />
                ) : (
                  <>
                    <form onSubmit={handleLogin}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                          labelId="role-label"
                          value={loginData.role}
                          label="Role"
                          onChange={(e) =>
                            setLoginData({ ...loginData, role: e.target.value })
                          }
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="student">Student</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Username"
                        value={loginData.username}
                        onChange={(e) =>
                          setLoginData({ ...loginData, username: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                      />
                      {loginError && (
                        <Typography color="error" align="center">
                          {loginError}
                        </Typography>
                      )}
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                      </Button>
                    </form>
                    <Button onClick={() => setShowSignup(true)} fullWidth sx={{ mt: 1 }}>
                      New Admin? Create Account
                    </Button>
                  </>
                )}
              </Paper>
            </Box>
          ) : currentUser?.role === "student" ? (
            <div className="container">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <h1>Welcome, {currentUser.username}</h1>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6">Your Details</Typography>
              </Paper>
              <FeeTable
                student={students.find((s) => s.username === currentUser?.username)}
                studentIndex={students.findIndex((s) => s.username === currentUser?.username)}
                updateFees={updateFees}
                readOnly={true}
                role="student"
              />
              
            </div>

            
          ) : (
            <div className="container">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                
                <div>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Welcome to FeeTrackr
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#00BFFF", fontWeight: 500 }}>
                    Simplify your fee records.
                  </Typography>
                </div>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
              <Modal open={viewStudent !== null} onClose={() => setViewStudent(null)}>
  <MuiBox sx={modalStyle}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Student Details
    </Typography>
    {viewStudent && (
      <>
        <Typography><strong>Name:</strong> {viewStudent.name}</Typography>
        <Typography><strong>Phone:</strong> {viewStudent.phone}</Typography>
        <Typography><strong>Class:</strong> {viewStudent.className}</Typography>
        <Typography><strong>Monthly Fee:</strong> ₹{viewStudent.fee}</Typography>
        <Typography><strong>Username:</strong> {viewStudent.username}</Typography>
        <Typography><strong>Password:</strong> {viewStudent.password}</Typography>
       <Typography>
  <strong>Start Date:</strong>{" "}
  {viewStudent.startDate
    ? new Date(viewStudent.startDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A"}
</Typography>

        <Button
          variant="outlined"
          onClick={() => setViewStudent(null)}
          sx={{ mt: 2 }}
          fullWidth
        >
          Close
        </Button>
      </>
    )}
  </MuiBox>
</Modal>

              <StudentForm addStudent={addStudent} adminUsername={currentUser?.username} />
              <StudentList
                students={students}
                setSelectedStudent={setSelectedStudent}
                deleteStudent={deleteStudent}
                onViewDetails={handleViewDetails}
              />
              {selectedStudent !== null && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => setSelectedStudent(null)}
                  >
                    Back
                  </Button>
                  <FeeTable
                    student={students[selectedStudent]}
                    studentIndex={selectedStudent}
                    updateFees={updateFees}
                    readOnly={false}
                    role="admin"
                  />
                </>
              )}
            </div>
            
          )
        }
      />
    </Routes>
  </Router>
);
}

export default App;
