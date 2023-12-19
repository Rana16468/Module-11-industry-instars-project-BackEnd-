import  httpStatus  from 'http-status';
import { Request, RequestHandler, Response } from "express"
import { UserService } from "./user.services";
import userRespones from '../../utility/userRespones';
import catchAsyc from '../../utility/catchAsync';



const createUserController=catchAsyc(async(req:Request,res:Response)=>{

     const {password,student}=req.body;
   
     const result=await UserService.createStudent(password,student);
     userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly Created Student',data:result})
 
 });
 const createFacultyController=catchAsyc(async(req:Request,res:Response)=>{


    const {password,faculty}=req.body;
    const result=await UserService.createFacultyIntoDb(password,faculty);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly  Created Faculty',data:result})
 });

 const createAdmin:RequestHandler=catchAsyc(async(req,res)=>{

    const {password,admin}=req.body;
    const result=await UserService.createAdminIntoDB(password,admin);
   userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Admin Created',data:result});
  
  })
export const UserController={
    createUserController,
    createFacultyController,
    createAdmin
}