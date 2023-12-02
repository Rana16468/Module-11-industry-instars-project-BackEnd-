import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewere/validationRequest';
import { academicSemesterValidation } from './academicSemester.zod.validation';

const router=express.Router();

router.post('/create-semester',validationRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),AcademicSemesterController.createAcademicSemester);
router.get('/all-AcademicSemester',AcademicSemesterController.getAllAcademicSemester);
router.get('/single-AcademicSemester/:id',AcademicSemesterController.getSingleAcademicSemester);
router.patch('/update-AcademicSemester/:id',AcademicSemesterController.updateAcademicSemester);
export const AcademicSemesterRouter=router;