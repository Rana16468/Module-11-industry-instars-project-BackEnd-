
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getAllFacultyIntoDb=async()=>{


    const result=await Faculty.find();
    return result;
}

const getSingleFacultyIntoDb=async(id:string)=>{

    const result=await Faculty.findOne({id});
    return result;
}

const updateFacultyIntoDb=async(id:string,payload:TFaculty)=>
{


    const{name,guirdian,...remaningStudentData}=payload;
    const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData};
    if(name && Object.keys(name))
    {

      for(const [key,value] of Object.entries(name))
      {


        modifiedUpdatedData[`name.${key}`]=value
      }
    }
   
    
    if(guirdian && Object.keys(guirdian))
    {
      for(const [key,value] of Object.entries(guirdian))
      {
        modifiedUpdatedData[`guardian.${key}`]=value
      }
    }

    //console.log(modifiedUpdatedData);
 

    const result=await Faculty.findOneAndUpdate({id},modifiedUpdatedData,{upsert:true});
    return result
}



export const FacultyService={
 
    getAllFacultyIntoDb,
    getSingleFacultyIntoDb,
    updateFacultyIntoDb
}