import httpStatus from "http-status";
import AppError from "../../AppError/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/acdemicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utilits";





const createOfferedCourseIntoDb=async(payload:TOfferedCourse)=>{

    const {semesterRegistration,academicFaculty,academicDepartment,course,faculty,section,startTime,endTime,days}=payload


    // if the semester registrationit exists 
     const isSemesterRegistrationExists=await SemesterRegistration.findById(semesterRegistration);
     if(!isSemesterRegistrationExists)
    {
    throw new AppError(httpStatus.NOT_FOUND,'Semester Registration Id Not Founded','');
    }
    const isAcademicFacultyExist=await AcademicFaculty.findById(academicFaculty);
    if(!isAcademicFacultyExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Faculty Id Not Founded','');
    }
    const isAcademicDepartmentExist=await AcademicDepartment.findById(academicDepartment);
    if(!isAcademicDepartmentExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Department Id Not Founded','');
    }

    const isCourseExist=await Course.findById(course);
    if(!isCourseExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Course Id Not Founded','');
    }

    const isFacultyExist=await Faculty.findById(faculty);
    if(!isFacultyExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Faculty Id Not Founded',''); 
    }

   //checked if the depertment is belong to the faculty 
   const isDepertmentBelogToFaculty=await AcademicDepartment.findOne({

    academicFaculty,
    _id:academicDepartment
});
if(!isDepertmentBelogToFaculty)
{
    throw new AppError(httpStatus.NOT_FOUND,`this ${isAcademicFacultyExist.name} is not belog to this ${isAcademicDepartmentExist.name}`,'');
}

 // checked of the same course same section in same  registered semester exits 
 const isSemesterOfferedCourseExitsWithSemesterRegisterWithSameSection=await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
 });

 if(isSemesterOfferedCourseExitsWithSemesterRegisterWithSameSection)
 {
    throw new AppError(httpStatus.NOT_FOUND,`Offered Course with same section alredy exist`,'');
 }
  // get the schedules of the faculty 

  const newSchedules={
    startTime,
    endTime,
    days
    
  }
  const assignedSchedules=await OfferedCourse.find({
    semesterRegistration,
     faculty,
     days:{$in: days}
 }).select('days startTime endTime');


 if(hasTimeConflict(assignedSchedules,newSchedules))
{
    throw new AppError(httpStatus.CONFLICT,'The Faculy Time is Not Avaliable','');
}



    payload.academicSemester=isSemesterRegistrationExists.academicSemester;

    const buildInOfferedCourse=new OfferedCourse(payload);
    const result=await buildInOfferedCourse.save();
    return result;
}

const updateOfferedCourseFromDb=async(id:string,payload:Pick<TOfferedCourse,'faculty' | 'startTime' | 'endTime' | 'days'>)=>
{

    const {faculty, startTime,endTime,days}=payload;
    const isOfferedCourseExist=await OfferedCourse.findById(id);
    if(!isOfferedCourseExist)
   {
    throw new AppError(httpStatus.NOT_FOUND,'Offered Course is Not Exist','');
   }
   const isOfferedFacultyExist=await Faculty.findById(faculty);
   if(!isOfferedFacultyExist)
   {
    throw new AppError(httpStatus.NOT_FOUND,'Offered Course Faculty is Not Exist','');
   }
   const semesterRegistration=isOfferedCourseExist?.semesterRegistration;
   const semesterRegistrationStatus=await SemesterRegistration.findById(semesterRegistration);
   // only update buy the UPCOMMING Semester Registration Informations
   if(semesterRegistrationStatus?.status!=='UPCOMMING')
   {
    throw new AppError(httpStatus.BAD_REQUEST,`you can not update this offered course as it is ${semesterRegistrationStatus?.status}`,'');
   } 

   const newSchedules={
    startTime,endTime,days
 }


const assignedSchedules=await OfferedCourse.find({
   semesterRegistration,
    faculty,
    days:{$in: days}
}).select('days startTime endTime');

if(hasTimeConflict(assignedSchedules, newSchedules))
{
    throw new AppError(httpStatus.CONFLICT,'The Faculy Time is Not Avaliable','');
}
const result=await OfferedCourse.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
return result;

}

export const OfferedCourseServerice={
    createOfferedCourseIntoDb,
    updateOfferedCourseFromDb
}