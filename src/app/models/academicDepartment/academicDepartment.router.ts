import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validationRequest from '../../middlewere/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.zod.validation';

const router=express.Router();

router.post('/create-AcademicDepartment',validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation),AcademicDepartmentController.createAcademicDepartment);
router.get('/all-AcademicDepartment',AcademicDepartmentController.getAllAcademicDepartment);
router.get('/single-AcademicDepartment/:id',AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/update-AcademicDepartment/:id',validationRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation),AcademicDepartmentController.updateAcademicDepartent);

export const AcademicDepartmentRoute=router;