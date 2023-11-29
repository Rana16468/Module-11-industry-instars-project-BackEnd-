import express from 'express';
import { StudentRouter } from '../models/student/student.router';
import { UserRouter } from '../models/user/user.router';
import { AcademicSemesterRouter } from '../models/academicSemester/academicSemester.route';

const router=express.Router();


const moduleRouth=[
    {path:'/student',route:StudentRouter},
    {path:'/user',route:UserRouter},
    {path:'/AcademicSemester',route:AcademicSemesterRouter}
]

moduleRouth.forEach((v)=>router.use(v.path,v.route))

export default router;