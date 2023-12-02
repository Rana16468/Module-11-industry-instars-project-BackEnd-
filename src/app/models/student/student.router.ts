import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewere/validationRequest';
import { TSudentZodValidion } from './student.zod.validation';

const router=express.Router();
router.get('/all-student',StudentController.findAllStudentController);
router.get('/specificStudent/:id',StudentController.findSpecifceController);
router.delete('/deleteUserAndStudent/:id',StudentController.deleteUserAndStudent);
router.patch('/update-Student/:id',validationRequest(TSudentZodValidion.UpdateStudentValidation),StudentController.updateStudent);

export const StudentRouter=router;