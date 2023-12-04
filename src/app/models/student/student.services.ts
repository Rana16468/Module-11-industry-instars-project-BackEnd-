import mongoose from "mongoose";
import { Student } from "./student.model"
import { USER } from "../user/user.model";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";



//find All Student 
const findAllStudent=async(query:Record<string,unknown>)=>{

  let searchTerm='';
  if(query?.searchTerm)
  {
    searchTerm=query?.searchTerm as string
  }
  const fieldSeraching=['email','name.firstName','permanentAddress'];
  const queryObject={...query};
  const excludeField=['searchTerm','sort','limit','page','fields']
  excludeField.forEach((field)=>delete queryObject[field]);
  //sorting 
  let sort='-createdAt'
  if(query?.sort)
  {
   
    sort=query?.sort as string;
  }

  

  //limit 
let limit=0;
let page=0;
let skip=0;
if(query?.limit)
{
  limit=Number(query?.limit);
  
}
if(query?.page)
{
  page=Number(query?.page);
  skip=(page -1)*limit;
}

// field filtering 
let fields='-__v';
if(query?.fields)
{
  fields=(query?.fields as string).split(',').join(' ');

}
  
  



  
// format  in searchimh 
//{email:{$regex:searchTerm,$option:'i}}
// field searching --->
/*.populate({
        path:'academicDepartment',
        populate:'academicFaculty'
    }).populate('admissionSemester'); */
const searchQuery=Student.find({$or:fieldSeraching.map((field)=>({[field]:{$regex:searchTerm,$options:'i'}}))})
const filterQuery=searchQuery.find(queryObject).populate({
  path:'academicDepartment',
  populate:'academicFaculty'
}).populate('admissionSemester');
const sortQuery=filterQuery.sort(sort);
const paginationQuery=sortQuery.skip(skip);
const limitQuery=paginationQuery.limit(limit);
// field filtering
const fieldFiltering=await limitQuery.select(fields);
return  fieldFiltering
}

// find specific user
const findSpecifceStudent=async(_id:string)=>{

  

    const result=await Student.findOne({_id}).populate({
        path:'academicDepartment',
        populate:'academicFaculty'
    }).populate('admissionSemester');;
    return result;
}

// delete Student And User At A time 

const deleteStudentAndUserIntoDb= async(id:string)=>{

  

    const session=await mongoose.startSession();
    try{
      session.startTransaction();
      const deletedStudent=await Student.findOneAndUpdate({id},{isDeleted:true},{upsert:true,session});
     if(!deletedStudent)
     {
      throw new AppError(httpStatus.BAD_REQUEST,'Student Delete Request Failded','');
     }
  
     const deleteUser=await USER.findOneAndUpdate({id},{isDeleted:true},{upsert:true, session});
     if(!deleteUser)
     {
      throw new AppError(httpStatus.BAD_REQUEST,'USER Delete Request Failded','');
     }
     await session.commitTransaction();
     await session.endSession();
  
      return deleteStudentAndUserIntoDb;
    }
    catch(error){
      await session.abortTransaction();
      await session.endSession();
    }
}

const updateStudentIntoDb= async(id:string,payload:TStudent)=>{

    const{name,guardian,localGuardian,...remaningStudentData}=payload;

    const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData}
    
    if(name && Object.keys(name))
    {

      for(const [key,value] of Object.entries(name))
      {


        modifiedUpdatedData[`name.${key}`]=value
      }
    }
   
    
    if(guardian && Object.keys(guardian))
    {
      for(const [key,value] of Object.entries(guardian))
      {
        modifiedUpdatedData[`guardian.${key}`]=value
      }
    }
    
    if(localGuardian && Object.keys(localGuardian))
    {
      for(const [key,value] of Object.entries(localGuardian))
      {
        modifiedUpdatedData[`localGuardian.${key}`]=value
      }
    }

    const result=await Student.findOneAndUpdate({id},{...payload},{upsert:true});
    return result;


}

  



export const StudentService={
    findAllStudent,
    findSpecifceStudent,
    deleteStudentAndUserIntoDb,
    updateStudentIntoDb
    
}