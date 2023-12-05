import express from 'express';
import { UserController } from './user.controller';

import { TSudentZodValidion } from '../student/student.zod.validation';
import validationRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from '../faculty/faculty.zod.validations';

const router=express.Router();
router.post('/create-student', validationRequest(TSudentZodValidion.TStudentValidaionSchema),UserController.createUserController);
router.post('/create-faculty', validationRequest(FacultyValidation.createTFacultySchema),UserController.createFacultyController);
export const UserRouter=router;