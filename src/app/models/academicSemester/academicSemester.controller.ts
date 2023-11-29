import { Request, Response } from "express";
import catchAsyc from "../../utility/catchAsync";
import { AcademicSemesterService } from "./academicSemester.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";


const createAcademicSemester=catchAsyc(async(req:Request,res:Response)=>{

    

    const result=await AcademicSemesterService.createAcademicSemesterIntoDb(req.body);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Academic Semester Create Successfully',data:result});
});


export const AcademicSemesterController={
    createAcademicSemester
}