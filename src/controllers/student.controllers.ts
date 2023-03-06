import Student, { StudentDocument } from "../models/student";
import { Request, Response } from "express";


export const getAllStudents = async (req: Request, res: Response) => { 


    try {
        const students = await Student.find();
        res.json(students);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    


}


// Get a single student by ID
export const getStudentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
};
  


// Create a new student
export const createStudent = async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
    } = req.body;
    const student: StudentDocument = new Student({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
    });
    try {
      const newStudent = await student.save();
      res.status(201).json(newStudent);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
};
  




// Update an existing student
export const updateStudent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
    } = req.body;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      student.firstName = firstName;
      student.lastName = lastName;
      student.email = email;
      student.phone = phone;
      student.dateOfBirth = dateOfBirth;
      student.gender = gender;
      student.address = address;
      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
};
  
  



// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      await student.deleteOne();
      res.json({ message: 'Student deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
};
  
