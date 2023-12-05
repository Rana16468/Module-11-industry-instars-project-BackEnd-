import express from 'express';
import { StudentRouter } from '../models/student/student.router';
import { UserRouter } from '../models/user/user.router';
import { AcademicSemesterRouter } from '../models/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../models/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRoute } from '../models/academicDepartment/academicDepartment.router';
import { FacultyRouter } from '../models/faculty/faculty.router';

const router=express.Router();


const moduleRouth=[
    {path:'/student',route:StudentRouter},
    {path:'/user',route:UserRouter},
    {path:'/AcademicSemester',route:AcademicSemesterRouter},
    {path:'/AcademicFaculty',route:AcademicFacultyRouter},
    {path:'/AcademicDepartment',route:AcademicDepartmentRoute},
    {path:'/Faculty',route:FacultyRouter}
]

moduleRouth.forEach((v)=>router.use(v.path,v.route))

export default router;