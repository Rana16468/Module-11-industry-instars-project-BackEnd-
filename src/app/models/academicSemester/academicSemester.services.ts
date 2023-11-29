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

export const AcademicSemesterService={
    createAcademicSemesterIntoDb
}