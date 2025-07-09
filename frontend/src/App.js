import axios from "axios";
import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import FeeTable from "./components/FeeTable";
import "./styles.css";
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

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "", role: "admin" });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/students")
    .then((res) => {
      const fetched = res.data.students.map((s) => ({
        ...s,
        fees: s.fees || {},  // Ensure fees is always an object
      }));
      setStudents(fetched);
    })
    .catch((err) => console.error("Error loading students:", err));
}, []);


  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.role === "admin") {
      if (
        loginData.username === ADMIN_USERNAME &&
        loginData.password === ADMIN_PASSWORD
      ) {
        setIsLoggedIn(true);
        setCurrentUser({ role: "admin", username: ADMIN_USERNAME });
        setLoginError("");
      } else {
        setLoginError("Invalid admin username or password");
      }
    } else {
      const found = students.find(
        (s) =>
          s.username === loginData.username &&
          s.password === loginData.password
      );
      if (found) {
        setIsLoggedIn(true);
        setCurrentUser({ role: "student", username: found.username });
        setLoginError("");
      } else {
        setLoginError("Invalid student username or password");
      }
    }
  };

  const addStudent = (student) => {
  axios.post("http://localhost:5000/api/students", student)
    .then(res => {
      const addedStudent = res.data.student;
      alert("✅ New student added: " + addedStudent.name);
      setStudents(prev => [...prev, addedStudent]);
    })
    .catch(err => console.error("❌ Add student error:", err));
};

  const deleteStudent = async (index) => {
  const studentToDelete = students[index];
  if (!studentToDelete || !studentToDelete._id) return;

  const confirm = window.confirm(`Delete student ${studentToDelete.name}?`);
  if (!confirm) return;

  try {
    const response = await fetch(`http://localhost:5000/api/students/${studentToDelete._id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Student deleted!");
      const updated = [...students];
      updated.splice(index, 1);
      setStudents(updated);
    } else {
      alert("❌ Failed to delete: " + data.message);
    }
  } catch (err) {
    console.error("Error deleting student:", err);
    alert("❌ Could not connect to backend");
  }
};


const updateFees = async (studentIndex, month, amount) => {
  const student = students[studentIndex];
  try {
    const response = await fetch(`http://localhost:5000/api/students/${student._id}/fees`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ month, amount }),
    });

    const data = await response.json();

    if (response.ok) {
      const updated = [...students];
      updated[studentIndex] = {
        ...students[studentIndex],
        fees: {
          ...students[studentIndex].fees,
          [month]: {
            amount: amount,
            date: new Date().toISOString().slice(0, 10)  // 👈 same format as backend
          }
        }
      };
      setStudents(updated);
      alert("✅ Fee updated successfully!");
    } else {
      alert("❌ Failed to update fees: " + data.message);
    }
  } catch (error) {
    alert("❌ Failed to connect to backend");
    console.error("Fee update error:", error);
  }
};



  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginData({ username: "", password: "", role: "admin" });
    setSelectedStudent(null);
  };

 if (!isLoggedIn) {
  return (
    <Box className="login-container">
      <Paper elevation={4} className="login-card">
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome to FeeTrackr
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#00BFFF', fontWeight: 500 }}>
            Simplify your fee records.
          </Typography>
        </Box>
        {/* your login form below here */}


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
              autoFocus
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  if (currentUser?.role === "student") {
  const student = students.find((s) => s.username === currentUser?.username);

  // ✅ Prevent crash: show message until student is loaded
  if (!student) {
    return (
      <div className="container">
        <h2>⏳ Loading student data...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Welcome, {student.name}</h1>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Your Details</Typography>
        <Typography>Name: {student.name}</Typography>
        <Typography>Phone No.: {student.phone}</Typography>
        <Typography>Class: {student.className}</Typography>
        <Typography>Monthly Fee: ₹{student.fee}</Typography>
      </Paper>
      <FeeTable
  student={student}
  studentIndex={students.indexOf(student)}
  updateFees={updateFees}
  readOnly={true} // Students should not edit
  role="student"
/>
    </div>
  );
}


  return (
    <div className="container">
      <Box display="flex" justifyContent="space-between" alignItems="center">
  <div>
    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
      Welcome to FeeTrackr
    </Typography>
    <Typography variant="subtitle1" sx={{ color: '#00BFFF', fontWeight: 500 }}>
  Simplify your fee records.
</Typography>
  </div>
  <Button
    variant="outlined"
    color="secondary"
    onClick={handleLogout}
  >
    Logout
  </Button>
</Box>

      <StudentForm addStudent={addStudent} />
      <StudentList
        students={students}
        setSelectedStudent={setSelectedStudent}
        deleteStudent={deleteStudent}
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
  readOnly={false} // Admins can edit
  role="admin"
/>
        </>
      )}
    </div>
  );
}

export default App;