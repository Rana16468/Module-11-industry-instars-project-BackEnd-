import httpStatus from "http-status";
import AppError from "../../AppError/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { OfferedCourse } from "../OfferedCourse/offeredCourse.model";



const createSemesterRegistrationIntoDb=async(payload:TSemesterRegistration)=>{

 // check if there any register semester that is alredy upcomming or ongoing 

 const  isThereAnyUpcommingAndOngoingSemester=await SemesterRegistration.findOne({
    $or:[
        {status:'UPCOMMING'},
        {status:'ONGOING'}
    ]
 });
 if(isThereAnyUpcommingAndOngoingSemester)
 {
    throw new AppError(httpStatus.BAD_REQUEST,`There is a alredy exists ${isThereAnyUpcommingAndOngoingSemester.status}`,'');
 }
 // acdemic semster exists 

 const academicSemester=payload.academicSemester;

 const isAcademicSemesterExist=await AcademicSemester.findById(academicSemester);
 if(!isAcademicSemesterExist)
 {
    throw new AppError(httpStatus.BAD_REQUEST,'Academic Semester is Not Exits','');
 }

 // alredy this semester registartion exists ot not 

 const isSemesterRegistrationExist=await SemesterRegistration.findOne({academicSemester});
 if(isSemesterRegistrationExist)
 {
    throw new AppError(httpStatus.BAD_REQUEST,'This Academic Semester is Already Exits','');
 }

   const buildInSemesterRegistration= new SemesterRegistration(payload);
   const result=await buildInSemesterRegistration.save();
   return result;
}


const getAllSemesterRegistrationFromDb=async(query:Record<string,unknown>)=>{

    const semesterRegistrationQuery= new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query).filter().sort().pagination();
    const result=await semesterRegistrationQuery.modelQuery;
    return result;
    
}
const getSingleSemesterRegistrationFromDb=async(id:string)=>{

    const result=await SemesterRegistration.findById(id);
    return result;
} 

const updateSemesterRegistrationFromDb=async(id:string,payload:Partial<TSemesterRegistration>)=>{




    const isSemesterRegistrationExists=await SemesterRegistration.findById(id);
    if(!isSemesterRegistrationExists)
    {
        throw new AppError(httpStatus.NOT_FOUND,'This Academic Semester is Not Exits','');
    }
      // if the request semester registration is ended,we will not update Any thing 
      const requestSemesterRegistrationStatus=payload?.status;
      const currentSemesterRegistrationStatus=isSemesterRegistrationExists.status;
      if(currentSemesterRegistrationStatus==='ENDED')
      {
        throw new AppError(httpStatus.BAD_REQUEST,`This Semester Already  ${currentSemesterRegistrationStatus}`,'');
      }
       // UPCOMMING ----> ONGOING----->ENDED
       if(currentSemesterRegistrationStatus==='UPCOMMING' && requestSemesterRegistrationStatus==='ENDED')
       {
        throw new AppError(httpStatus.BAD_REQUEST,`you can't direclty change status from ${currentSemesterRegistrationStatus} to ${requestSemesterRegistrationStatus}`,'');
       }
        // ONGOING--->UPCOMMING ---->
       if(currentSemesterRegistrationStatus==='ONGOING' && requestSemesterRegistrationStatus==='UPCOMMING')
       {
        throw new AppError(httpStatus.BAD_REQUEST,`you can't direclty change status from ${currentSemesterRegistrationStatus} to ${requestSemesterRegistrationStatus}`,'');
       }

       const result=await SemesterRegistration.findByIdAndUpdate(id,payload,{
        new:true,
        runValidators:true
       });
       return result


}

const deleteSemesterRegistrationFromDB=async(id:string)=>{

  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/
   // checking if the semester registration is exist
   const isSemesterRegistrationExists=await SemesterRegistration.findById(id);
   if(!isSemesterRegistrationExists)
   {
    throw new AppError(
        httpStatus.NOT_FOUND,
        'This registered semester is not found !','',
      );
   }
    // checking if the status is still "UPCOMING"
    const semesterRegistrationStatus =  isSemesterRegistrationExists?.status;
    if (semesterRegistrationStatus  !== 'UPCOMMING' as string) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `You can not update as the registered semester is ${semesterRegistrationStatus}`,'',
        );
      }
      // start sesiion
      const session= await mongoose.startSession();
      try{
        session.startTransaction();
        // if same id exist other document this delete Many function at a time delete all data in the database 
        const deletedOfferedCourse = await OfferedCourse.deleteMany({semesterRegistration: id,},{session});
        if (!deletedOfferedCourse) 
        {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete semester registration !','' );
        }

        const deletedSemisterRegistration =await SemesterRegistration.findByIdAndDelete(id,{ session,new: true, });
  
      if (!deletedSemisterRegistration) {
        throw new AppError( httpStatus.BAD_REQUEST,'Failed to delete semester registration !','' );
      }

      await session.commitTransaction();
      await session.endSession();

      return deletedSemisterRegistration


      }
      catch(err){

        await session.abortTransaction();
        await session.endSession();
      }



}

export const SemesterRegistrationService={
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationFromDb,
    deleteSemesterRegistrationFromDB
,
}