import httpStatus from "http-status";
import AppError from "../../AppError/AppError";
import { OfferedCourse } from "../OfferedCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { Student } from "../student/student.model";
import { Course } from "../course/course.model";
import EnrolledCourse from "./enrolledCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import mongoose from "mongoose";
import { calculateGradeEndPoints } from "./enrolledCourse.Utilites";
import { Faculty } from "../faculty/faculty.model";


const createEnrolledCourseIntoDb=async(userId:string,payload:TEnrolledCourse)=>{
    /*
    1. checked if the offfered course is exist
    2. checled if the if the student is alredy enrolled
    3. create a an enrollled course
    4. checked if the max creadit exexted
    5 . create enrollment course 
    
    
    */
    
    const {offeredCourse}=payload;
    const isExistOfferedCourse=await OfferedCourse.findById(offeredCourse);
    
    if(!isExistOfferedCourse)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Offered Course Not Founded','');
    }
    
    //student Id needed 
    const student=await Student.findOne({id:userId},{_id:1});
    
    if(!student)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Student Id Not Founded','');
    }
    
    // isCourse exists
    const isExistsCourse=await Course.findById(isExistOfferedCourse.course).select('credits');
    
    if(!isExistsCourse)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Course Id Not Founded','');
    }
    // checked student capacity
    if(isExistOfferedCourse.maxCapacity<=0)
    {
        throw new AppError(httpStatus.BAD_GATEWAY,'Room is Fullled','');
    }
    
    const isStudentAlreadyEnrolled=await EnrolledCourse.findOne({
    
        semesterRegistration:isExistOfferedCourse?.semesterRegistration,
        offeredCourse,
        student:student?._id
      
    });
    
    
    if(isStudentAlreadyEnrolled)
    {
        throw new AppError(httpStatus.CONFLICT,'Student Already Enrolled','');
    }
    
    //check total credit execeds maxcredits
    
    const semesterRegistrations=await SemesterRegistration.findById(isExistOfferedCourse?.semesterRegistration).select('maxCredite');
    
    
    if(!semesterRegistrations)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'Semester Registarion Maximun Creadit Not Exist','');
    }
    
    // tottal enroll credite + new Entroll course credits
    const enroollCourses=await EnrolledCourse.aggregate([
        //statge 1
        
        {$match:{
            semesterRegistration:isExistOfferedCourse?.semesterRegistration,
            student:student?._id,
    
        }, 
    },
    // statge 2
    {
        $lookup:{
            from:'courses', // database name
            localField:'course',
            foreignField:'_id',
            as:'EnrolledCourseData'
        }
    },
    // statge 3
    {
        $unwind:'$EnrolledCourseData'
    },
    // statage 4
    {
        $group:{_id:null,totalEnrollCredits:{$sum:'$EnrolledCourseData.credits'}}
    },
    // statage 5
    {
        $project:{
            _id:0,
            totalEnrollCredits:1
    
        }
    }
    ]);
    
    
    const totalCredits=enroollCourses.length>0? enroollCourses[0].totalEnrollCredits:'0'
    
    if(totalCredits && totalCredits +  isExistsCourse?.credits >semesterRegistrations?.maxCredite)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'You have exected maximun number of credits','');
    }
    
    
    // transaction and rollback
    
    
    
    const session=await  mongoose.startSession();
    try{
        session.startTransaction();
    
        const result=await EnrolledCourse.create([
            {
    
                semesterRegistration:isExistOfferedCourse?.semesterRegistration,
                academicSemester:isExistOfferedCourse?.academicSemester,
                academicFaculty:isExistOfferedCourse?.academicFaculty,
                academicDepartment:isExistOfferedCourse?.academicDepartment,
                course:isExistOfferedCourse?.course,
                offeredCourse:offeredCourse,
                student:student?._id,
                isEnrolled:true,
                faculty:isExistOfferedCourse.faculty
            
            
            }
        ],{session});
        
    
        if(!result.length)
        {
            throw new AppError(httpStatus.NOT_FOUND,'Ernroll Session key Fields',''); 
        }
    
        const maxCapacity=isExistOfferedCourse.maxCapacity
        const updateCapacity=await OfferedCourse.findByIdAndUpdate(offeredCourse,{
    
        maxCapacity:maxCapacity-1
    },{
        upsert:true,
        runValidators:true,
        session
    });
    if(!updateCapacity)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Update Capacity Session key Fields',''); 
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
    
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any)
    {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error?.message)
    }
    
    }

    // update enrollment coure into db
const updateEnrollmentCourseMarksIntoDb=async(facultyId:string,payload:Partial<TEnrolledCourse>)=>{

    const {semesterRegistration,offeredCourse,student,courseMarks}=payload;

   
    
    
    const isExistOfferedCourse=await OfferedCourse.findById(offeredCourse);

    if(!isExistOfferedCourse)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Offered Course Not Founded','');
    }
    const IsExistsSemesterRegistrations=await SemesterRegistration.findById(semesterRegistration);
   if(!IsExistsSemesterRegistrations)
   {
    throw new AppError(httpStatus.BAD_REQUEST,'Semester Registarion Maximun Creadit Not Exist','');
   }

    const IsExistStudent=await Student.findById(student);
   if(!IsExistStudent)
   {
    throw new AppError(httpStatus.NOT_FOUND,'Student Id Not Founded','');
    }

    // faculty Id 

    const isExistFacultyId=await Faculty.findOne({id:facultyId},{ _id: 1 });
    if(!isExistFacultyId)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Faculty Id Not Founded','');
    }

   
    // is course belong to faculty
    //semesterRegistration

    
    const isCourseBelongToFaculty=await EnrolledCourse?.findOne({
        
        semesterRegistration,
    offeredCourse,
    student,
    faculty: isExistFacultyId._id,

       
        
    });
   
    
    

    if(!isCourseBelongToFaculty)
    {
        throw new AppError(httpStatus.FORBIDDEN,'CourseBelongToFaculty Id Not Founded','');
    }
    const mofiedData:Record<string,unknown>={...courseMarks};
   
    // course marks final terms
    if(courseMarks?.finalTerm)
    {
        
        const {classTest1,classTest2, midTerm,finalTerm}=isCourseBelongToFaculty.courseMarks;
       
        const totalMarks=Math.ceil(classTest1)+ Math.ceil(classTest2) + Math.ceil(midTerm) + Math.ceil(finalTerm);
       const courseResult= calculateGradeEndPoints(totalMarks);
       mofiedData.grade=courseResult.grade;
       mofiedData.gradePoints=courseResult.gradePoint;
       mofiedData.isCompleted=true

    
    }

   

    if(courseMarks && Object.keys(courseMarks).length)
    {
        for(const [key,value] of Object.entries(courseMarks))
        {
            mofiedData[`courseMarks.${key}`]=value;
        }
    }

    const result=await EnrolledCourse.findByIdAndUpdate(isCourseBelongToFaculty._id,mofiedData,{
        new:true
        
    });
    

    return result



}


    export const EnrolledCourseService={
        createEnrolledCourseIntoDb,
        updateEnrollmentCourseMarksIntoDb
       
    }
    