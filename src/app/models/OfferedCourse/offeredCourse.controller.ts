import { RequestHandler } from "express";
import catchAsyc from "../../utility/catchAsync";
import { OfferedCourseServerice } from "./offeredCourse.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";



const  createOfferedCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const data=req.body;
    const result=await OfferedCourseServerice.createOfferedCourseIntoDb(data);
    userRespones(res,{success:true,statusCode:httpStatus.CREATED,message:'Offered Course Successfully created',data:result})
});

const  getAllOfferedCourses:RequestHandler=catchAsyc(async(req,res)=>{

    const result=await OfferedCourseServerice.getAllOfferedCoursesFromDB(req.query);

 userRespones(res,{success:true,statusCode:httpStatus.OK,message:'All Offered Course Successfully Rectrive ',data:result})


});

const  updateOfferedCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await OfferedCourseServerice.updateOfferedCourseFromDb(id,data);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Offered Course Update Successfuly',data:result})
});

const getSingleOfferedCourse:RequestHandler=catchAsyc(async(req,res)=>{


    const {id}=req.params;
    const result=await OfferedCourseServerice.getSingleOfferedCourseFromDB(id);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Get Single Offered Course Successfuly',data:result})
});

const  deleteOfferedCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const result=await OfferedCourseServerice.deleteOfferedCourseFromDB(id);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Delete Offered Course Successfuly',data:result})

});
export const OfferedCourseController={
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    deleteOfferedCourse
}