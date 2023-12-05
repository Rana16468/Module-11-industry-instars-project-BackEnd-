import { Request, Response } from "express";
import catchAsyc from "../../utility/catchAsync";
import { FacultyService } from "./faculty.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";




const getAllFaculty=catchAsyc(async(req:Request,res:Response)=>{

    
    const result=await FacultyService.getAllFacultyIntoDb();
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find the All Faculty',data:result})

});

const getSingleFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const result=await FacultyService.getSingleFacultyIntoDb(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find the Single Faculty',data:result})
});

const updateFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const {facultyId}=req.params;
    const {faculty}=req.body;

    const result=await FacultyService.updateFacultyIntoDb(facultyId,faculty);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Update Faculty User Successfully',data:result})

});

export const FacultyController={
    getAllFaculty,
    getSingleFaculty,
    updateFaculty
}