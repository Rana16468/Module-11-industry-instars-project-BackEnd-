import { RequestHandler } from "express";
import catchAsyc from "../../utility/catchAsync";
import { EnrolledCourseService } from "./enrolledCourse.services";
import httpStatus from "http-status";
import userRespones from "../../utility/userRespones";


const createEnrolledCourse:RequestHandler=catchAsyc(async(req,res)=>{


    const userId=req?.user?.userId
    const result=await EnrolledCourseService.createEnrolledCourseIntoDb(userId,req.body);
    userRespones(res,{success:true,statusCode:httpStatus.CREATED,message:'Successfully Created Offered Course',data:result
      })
    
    });

    const  updateEnrollmentCourseMarks:RequestHandler=catchAsyc(async(req,res)=>{
        const {userId}=req.user;
    const result=await EnrolledCourseService.updateEnrollmentCourseMarksIntoDb(userId,req.body);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Successfully UpdateOffered Course',data:result
      })
    
    
    
    
    
    });
    
    
    
    
    export const EnrolledCourseController={
        createEnrolledCourse,
        updateEnrollmentCourseMarks
       
    }