import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middlewere/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.zod.validations';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';



const router=express.Router();


router.post('/create-AcademicFaculty',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(AcademicFacultyValidation.createAcademicFacultyValidauion),AcademicFacultyController.createAcademicFaculty);
router.get('/All-AcademicFaculty',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),AcademicFacultyController.getAllAcademicFaculty);
router.get('/single-AcademicFaculty/:id',auth(USER_ROLE.admin,USER_ROLE.admin,USER_ROLE.faculty),AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/update-AcademicFaculty/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(AcademicFacultyValidation.updateAcademicFaculyValidation),AcademicFacultyController.updateAcademicFaculty);
export const AcademicFacultyRouter=router