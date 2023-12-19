import { Types } from "mongoose";

export type TAdminUserName={
    firstName:string;
    middleName?:string;
    lastName:string;
}
export type TGender='Male' | 'Female'
export type TBloodGroup ='A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TAdmin={
    id:string;
    user:Types.ObjectId;
    name:TAdminUserName;
    designation:string;
    gmail:string;
    gender:TGender
    bloogGroup?: TBloodGroup;
    dateOfBirth:string;
    contractNo:string;
    emergencyContractNo:string;
    presentAddress:string;
    permanentAddress:string;
    profileImg:string;
    isDeleted:boolean;
}