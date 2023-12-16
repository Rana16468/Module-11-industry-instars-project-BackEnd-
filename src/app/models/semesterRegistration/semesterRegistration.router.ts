import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.zod.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router=express.Router();

router.post('/',validationRequest(SemesterRegistrationValidation.createTSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration);
router.get('/',SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id',validationRequest(SemesterRegistrationValidation.updateTSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration);
router.delete('/:id',SemesterRegistrationController.deleteSemesterRegistration);
export const SemesterRegistrationRouter=router;