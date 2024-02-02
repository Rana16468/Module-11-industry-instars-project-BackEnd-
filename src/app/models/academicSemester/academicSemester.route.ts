import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewere/validationRequest';
import { academicSemesterValidation } from './academicSemester.zod.validation';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/create-semester',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),AcademicSemesterController.createAcademicSemester);
router.get('/all-AcademicSemester',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),AcademicSemesterController.getAllAcademicSemester);
router.get('/single-AcademicSemester/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),AcademicSemesterController.getSingleAcademicSemester);
router.patch('/update-AcademicSemester/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),AcademicSemesterController.updateAcademicSemester);
export const AcademicSemesterRouter=router;