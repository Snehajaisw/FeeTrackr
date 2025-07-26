import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./signup";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import FeeTable from "./components/FeeTable";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Signup />} />
      <Route path="/students/add" element={<StudentForm />} />
      <Route path="/students/list" element={<StudentList />} />
      <Route path="/students/fees/:id" element={<FeeTable />} />
    </Routes>
  );
}

export default AppRoutes;