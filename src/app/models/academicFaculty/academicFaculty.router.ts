import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middlewere/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.zod.validations';


const router=express.Router();


router.post('/create-AcademicFaculty',validationRequest(AcademicFacultyValidation.createAcademicFacultyValidauion),AcademicFacultyController.createAcademicFaculty);
router.get('/All-AcademicFaculty',AcademicFacultyController.getAllAcademicFaculty);
router.get('/single-AcademicFaculty/:id',AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/update-AcademicFaculty/:id',validationRequest(AcademicFacultyValidation.updateAcademicFaculyValidation),AcademicFacultyController.updateAcademicFaculty);
export const AcademicFacultyRouter=router