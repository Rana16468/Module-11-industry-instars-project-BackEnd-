import { TStudent } from './../student/student.interface';
import config from "../../config";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface"
import { USER } from "./user.model";
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateUserId } from './user.utilts';




const createStudent= async(password:string,payload:TStudent)=>{

    

   /// const admissionSemester=await AcademicSemester.findById(payload.admissionSemester);
 
     const admissionSemester=await AcademicSemester.isFindByID(payload.admissionSemester)

    const userData:Partial<TUser>={};
    userData.password=password || (config.default_password);
    userData.role='user';

    //generate User ID 

    userData.id= await generateUserId(admissionSemester);



    const bulintingUser= new USER(userData);
    const newUser=await bulintingUser.save();
    if(Object.keys(newUser).length)
    {
      
        payload.user=newUser._id;

        // create Student 
        const newStudent= new Student(payload);
        const result=await newStudent.save();
        return result;


    }





}

export const UserService={
    createStudent
}