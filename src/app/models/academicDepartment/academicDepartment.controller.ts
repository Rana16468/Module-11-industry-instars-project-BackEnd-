import { Request, Response } from "express";
import catchAsyc from "../../utility/catchAsync";
import { AcademicDepartmentService } from "./academicDepartment.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";


const createAcademicDepartment=catchAsyc(async(req:Request,res:Response)=>{

    const data=req.body;
    const result=await AcademicDepartmentService.createAcademicDepartmentIntoDb(data);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Create Academic Department',data:result});

});

const getAllAcademicDepartment=catchAsyc(async(req:Request,res:Response)=>{

    const result=await AcademicDepartmentService.getAllAcademicDepartmentIntoDb();
    
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfull Find All Academic Department',data:result});


});

const getSingleAcademicDepartment=catchAsyc(async(req:Request,res:Response)=>{

    const {id}=req.params;
    const result=await AcademicDepartmentService.getSingleAcademicDepartmentIntoDb(id);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfull Find  Single Academic Department',data:result});
}); 

const updateAcademicDepartent=catchAsyc(async(req:Request,res:Response)=>{


    const {id}=req.params;
    const data=req.body;
    const result=await AcademicDepartmentService.updateAcademicDepartmentIntoDb(id,data);
    userRespones(res,{statusCode:httpStatus.OK,success:true,message:'Successfull Updated Academic Department',data:result});
})


export const AcademicDepartmentController={
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartent
}