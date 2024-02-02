import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

import { TSudentZodValidion } from '../student/student.zod.validation';
import validationRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from '../faculty/faculty.zod.validations';
import { AdminValidation } from '../admin/admin.zod.validation';
import auth from '../../middlewere/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.zod.validation';
import { upload } from '../../utility/sendImageToCloudinary';


const router=express.Router();
router.post('/create-student',auth(USER_ROLE.admin,USER_ROLE.superAdmin),
upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{

    req.body=JSON.parse(req.body.data)
    next();
},
validationRequest(TSudentZodValidion.TStudentValidaionSchema),
UserController.createUserController);
router.post('/create-faculty',auth(USER_ROLE.admin,USER_ROLE.superAdmin),upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{

    req.body=JSON.parse(req.body.data)
    next();
}, 

validationRequest(FacultyValidation.createTFacultySchema),UserController.createFacultyController);



router.post('/create-admin',
auth(USER_ROLE.admin,USER_ROLE.superAdmin),
upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{

    req.body=JSON.parse(req.body.data)
    next();
}, 
validationRequest(AdminValidation.createTAdminSchema),UserController.createAdmin);

// get me router ph-8 // user profilespecificely get 
router.get('/me',auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.user),UserController.getMe);
router.post('/change-status/:id',auth(USER_ROLE.admin),validationRequest(UserValidation.chnageStatusValidationSchema),UserController.chnageStatus)

export const UserRouter=router;