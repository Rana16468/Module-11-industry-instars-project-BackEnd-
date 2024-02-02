import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";



export type TUser={
    id:string;
    role:'user' | 'admin' | 'faculty' |'superAdmin';
    password:string;
    email:string,
    needPasswordChange:boolean;
    passwordChangedAt?:Date
    status:'is-Progress' | 'Blocked',
    isDeleted:boolean

    
}

export interface UserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExistByCustomId(id:string):Promise<TUser>,
    // eslint-disable-next-line no-unused-vars
    isPasswordMatched(userSendingPassword:string,existingPassword:string):Promise<boolean>
    // eslint-disable-next-line no-unused-vars
    isJWTIssuesBeforePasswordChange(passwordChangeTimestamp:Date,jwtIssuesTime:number):Promise<boolean>
  
  }

  export type TUserRole=keyof typeof USER_ROLE;

