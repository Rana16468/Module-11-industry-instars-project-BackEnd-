
import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { USER } from "../user/user.model";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";

const getAllFacultyIntoDb=async()=>{


    const result=await Faculty.find();
    return result;
}

const getSingleFacultyIntoDb=async(id:string)=>{

    const result=await Faculty.findOne({id});
    return result;
}

// delete Faculty user and Faculty information in my database
const deleteFacultyIntoDb=async(id:string)=>{

  const session=await mongoose.startSession();
  try{

    session.startTransaction();
    const  userFaculty= await USER.updateOne({id},{isDeleted:true},{upsert:true,session});
    if(!userFaculty)
    {
      throw new AppError(httpStatus.BAD_REQUEST,'Faculty User Session is Failed','');
    }
    const facultyInfo=await Faculty.updateOne({id},{isDeleted:true},{upsert:true,session});
    if(!facultyInfo)
    {
      throw new AppError(httpStatus.BAD_REQUEST,'Faculty Infomation Session is Failed','');
    }
    await session.commitTransaction();
    await session.endSession();
    return facultyInfo

  }
  catch(err)
  {
    await session.abortTransaction();
    await session.endSession();
  }




}

const updateFacultyIntoDb=async(id:string,payload:TFaculty)=>
{


    const{name,guirdian,...remaningStudentData}=payload;
    const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData};
    if(name && Object.keys(name))
    {

      for(const [key,value] of Object.entries(name))
      {


        modifiedUpdatedData[`name.${key}`]=value
      }
    }
   
    
    if(guirdian && Object.keys(guirdian))
    {
      for(const [key,value] of Object.entries(guirdian))
      {
        modifiedUpdatedData[`guardian.${key}`]=value
      }
    }

    //console.log(modifiedUpdatedData);
 

    const result=await Faculty.findOneAndUpdate({id},modifiedUpdatedData,{upsert:true});
    return result
}



export const FacultyService={
 
    getAllFacultyIntoDb,
    getSingleFacultyIntoDb,
    deleteFacultyIntoDb,
    updateFacultyIntoDb
}