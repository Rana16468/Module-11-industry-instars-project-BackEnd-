import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFcaulty.interface";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";



const TAcademicFacultySchema=new Schema<TAcademicFaculty>({
    name:{type:String,required:[true,'Academic Faculty is Required'],unique:true}
},{
    timestamps:true
});

   
// mongoose middlewere
TAcademicFacultySchema.pre('save',async function(next){

    const isExistFaculty=await AcademicFaculty.findOne({name:this.name});
    if(isExistFaculty)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'Academic FacultyAlready Exist in the Database','')
    }
    next()
});

// madelwere update 
TAcademicFacultySchema.pre('findOneAndUpdate',async function(next){

    const query=this.getQuery();
    const isExistesAcademicFaculty=await AcademicFaculty.findOne(query);
    if(!isExistesAcademicFaculty)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'Academic Faculty Not Exist in the Database','')
    }

    next();
})

export const AcademicFaculty= model<TAcademicFaculty>('AcademicFaculty',TAcademicFacultySchema);