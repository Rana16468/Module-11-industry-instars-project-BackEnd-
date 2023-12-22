import { TStudent } from './../student/student.interface';
import config from "../../config";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface"
import { USER } from "./user.model";
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateAdminId, generateFaultyId, generateUserId } from './user.utilts';
import mongoose from 'mongoose';
import AppError from '../../AppError/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';




const createFacultyIntoDb=async(password:string,payload:TFaculty)=>{

  
    const userData:Partial<TUser>={};
    userData.password=password || (config.default_password);
    userData.role='faculty';
    userData.email=payload?.email
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStudent= async(password:string,payload:TStudent,file:any)=>{

    

   /// const admissionSemester=await AcademicSemester.findById(payload.admissionSemester);
 
     const admissionSemester=await AcademicSemester.isFindByID(payload.admissionSemester)
     

    const userData:Partial<TUser>={};
    // set user password 
    userData.password=password || (config.default_password);
        //set Student Role
    userData.role='user';
    userData.email=payload?.email;
     //set munality auto generated id
    userData.id= await generateUserId(admissionSemester);


    //send image to Cloudinary
    const imageName=`${userData.id}${payload.name.firstName.trim()}`;
    const path=file?.path;
    const session= await mongoose.startSession();
   try{

    session.startTransaction();
    const  imageUrl= await sendImageToCloudinary(imageName,path);
    
    const newUser=await USER.create([userData],{session})
    if(!newUser.length)
    {
      
       throw new AppError(httpStatus.BAD_REQUEST,'User Not Create','');
    }
    payload.user=newUser[0]._id;
    payload.id=newUser[0].id;
    payload.profileImg=imageUrl?.secure_url;

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


const createAdminIntoDB = async (password: string, payload: TAdmin) => {

  

    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password= password  || config.default_password as string;
    userData.role = 'admin';
    userData.email=payload?.email;
      //set  generated id
    userData.id = await generateAdminId();


    const session=await mongoose.startSession();
  
    try{
      session.startTransaction();
  
      userData.id=await generateAdminId();
      const newAdmin=await USER.create([userData],{session});
     
      if(!newAdmin.length){
        throw new AppError(httpStatus.BAD_REQUEST,'Admin User Create Session Failed','');
      }
      payload.id=newAdmin[0].id;
      payload.user=newAdmin[0]._id;
  
      const adminInfo=await Admin.create([payload],{session});
      
      if(!adminInfo.length){
        throw new AppError(httpStatus.BAD_REQUEST,'Admin Information Create Session Failed','');
      }
      await session.commitTransaction();
      await session.endSession();
      return adminInfo
  
    }
    catch(err)
    {
      await session.abortTransaction();
      await session.endSession();
    }
      
    
    
  };

  // ph-8
  // getme serviece function 
const getMe=async(userId:string,role:string)=>{
  // const decoded=vificationToken(token,config.jwt_access_srcret as string);
  // const {userId,role}=decoded;

  let result={} || null;
  if(role==='user')
  {
    result=await Student.findOne({id:userId});
  }
  else if(role==='faculty')
  {
    result=await Faculty.findOne({id:userId});
  }
  else{
    result=await Admin.findOne({id:userId});
  }



  return result


}

// ph-8
const changeStatus=async(id:string,payload:{status:string})=>{

  const result=await USER.findByIdAndUpdate(id,payload,{new:true,runValidators:true})

  return result;

}


export const UserService={
    createStudent,
    createFacultyIntoDb,
    createAdminIntoDB,
    getMe,
    changeStatus
}