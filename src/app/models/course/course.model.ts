import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";


const TPreRequisiteCoursesSchema=new Schema<TPreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
        trim:true,
        unique:false,
        ref:'Course',
        required:[false,'Course is not  Required']
    },
    isDeleted:{
        type:Boolean,
        required:[false,'IS Deleted is not Requires'],
        default:false
    }

})

const TCourseSchema= new Schema<TCourse>({
    title:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Title is Requires']
    },
    prefix:{
        type:String,
        trim:true,
        required:[true,'Prefix isRequired']
    },
    code:{
        type:Number,
        trim:true,
        required:[true,'Number is Required']
    },
    credits:{
        type:Number,
        trim:true,
        required:[true,'Credits is Required']
    },
    preRequisiteCourses:{
        type:[TPreRequisiteCoursesSchema],
        required:[false,'Pre RequisiteCourses is not Required']
    },

    isDeleted:{
        type:Boolean,
        required:[false,'IS Deleted is not Requires'],
        default:false
    }
});

// course Faculty

const TCourseFacultySchema= new Schema<TCourseFaculty>({
    course:{type:Schema.Types.ObjectId,unique:true,trim:true,required:[true,'Course Id is Required']},
    facultys:{type:[
        {type:Schema.Types.ObjectId,trim:true,required:[true,'Faculty Id is Required']}
    ]}

});
export const CourseFaculty=model<TCourseFaculty>('CourseFaculty',TCourseFacultySchema);
export const Course=model<TCourse>('Course',TCourseSchema);