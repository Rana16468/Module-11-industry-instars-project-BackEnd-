import { Request, Response } from "express"
import { UserService } from "./user.services";



const createUserController=async(req:Request,res:Response)=>{


   try{
    const {password,student}=req.body;
  
    const result=await UserService.createStudent(password,student);
    res.status(200).send({success:true,message:'Student User Create SUccessfully',data:result})

   }
   catch(error){
    res.status(500).send({success:false,message:'SomeThing Went Wrong',errorMessage:error});
   }

}
export const UserController={
    createUserController
}