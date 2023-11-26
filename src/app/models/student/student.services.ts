import { Student } from "./student.model"



//find All Student 
const findAllStudent=async()=>{


    const result=await Student.aggregate().project({user:0});
    return result;

}

// find specific user
const findSpecifceStudent=async(id:string)=>{

if(await Student.isUserExists(id))
{
    const result=await Student.aggregate([{$match:{id}}]).project({process:0});
    return result;
}
else{
    throw new Error('Student  Not Exist in the Database');
}
  

}

export const StudentService={
    findAllStudent,
    findSpecifceStudent
    
}