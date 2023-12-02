import { Request, Response } from "express";
import catchAsyc from "../../utility/catchAsync";
import { AcademicSemesterService } from "./academicSemester.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";


const createAcademicSemester=catchAsyc(async(req:Request,res:Response)=>{

    

    const result=await AcademicSemesterService.createAcademicSemesterIntoDb(req.body);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Academic Semester Create Successfully',data:result});
});

const getAllAcademicSemester=catchAsyc(async(req:Request,res:Response)=>{

    const result=await AcademicSemesterService.getAllAcademicSemesterIntoDb();
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find All Academic Semester',data:result});

});

const getSingleAcademicSemester=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const result=await AcademicSemesterService.getSingleAcademicSemesterIntoDb(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find Single Academic Semester',data:result});
});

const updateAcademicSemester=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const data=req.body;

    const result=await AcademicSemesterService.updateAcademicSemesterIntoDb(id,data);
    
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Updated Academic Semester',data:result});
});


export const AcademicSemesterController={
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}