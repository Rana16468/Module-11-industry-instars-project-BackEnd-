import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { CourseValidation } from './course.zod.validations';
import { CourseController } from './course.controller';

const router=express.Router();

router.post('/create-course',validationRequest(CourseValidation.createTCourseValidationSchema),CourseController.createCourse);
router.get('/',CourseController.getAllCourse);
router.get('/:courseId',CourseController.getSingleCourse);
router.delete('/:courseId',CourseController.removeCourse);
router.patch('/:courseId',validationRequest(CourseValidation.updateTCourseValidationSchema),CourseController.updateCourse);
router.put('/:courseId/create-faculty',validationRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.createCourseFaculty)
router.delete('/:courseId/remove-faculty',validationRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.removeCourseFaculty)
export const CourseRouter=router;