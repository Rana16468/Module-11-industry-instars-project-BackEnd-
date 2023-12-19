import httpStatus from "http-status";
import AppError from "../../AppError/AppError";
import { USER } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import  jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';

const  LoginUserService=async(payload:TLoginUser)=>{


    const isUserExist=await USER.isUserExistByCustomId(payload.id);
    if(!isUserExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'This User is Not Founded','')
    }
      // checking if the user alredy deleted 
      const isDeleted=isUserExist.isDeleted
      if(isDeleted)
      {
        throw new AppError(httpStatus.NOT_FOUND,'This User Already Deleted','')
      }
        // checked if the user is blocked 
       const userStatus=isUserExist.status;
      if(userStatus==='Blocked')
      {
        throw new AppError(httpStatus.NOT_FOUND,'This User Already Blocked','')
      }
      if(!await USER.isPasswordMatched(payload?.password, isUserExist.password))
      {
        throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
      }

         // create token send to the client
 // secret generatot =require('crypto').randomBytes(32).toString('hex')
    const jwtPayload={
        userId:isUserExist.id,
        role:isUserExist.role

    }
    const accessToken=jwt.sign(jwtPayload, config.jwt_token_secret as string, { expiresIn:"10d" });
    const refreshToken=jwt.sign(jwtPayload,config.jwt_refresh_secret as string,{expiresIn:'365d'});

    const result=
    {
        accessToken,
        needsPasswordChange:isUserExist.needPasswordChange,
        refreshToken
    }

    return result


}

const changePassword=async(user:JwtPayload,payload:{
    oldPassword:string;
    newPassword:string;
})=>{


    // checking id the user is exist 

  const isUserExist=await USER.isUserExistByCustomId(user.userId)
    
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

  // checking if the passoword is the corred
 
  if(!await USER.isPasswordMatched(payload.oldPassword,isUserExist.password))
  {
      throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
  }
  // hash new Password 


const newHashedPassword=await bcrypt.hash(payload.newPassword,Number(config.bcrypt_salt_rounds));
await USER.findOneAndUpdate({id:user.userId,role:user.role},{
    password:newHashedPassword,
    eedsPasswordChange:false,
    passwordChangedAt: new Date() 

});


    return null


}

const refreshToken=async(token:string)=>{



      //checked if the token is valide

      const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
      const {userId,iat}=decoded;
  
      // user authorigation ---->
      // checking id the user is exist 
  
  const isUserExist=await USER.isUserExistByCustomId(userId)
  
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
  
  const jwtPayload={
      userId:isUserExist.id,
      role:isUserExist.role
  
  }
  
  // secret generatot =require('crypto').randomBytes(32).toString('hex')
  const accessToken=jwt.sign(jwtPayload, config.jwt_token_secret as string, { expiresIn: '10d' });
  
  return {
      accessToken
  }




}

export const AuthService={
    LoginUserService,
    changePassword,
    refreshToken
}