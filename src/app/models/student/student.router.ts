import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewere/validationRequest';
import { TSudentZodValidion } from './student.zod.validation';
import auth from '../../middlewere/auth';

const router=express.Router();
router.get('/all-student',auth('user','admin'),StudentController.findAllStudentController);
router.get('/specificStudent/:id',auth('user','admin'),StudentController.findSpecifceController);
router.delete('/deleteUserAndStudent/:id',auth('user','admin'),StudentController.deleteUserAndStudent);
router.patch('/update-Student/:id',auth('user','admin'),validationRequest(TSudentZodValidion.UpdateStudentValidation),StudentController.updateStudent);

export const StudentRouter=router;