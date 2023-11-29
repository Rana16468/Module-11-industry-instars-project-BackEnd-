import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewere/validationRequest';
import { academicSemesterValidation } from './academicSemester.zod.validation';

const router=express.Router();

router.post('/create-semester',validationRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),AcademicSemesterController.createAcademicSemester);

export const AcademicSemesterRouter=router;