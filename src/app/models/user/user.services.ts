import { TStudent } from './../student/student.interface';
import config from "../../config";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface"
import { USER } from "./user.model";


const createStudent= async(password:string,StudentData:TStudent)=>{


    const userData:Partial<TUser>={};
    userData.password=password || (config.default_password);
    userData.role='user';
    userData.id='193-16-463'

    const bulintingUser= new USER(userData);
    const newUser=await bulintingUser.save();
    if(Object.keys(newUser).length)
    {
        StudentData.id=newUser.id;
        StudentData.user=newUser._id;

        // create Student 
        const newStudent= new Student(StudentData);
        const result=await newStudent.save();
        return result;


    }





}

export const UserService={
    createStudent
}