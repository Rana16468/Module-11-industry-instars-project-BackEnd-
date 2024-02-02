import express from 'express';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';
import validationRequest from '../../middlewere/validationRequest';
import { EnrolledCourseValidation } from './enrolledCourse.zod.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';



const router=express.Router();
router.post('/create-enrolled-course',auth(USER_ROLE.user),validationRequest(EnrolledCourseValidation.createEnrolledCourseValidation),EnrolledCourseController.createEnrolledCourse);
router.patch(
    '/update-enrolled-course-marks',
    auth(USER_ROLE.faculty,USER_ROLE.admin,USER_ROLE.superAdmin),
   validationRequest(EnrolledCourseValidation.updateEnrolledCourseMarksValidationZodSchema),EnrolledCourseController.updateEnrollmentCourseMarks
   
  );


export const EnrolledCourseRouter=router;