import { Request, Response } from "express";
import catchAsyc from "../../utility/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";



const createAcademicFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const data=req.body;
    const result=await AcademicFacultyService.createAcademicFacultyIntoDb(data);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly Carete Academic Faculty',data:result});


});

const getAllAcademicFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const result=await AcademicFacultyService.getAllAcdemicFaculyIntoDb();
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Finded All Acdemic Faculy',data:result})
});

const getSingleAcademicFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const result=await AcademicFacultyService.getSingleAcademicFacultyIntoDb(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfuly get Single Academic Faculty',data:result});
});

const updateAcademicFaculty=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await AcademicFacultyService.updateAcademicFacultyIntoDb(id,data);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Update Successfully Academic Faculty',data:result});
    
})

export const AcademicFacultyController={
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}