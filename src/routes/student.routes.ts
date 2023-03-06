import {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  createStudent,
} from "../controllers/student.controllers";

import express, { Router } from "express";

const router = express.Router();

router.get("/", getAllStudents).get("/:id", getStudentById);

router.post("/", createStudent).patch("/:id", updateStudent).delete("/:id", deleteStudent);


export default router;

