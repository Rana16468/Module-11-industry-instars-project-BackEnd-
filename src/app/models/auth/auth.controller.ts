import httpStatus from "http-status";
import userRespones from "../../utility/userRespones";
import { RequestHandler } from "express";
import catchAsyc from "../../utility/catchAsync";
import { AuthService } from "./auth.services";
import config from "../../config";



const loginUser:RequestHandler=catchAsyc(async(req,res)=>{


    const data=req.body;
    const result=await AuthService.LoginUserService(data);
    const {refreshToken,accessToken,needsPasswordChange}=result;
    res.cookie('refreshToken',refreshToken,{secure:config.NODE_ENV==='production',httpOnly:true});

  userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Login Successfully',data:{
    accessToken,
    needsPasswordChange
  }})
});


const changePassword:RequestHandler=catchAsyc(async(req,res)=>{


    const passwordData=req.body;
    
    const result=await AuthService.changePassword(req.user,passwordData);
    userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Passoed is Updated Successfully Successfully',data:result})
});


const refreshToken:RequestHandler=catchAsyc(async(req,res)=>{
    const { refreshToken}=req.cookies;
     const result=await AuthService.refreshToken(refreshToken);
     userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Access token is Retrived Successfully',data:result})
 
 });

 // ph-8 
 const  forgetPassword:RequestHandler=catchAsyc(async(req,res)=>{

  const userId=req.body.id;
  const result=await AuthService.forgetPassword(userId);
  userRespones(res,{success:true,statusCode:httpStatus.OK,message:"Reset Link Generated  Successfully",data:result})

 });
 const resetPassword:RequestHandler=catchAsyc(async(req,res)=>{
  const token=req?.headers?.authorization as string;
   const result=await AuthService.resetPassword(req.body,token);
   userRespones(res,{success:true,statusCode:httpStatus.OK,message:'Reset Password  Successfully',data:result})
});

export const AuthController={
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword

}
