import express from 'express';
import { StudentController } from './student.controller';

const router=express.Router();
router.get('/all-student',StudentController.findAllStudentController);
router.get('/specificStudent/:id',StudentController.findSpecifceController);

export const StudentRouter=router;