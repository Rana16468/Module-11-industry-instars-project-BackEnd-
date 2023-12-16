import { RequestHandler } from "express";
import catchAsyc from "../../utility/catchAsync";
import { SemesterRegistrationService } from "./semesterRegistration.services";
import userRespones from "../../utility/userRespones";
import httpStatus from "http-status";


const createSemesterRegistration:RequestHandler=catchAsyc(async(req,res)=>{

    const result=await SemesterRegistrationService.createSemesterRegistrationIntoDb(req.body);
    userRespones(res,{success:true,statusCode:httpStatus.CREATED,message:'Semester Registration Successfully Created',data:result})

});

const getAllSemesterRegistration:RequestHandler=catchAsyc(async(req,res)=>{

    const result=await SemesterRegistrationService.getAllSemesterRegistrationFromDb(req.params);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Semester Registration Reactive All Successfully',data:result})

});

const getSingleSemesterRegistration:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;

    const result=await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(id);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Semester Registration Reactive Single  Successfully',data:result})

});

const  updateSemesterRegistration:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await SemesterRegistrationService.updateSemesterRegistrationFromDb(id,data);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Semester Registration Update  Successfully',data:result})


});

const deleteSemesterRegistration:RequestHandler=catchAsyc(async(req,res)=>{

    const {id}=req.params;
    const result=await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Semester Registration Delete  Successfully',data:result})

});

export const SemesterRegistrationController={
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration
}