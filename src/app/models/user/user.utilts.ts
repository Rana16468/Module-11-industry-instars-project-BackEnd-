import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { USER } from "./user.model";


const findLastStudentId= async()=>{


    const lastStudent=await USER.findOne({role:'user'},{_id:0,id:1}).sort({
        
createdAt:-1
    }).lean();
    return lastStudent?lastStudent?.id:undefined;


}
export const generateUserId=async(payload:TAcademicSemester | null )=>{

     // first Time 0000,then 0001

  let currentId=(0).toString(); //0000
     const lastStudentId=await findLastStudentId();
     const lastStudentSemesterCode=lastStudentId?.substring(4,6);  //semester id : 01 | 02 | 03
     const lastStudentYear=lastStudentId?.substring(0,4);  // 2030
   
     if(lastStudentId && payload?.code===lastStudentSemesterCode && payload?.year===lastStudentYear)
     {
       
        currentId=lastStudentId.substring(6); //203001/203002/203003
      
     }

      let incrementId=(Number(currentId) + 1).toString().padStart(4,'0');
     incrementId=`${payload?.year}${payload?.code}${incrementId}`
     return incrementId;

}

