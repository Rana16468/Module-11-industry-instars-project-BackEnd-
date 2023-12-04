import httpStatus from "http-status";
import { Response,Request} from "express";
import { StudentService } from "./student.services"
import userRespones from "../../utility/userRespones";
import catchAsyc from "../../utility/catchAsync";






const findAllStudentController= catchAsyc(async(req:Request,res:Response)=>{

const data=req.query;
console.log(data);
   const result=await StudentService.findAllStudent(data);
   userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})
  
})

const findSpecifceController=catchAsyc(async(req:Request,res:Response)=>{

 
    const {id}=req.params;
    const result=await StudentService.findSpecifceStudent(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly find Specific Student',data:result})
  
  });

  const deleteUserAndStudent=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;

    const result=await StudentService.deleteStudentAndUserIntoDb(id);
   
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly Deleted User And  Student',data:result})
  });

  const updateStudent=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const data=req.body.student;

    const result=await StudentService.updateStudentIntoDb(id,data);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Student Data Updated',data:result})


  });

export const StudentController={
    findAllStudentController,
    findSpecifceController,
    deleteUserAndStudent,
    updateStudent
}