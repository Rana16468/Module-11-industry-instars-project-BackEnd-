import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { USER } from "./user.model";


const findLastStudentId= async()=>{


    const lastStudent=await USER.findOne({role:'user'},{_id:0,id:1}).sort({
        
createdAt:-1
    }).lean();
    return lastStudent?lastStudent?.id.substring(6):undefined;


}
export const generateUserId=async(payload:TAcademicSemester | null ):Promise<string>=>{



     // first Time 0000,then 0001

     const currentId=await findLastStudentId() || (0).toString()
      let incrementId=(Number(currentId) + 1).toString().padStart(4,'0');
     incrementId=`${payload?.year}${payload?.code}${incrementId}`
     return incrementId;

}

