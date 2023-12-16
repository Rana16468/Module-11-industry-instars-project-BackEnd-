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

const  updateOfferedCourse:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await OfferedCourseServerice.updateOfferedCourseFromDb(id,data);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Offered Course Update Successfuly',data:result})
})
export const OfferedCourseController={
    createOfferedCourse,
    updateOfferedCourse
}