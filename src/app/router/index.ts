import express from 'express';
import { StudentRouter } from '../models/student/student.router';
import { UserRouter } from '../models/user/user.router';

const router=express.Router();


const moduleRouth=[
    {path:'/student',route:StudentRouter},
    {path:'/user',route:UserRouter}
]

moduleRouth.forEach((v)=>router.use(v.path,v.route))

export default router;