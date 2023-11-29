import httpStatus from "http-status";
import { Response,Request} from "express";
import { StudentService } from "./student.services"
import userRespones from "../../utility/userRespones";
import catchAsyc from "../../utility/catchAsync";






const findAllStudentController= catchAsyc(async(req:Request,res:Response)=>{

   const result=await StudentService.findAllStudent();
   userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})
  
})

const findSpecifceController=catchAsyc(async(req:Request,res:Response)=>{

 
    const {id}=req.params;
    const result=await StudentService.findSpecifceStudent(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})
  
  })

export const StudentController={
    findAllStudentController,
    findSpecifceController
}