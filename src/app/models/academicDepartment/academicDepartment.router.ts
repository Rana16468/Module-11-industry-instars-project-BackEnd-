import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validationRequest from '../../middlewere/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.zod.validation';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/create-AcademicDepartment',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation),AcademicDepartmentController.createAcademicDepartment);
router.get('/all-AcademicDepartment',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),AcademicDepartmentController.getAllAcademicDepartment);
router.get('/single-AcademicDepartment/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/update-AcademicDepartment/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation),AcademicDepartmentController.updateAcademicDepartent);

export const AcademicDepartmentRoute=router;