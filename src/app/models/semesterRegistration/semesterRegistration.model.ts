import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";



const TSemesterRegistartionSchema= new Schema<TSemesterRegistration>({

    academicSemester:{
        type:Schema.Types.ObjectId,
        ref:'AcademicSemester',
        unique:true,
        trim:true,
        required:[true,'Academic Semester is Required']
    },
    status:{
        type:String,
        enum:{
            values:['UPCOMMING' , 'ONGOING' , 'ENDED'],
            message:'{VALUE} is Not Required'
        },
        required:[true,'Status is Required'],
        default:'UPCOMMING'
    },
    startDate:{
        type:Date,
        required:[true,'Starting Date is Required']
    },
    endDate:{
        type:Date,
        required:[true,'Ending Date is Required']
    },
    maxCredite:{
        type:Number,
        required:[true,'Max Credite is Required'],
        default:15
    },
    minCredite:{
        type:Number,
        required:[true,'Min Credite is Required'],
        default:3
    }
});

export const SemesterRegistration=model<TSemesterRegistration>('SemesterRegistration',TSemesterRegistartionSchema);