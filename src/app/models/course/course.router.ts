import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { CourseValidation } from './course.zod.validations';
import { CourseController } from './course.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/create-course',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(CourseValidation.createTCourseValidationSchema),CourseController.createCourse);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),CourseController.getAllCourse);
router.get('/:courseId',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),CourseController.getSingleCourse);
router.delete('/:courseId',auth(USER_ROLE.admin,USER_ROLE.superAdmin),CourseController.removeCourse);
router.patch('/:courseId',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(CourseValidation.updateTCourseValidationSchema),CourseController.updateCourse);
router.put('/:courseId/create-faculty',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.createCourseFaculty)
router.delete('/:courseId/remove-faculty',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.removeCourseFaculty)
export const CourseRouter=router;