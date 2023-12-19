import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { AdminService } from "./admin.services";

import httpStatus from "http-status";
import userRespones from "../../utility/userRespones";



const getAllAdmin:RequestHandler=catchAsync(async(req,res)=>{
  
    const result=await AdminService.getAllAdminsFromDB(req.params) ;
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'get All Admin Successfully',data:result});

});
const getSingleAdmin:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await  AdminService.getSingleAdminFromDB(id);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'get Single Admin Successfully',data:result});
});
export const AdminController={
    getSingleAdmin,
    getAllAdmin
}