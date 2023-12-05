import { TStudent } from './../student/student.interface';
import config from "../../config";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface"
import { USER } from "./user.model";
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateFaultyId, generateUserId } from './user.utilts';
import mongoose from 'mongoose';
import AppError from '../../AppError/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';




const createFacultyIntoDb=async(password:string,payload:TFaculty)=>{

   

    const userData:Partial<TUser>={};
    userData.password=password || (config.default_password);
    userData.role='faculty';
    const session=await mongoose.startSession();
    try{
        session.startTransaction();

        // generateFacultyId
        userData.id=await generateFaultyId();
        const newFacultyUser=await USER.create([userData],{session});
        if(!newFacultyUser.length)
        {
            throw new AppError(httpStatus.BAD_REQUEST,'Faculty User createing Fuction Failed','');
        }
        payload.user=newFacultyUser[0]._id;
        payload.id=newFacultyUser[0].id;
        const newFaculty=await Faculty.create([payload],{session});
        if(!newFaculty.length){
            throw new AppError(httpStatus.BAD_REQUEST,'Faculty Careting Function Failed','');
        }
        await session.commitTransaction();
        await session.endSession();
        return newFaculty;



    }
    catch(err)
    {
        await session.abortTransaction();
        await session.endSession();
    }



}

const createStudent= async(password:string,payload:TStudent)=>{

    

   /// const admissionSemester=await AcademicSemester.findById(payload.admissionSemester);
 
     const admissionSemester=await AcademicSemester.isFindByID(payload.admissionSemester)
     

    const userData:Partial<TUser>={};
    userData.password=password || (config.default_password);
    userData.role='user';

    //generate User ID 

    // serat in Rollback and transaction
    const session= await mongoose.startSession();
   try{

    session.startTransaction();
    userData.id= await generateUserId(admissionSemester);



    
    const newUser=await USER.create([userData],{session})
    if(!newUser.length)
    {
      
       throw new AppError(httpStatus.BAD_REQUEST,'User Not Create','');


    }
    payload.user=newUser[0]._id;
    payload.id=newUser[0].id;

    // create Student 
    const newStudent=await Student.create([payload],{session});
    if(!newStudent.length)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'Student NOT Create Successfully','');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;


   }
   catch(error)
   {
    await session.abortTransaction();
    await session.endSession();
    

   }




}

export const UserService={
    createStudent,
    createFacultyIntoDb
}