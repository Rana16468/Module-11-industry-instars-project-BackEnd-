import  httpStatus  from 'http-status';
import { Request, Response } from "express"
import { UserService } from "./user.services";
import userRespones from '../../utility/userRespones';



const createUserController=async(req:Request,res:Response)=>{


   try{
    const {password,student}=req.body;
  
    const result=await UserService.createStudent(password,student);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})

   }
   catch(error){
    res.status(500).send({success:false,message:'SomeThing Went Wrong',errorMessage:error});
   }

}
export const UserController={
    createUserController
}