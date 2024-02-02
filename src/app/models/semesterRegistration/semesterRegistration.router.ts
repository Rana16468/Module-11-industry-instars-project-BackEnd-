import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.zod.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(SemesterRegistrationValidation.createTSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.faculty,USER_ROLE.user),SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.faculty,USER_ROLE.user),SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(SemesterRegistrationValidation.updateTSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),SemesterRegistrationController.deleteSemesterRegistration);
export const SemesterRegistrationRouter=router;