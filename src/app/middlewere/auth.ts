import { NextFunction, Request, Response } from "express";
import catchAsyc from "../utility/catchAsync";
import  jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../AppError/AppError";
import httpStatus from "http-status";
import config from "../config";
import { USER } from "../models/user/user.model";
import { TUserRole } from "../models/user/user.interface";

const auth=(...requiredRole:TUserRole[])=>{

    return catchAsyc(async(req:Request,res:Response,next:NextFunction)=>{


        const token=req.headers.authorization;
        if(!token)
        {
            throw  new AppError(httpStatus.UNAUTHORIZED,'You are not Authorized','');
        }
        let decoded;
        try{
          decoded =   jwt.verify(token, config.jwt_token_secret as string) as JwtPayload;
        }
        catch(error){
          throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized','');
        }
        
        const {userId,iat,role}=decoded ;
       
          // user authorigation ---->
        // checking id the user is exist 
        const isUserExist=await USER.isUserExistByCustomId(userId);
    
        if(!isUserExist)
        {
            throw new AppError(httpStatus.NOT_FOUND,'This User is Not Founded','')
        }
          // checking if the user alredy deleted 
         const isDeleted=isUserExist.isDeleted
        if(isDeleted)
        {
             throw new AppError(httpStatus.FORBIDDEN,'This User is Deleted','')
        }
        // checked if the user is blocked 
             const userStatus=isUserExist.status;
          if(userStatus==='Blocked')
                {
           throw new AppError(httpStatus.FORBIDDEN,'This User is Blocked','')
           }
           if(isUserExist.passwordChangedAt && await USER.isJWTIssuesBeforePasswordChange(isUserExist.passwordChangedAt,iat as number))
           {
             throw new AppError(httpStatus.FORBIDDEN,'UnExpected Token','')
           }
           if(requiredRole && !requiredRole.includes(role))
           {
            throw new AppError(httpStatus.UNAUTHORIZED,'Yout Role Not Exist','') 
           }


           req.user=decoded as JwtPayload
      
        next();
    })


   
}
export default auth;