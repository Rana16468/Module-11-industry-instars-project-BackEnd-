import mongoose from "mongoose";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";




const createCourseIntoDb=async(payload:TCourse)=>{

    const buildInCourse=new Course(payload);
    const result= await buildInCourse.save();
     return result;
};
const getAllCourseIntoDb=async()=>{

    const result=await Course.find().populate('preRequisiteCourses.course');
    return result;
};

const getSingleCourseIntoDb=async(id:string)=>{

    const result=await Course.findById(id);
    return result;
}
const deleteCourseIntoDb=async(id:string)=>{
   

    const result=await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true,runValidators:true})
    return result;
}

// update Course Information 
const updateCourseFormDb=async(id:string,payload:Partial<TCourse>)=>{
    
    const {preRequisiteCourses,...remaningData}=payload;

    const session=await mongoose.startSession();
    try{
        session.startTransaction();
        const updateRemaningData=await Course.findByIdAndUpdate(id,remaningData,{new:true,runValidators:true,session});
   

        if(!updateRemaningData)
        {
            throw new AppError(httpStatus.BAD_REQUEST,'Failed Remaining Data Session','');
        }
        // delete Remaning Data
         if(preRequisiteCourses && preRequisiteCourses.length>0)
          {
            const deletePreRequesiteCourses=preRequisiteCourses?.filter((el)=>el.course && el.isDeleted).map((v)=>v.course);
             const deletePreRequesiteCourseIntoDb=await Course.findByIdAndUpdate(id,{

             $pull:{
              preRequisiteCourses:{course:{$in:deletePreRequesiteCourses}}}
           },{new:true,runValidators:true,session});

           if(!deletePreRequesiteCourseIntoDb)
           {
            throw new AppError(httpStatus.BAD_REQUEST,'Failed Delete Session','');
           }

             const addPreRequesiteCourses=preRequisiteCourses?.filter((el)=>el.course && !el.isDeleted);
             const addPreRequesiteCoursesIntoDb=await Course.findByIdAndUpdate(id,{
             $addToSet:{
                preRequisiteCourses:{$each:addPreRequesiteCourses}
            }
          },{
            new:true,runValidators:true,session
         });
         if(!addPreRequesiteCoursesIntoDb)
         {
            throw new AppError(httpStatus.BAD_REQUEST,'Failed Add Session','');
         }
    }
    await session.commitTransaction();
    await session.endSession();
       const result=await Course.findById(id).populate('preRequisiteCourses.course');
       return result
   


    }
    catch(error)
    {
        await session.abortTransaction();
        await session.endSession();

    }
}

const createCourseFacultyIntoDb=async(id:string,payload:Partial<TCourseFaculty>)=>{

   
      const result=await CourseFaculty.findByIdAndUpdate(id,{
        course:id,
        $addToSet:{facultys:{$each:payload}}
       
    }, {upsert:true,new:true,runValidators:true});

    return result;
}

const removeCourseFacultyIntoDb=async(id:string,payload:Partial<TCourseFaculty>)=>{

const result=await CourseFaculty.findByIdAndUpdate(id,{
    $pull:{
        facultys:{$in:payload}
    }
},{
    new:true,
    runValidators:true
});
return result;

}
export const CourseServices={
    createCourseIntoDb,
    getAllCourseIntoDb,
    getSingleCourseIntoDb,
    deleteCourseIntoDb,
    updateCourseFormDb,
    createCourseFacultyIntoDb,
    removeCourseFacultyIntoDb,
    
}