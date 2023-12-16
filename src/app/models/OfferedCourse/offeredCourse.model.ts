import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";




const TOfferedCourseSchema= new Schema<TOfferedCourse>({

    semesterRegistration:{
        type:Schema.Types.ObjectId,
        ref:'SemesterRegistration',
        trim:true,
        required:[true,'Semester Registration is Required']
    },
    academicSemester:{
        type:Schema.Types.ObjectId,
        ref:'AcademicSemester',
        trim:true,
        required:[false,'Academic Semester is Required']

    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty',
        trim:true,
        required:[true,'Academic Faculty is Required']
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:'AcademicDepartment',
        trim:true,
        required:[true,'Academic Department is Required']
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        trim:true,
        required:[true,'Course is Required']

    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:'Faculty',
        trim:true,
        required:[true,'Faculty is Required']


    },
    maxCapacity:{
        type:Number,
        required:[true,'Max Capacity is Required']
    },
    section:{
        type:Number,
        required:[true,'Section is Required']
    },
    days:[
        {type:String,enum:{
            values:['Sat' , 'Sun' , 'Mon' ,'Tue' ,'Wed' , 'Thu' , 'Fri'],
            message:'{VALUE} is not Required'
        }}
    ],
    startTime:{
        type:String,
        required:[true,'Strat Time is Required']
    },
    endTime:{
        type:String,
        required:[true,'End Time is Required']
    }


},{
    timestamps:true
});
export const OfferedCourse= model<TOfferedCourse>('OfferedCourse',TOfferedCourseSchema);