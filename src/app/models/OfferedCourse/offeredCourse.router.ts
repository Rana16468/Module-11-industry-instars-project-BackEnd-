import express from 'express';
import validationRequest from '../../middlewere/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.zod.validation';
import { OfferedCourseController } from './offeredCourse.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(OfferedCourseValidation.createTOfferedCourseValidation),OfferedCourseController.createOfferedCourse);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validationRequest(OfferedCourseValidation.updateTOfferedCourseValidation),OfferedCourseController.updateOfferedCourse)
router.get('/',OfferedCourseController.getAllOfferedCourses);
router.get('/:id',OfferedCourseController.getSingleOfferedCourse);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),OfferedCourseController.deleteOfferedCourse);
router.get('/:id', auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty, USER_ROLE.user, ), OfferedCourseController.getMyOfferedCourses);
export const  OfferedCourseRouter= router;