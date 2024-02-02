import  httpStatus  from 'http-status';
import { Request, RequestHandler, Response } from "express"
import { UserService } from "./user.services";
import userRespones from '../../utility/userRespones';
import catchAsyc from '../../utility/catchAsync';



const createUserController=catchAsyc(async(req:Request,res:Response)=>{

     const {password,student}=req.body;
  
   
     const result=await UserService.createStudent(password,student,req.file);
     userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly Created Student',data:result})
 
 });
 const createFacultyController=catchAsyc(async(req:Request,res:Response)=>{


    const {password,faculty}=req.body;
    const result=await UserService.createFacultyIntoDb(password,faculty,req.file);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly  Created Faculty',data:result})
 });

 const createAdmin:RequestHandler=catchAsyc(async(req,res)=>{

    const {password,admin}=req.body;
    const result=await UserService.createAdminIntoDB(password,admin,req.file);
   userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Admin Created',data:result});
  
  });
  // ph-8
  // get me controller function 
const getMe:RequestHandler=catchAsyc(async(req,res)=>{

    const {userId,role}=req.user;
     const result=await UserService.getMe(userId,role);
     userRespones(res,{statusCode:httpStatus.OK,success:true,message:'User Is Rectrive Successfully',data:result});
   
   
   
   });

   // change status ---ph-8

const chnageStatus:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const result=await UserService.changeStatus(id,req.body);
  
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Chnage User Status  Successfully',data:result});
  
  });
export const UserController={
    createUserController,
    createFacultyController,
    createAdmin,
    getMe,
    chnageStatus
}