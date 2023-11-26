import { Response,Request } from "express";
import { StudentService } from "./student.services"






const findAllStudentController= async(req:Request,res:Response)=>{

   try{
    const result=await StudentService.findAllStudent();
     res.status(200).send({success:true,message:'Successfuly find All Student',data:result})
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch(error:any){
    res.status(500).send({success:false, message:'Something Went Wrong',errorMessage:error?.message})

   }

}

const findSpecifceController=async(req:Request,res:Response)=>{

try{
  const {id}=req.params;
  const result=await StudentService.findSpecifceStudent(id);
  res.status(200).send({success:true,message:'Successfuly find Specific Student',data:result})

}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
catch(error:any){
  res.status(500).send({success:false, message:'Something Went Wrong',errorMessage:error?.message})

}

}

export const StudentController={
    findAllStudentController,
    findSpecifceController
}