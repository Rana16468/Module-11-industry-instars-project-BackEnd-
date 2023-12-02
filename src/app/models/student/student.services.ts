import mongoose from "mongoose";
import { Student } from "./student.model"
import { USER } from "../user/user.model";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";



//find All Student 
const findAllStudent=async()=>{


    const result=await Student.find().populate({
        path:'academicDepartment',
        populate:'academicFaculty'
    }).populate('admissionSemester');
    return result;

}

// find specific user
const findSpecifceStudent=async(_id:string)=>{

  

    const result=await Student.findOne({_id}).populate({
        path:'academicDepartment',
        populate:'academicFaculty'
    }).populate('admissionSemester');;
    return result;
}

// delete Student And User At A time 

const deleteStudentAndUserIntoDb= async(id:string)=>{

  

    const session=await mongoose.startSession();
    try{
      session.startTransaction();
      const deletedStudent=await Student.findOneAndUpdate({id},{isDeleted:true},{upsert:true,session});
     if(!deletedStudent)
     {
      throw new AppError(httpStatus.BAD_REQUEST,'Student Delete Request Failded','');
     }
  
     const deleteUser=await USER.findOneAndUpdate({id},{isDeleted:true},{upsert:true, session});
     if(!deleteUser)
     {
      throw new AppError(httpStatus.BAD_REQUEST,'USER Delete Request Failded','');
     }
     await session.commitTransaction();
     await session.endSession();
  
      return deleteStudentAndUserIntoDb;
    }
    catch(error){
      await session.abortTransaction();
      await session.endSession();
    }
}

const updateStudentIntoDb= async(id:string,payload:TStudent)=>{

    const{name,guardian,localGuardian,...remaningStudentData}=payload;

    const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData}
    
    if(name && Object.keys(name))
    {

      for(const [key,value] of Object.entries(name))
      {


        modifiedUpdatedData[`name.${key}`]=value
      }
    }
   
    
    if(guardian && Object.keys(guardian))
    {
      for(const [key,value] of Object.entries(guardian))
      {
        modifiedUpdatedData[`guardian.${key}`]=value
      }
    }
    
    if(localGuardian && Object.keys(localGuardian))
    {
      for(const [key,value] of Object.entries(localGuardian))
      {
        modifiedUpdatedData[`localGuardian.${key}`]=value
      }
    }

    const result=await Student.findOneAndUpdate({id},{...payload},{upsert:true});
    return result;


}

  



export const StudentService={
    findAllStudent,
    findSpecifceStudent,
    deleteStudentAndUserIntoDb,
    updateStudentIntoDb
    
}