import  httpStatus  from 'http-status';
import { Request, Response } from "express"
import { UserService } from "./user.services";
import userRespones from '../../utility/userRespones';
import catchAsyc from '../../utility/catchAsync';



const createUserController=catchAsyc(async(req:Request,res:Response)=>{

     const {password,student}=req.body;
   
     const result=await UserService.createStudent(password,student);
     userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})
 
 })
export const UserController={
    createUserController
}