import express from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from './faculty.zod.validations';
import auth from '../../middlewere/auth';



const router=express.Router();

router.get('/All-Faculty',auth('faculty','admin'),FacultyController.getAllFaculty);
router.get('/single-Faculty/:id',FacultyController.getSingleFaculty);
router.delete('/delete-faculty/:id',FacultyController.deleteFaculty);
router.patch('/update-faculty/:facultyId', validationRequest(FacultyValidation.updateFacultyValidationSchema),FacultyController.updateFaculty);


export const FacultyRouter=router;