import express from 'express';
import { UserController } from './user.controller';

import { TSudentZodValidion } from '../student/student.zod.validation';
import validationRequest from '../../middlewere/validationRequest';

const router=express.Router();
router.post('/create-student', validationRequest(TSudentZodValidion.TStudentValidaionSchema),UserController.createUserController);
export const UserRouter=router;