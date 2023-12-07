import { RequestHandler } from "express";
import catchAsyc from "../../utility/catchAsync";
import { CourseServices } from "./course.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";





const createCourse:RequestHandler=catchAsyc(async(req,res)=>{


    const data=req.body;
    const result=await CourseServices.createCourseIntoDb(data);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Successfuly Create Course',data:result});

});

const getAllCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const result=await CourseServices.getAllCourseIntoDb();
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Successfuly Find All Courses',data:result});
});

const getSingleCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const {courseId}=req.params;
    const result=await CourseServices.getSingleCourseIntoDb(courseId);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Successfuly Find Single  Courses',data:result});
});

const removeCourse:RequestHandler=catchAsyc(async(req,res)=>{


    const {courseId}=req.params;
    const result=await CourseServices.deleteCourseIntoDb(courseId);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Remove Courses Successfully',data:result});

});

const updateCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const{courseId}=req.params;
    const data=req.body;
    const result=await CourseServices.updateCourseFormDb(courseId,data);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Update Courses Successfully',data:result});


});

const createCourseFaculty:RequestHandler=catchAsyc(async(req,res)=>{
    const {courseId}=req.params;
    const {facultys}=req.body;
   

    const result=await CourseServices.createCourseFacultyIntoDb(courseId,facultys);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Create Course Faculty Successfully',data:result});
    



});

const removeCourseFaculty:RequestHandler=catchAsyc(async(req,res)=>{
    const {courseId}=req.params;
    const {facultys}=req.body;
    const result=await CourseServices.removeCourseFacultyIntoDb(courseId,facultys);
    userRespones(res,{statusCode:httpStatus.OK, success:true,message:'Remove Course Faculty Successfully',data:result});
   


});

export const CourseController={
    createCourse,
    getAllCourse,
    getSingleCourse,
    removeCourse,
    updateCourse,
    createCourseFaculty,
    removeCourseFaculty
}