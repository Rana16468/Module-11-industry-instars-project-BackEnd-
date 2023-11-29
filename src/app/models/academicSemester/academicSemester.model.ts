
import { Schema, model } from "mongoose";
import { AcademicSemesterModule, TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";



const  TAcademicSemesterSchema= new  Schema<TAcademicSemester, AcademicSemesterModule >({

    name:{
        type:String,
        enum:{
            values: AcademicSemesterName,
            message:'{VALUE} is Not Required'
        },
        required:[true,'Semester Name is Required']
    },
    code:{
        type:String,
        enum:{
            values:AcademicSemesterCode,
            message:'{VALUE} is Required'
        },
        required:[true,'Semester Code is Required']
        
    },
    year:{type:String,required:[true,'Year is Required']},
    startMonth:{
        type:String,
        enum:{
            values:months,
            message:'{VALUE} is Not Required'
        },
        required:[true,'Start Month is Required']
    },
    endMonth:{
        type:String,
        enum:{
            values:months,
            message:'{VALUE} is Required'
        }
    }


});

// static method 
TAcademicSemesterSchema.statics.isFindByID= async function(admissionSemester:Schema.Types.ObjectId){

    const findByID=await AcademicSemester.findById(admissionSemester);
    return findByID


}

// middlewere 
TAcademicSemesterSchema.pre('save', async function(next){


    const IsExistsSemester=await AcademicSemester.findOne({year:this.year,name:this.name});
    if(IsExistsSemester)
    {
        throw new Error('This Year Academic Semester Already Exist');
    }
    
    
    next()
})

export const  AcademicSemester=model<TAcademicSemester,AcademicSemesterModule>('academicSemester',TAcademicSemesterSchema);

