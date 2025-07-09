import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function FeeTable({ student, studentIndex, updateFees, readOnly, role }) {
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    const initial = {};
    months.forEach((month) => {
      const entry = student?.fees?.[month];
      initial[month] = entry?.amount || "";
    });
    setAmounts(initial);
  }, [student]);

  const handleChange = (month, value) => {
    if (readOnly) return;
    setAmounts((prev) => ({ ...prev, [month]: value }));
  };

  const handleSave = (month) => {
    if (role !== "admin" || typeof updateFees !== "function") return;
    const amount = Number(amounts[month]);
    if (isNaN(amount)) {
      alert("❌ Invalid amount");
      return;
    }
    updateFees(studentIndex, month, amount);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <h3 style={{ marginLeft: 16 }}>Fee Record for {student.name}</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Paid Amount</TableCell>
            {role === "admin" && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {months.map((month) => {
            const entry = student?.fees?.[month];
            return (
              <TableRow key={month}>
                <TableCell>{month}</TableCell>
                <TableCell>
                  <TextField
                    value={amounts[month]}
                    onChange={(e) => handleChange(month, e.target.value)}
                    size="small"
                    type="number"
                    InputProps={{ readOnly }}
                  />
                  {entry?.date && (
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Paid on: {entry.date}
                    </div>
                  )}
                </TableCell>
                {role === "admin" && (
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSave(month)}
                    >
                      Save
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FeeTable;