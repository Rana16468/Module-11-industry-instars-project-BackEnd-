import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.zod.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router=express.Router();

router.post('/',validationRequest(OfferedCourseValidation.createTOfferedCourseValidation),OfferedCourseController.createOfferedCourse);
router.patch('/:id',validationRequest(OfferedCourseValidation.updateTOfferedCourseValidation),OfferedCourseController.updateOfferedCourse)
export const OfferedCourseRouter=router;