import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function StudentList({ students, setSelectedStudent, deleteStudent }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone No.</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Monthly Fee</TableCell>
            <TableCell>Fees</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(students) &&
            students.map((student, idx) =>
              student ? (
                <TableRow key={idx}>
                  <TableCell>{student.name || "N/A"}</TableCell>
                  <TableCell>{student.phone || "N/A"}</TableCell>
                  <TableCell>{student.className || "N/A"}</TableCell>
                  <TableCell>{student.fee || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setSelectedStudent(idx)}
                    >
                      Manage Fees
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteStudent(idx)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentList;
