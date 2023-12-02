import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";



const createAcademicSemesterIntoDb=async(payload:TAcademicSemester)=>{

   if(academicSemesterCodeMapper[payload.name]!==payload.code)
   {
     throw new Error('Semester code And Name Mismatch');
   }
    const builtingAcademicSemester= new  AcademicSemester(payload);
    const result=await builtingAcademicSemester.save();
    return result;
}
const getAllAcademicSemesterIntoDb=async()=>{

  const result=await AcademicSemester.find();
  return result;
}

const getSingleAcademicSemesterIntoDb=async(_id:string)=>{

  const result=await AcademicSemester.findOne({_id});
  return result;
}

const updateAcademicSemesterIntoDb=async(_id:string,payload:TAcademicSemester)=>{

  const result=await AcademicSemester.findOneAndUpdate({_id},payload,{upsert:true});
  return result;
}



export const AcademicSemesterService={
    createAcademicSemesterIntoDb,
  getAllAcademicSemesterIntoDb,
  getSingleAcademicSemesterIntoDb,
  updateAcademicSemesterIntoDb
}