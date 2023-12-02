import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../AppError/AppError";
import httpStatus from "http-status";



const TAcademicDepartmentSchema=new Schema<TAcademicDepartment>({
    name:{type:String,required:[true,'Academic Department is Required'],unique:true},
    academicFaculty:{type:Schema.Types.ObjectId,required:[true,'Academic Faculty is Required'],ref:'AcademicFaculty'}
},{
    timestamps:true
});

//middlerere
TAcademicDepartmentSchema.pre('save', async function(next){


    const isDepartmentExist=await AcademicDepartment.findOne({name:this.name});
    if(isDepartmentExist)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'Academic Department Already Exist in the Database','')
    }
    next();
});

// update 
TAcademicDepartmentSchema.pre('findOneAndUpdate',async function(next){

    const query=this.getQuery();
    const isExistsDepartment=await  AcademicDepartment.findOne(query);
    if(!isExistsDepartment)
    {

        throw new AppError(httpStatus.BAD_REQUEST,'Academic Department Not Exist in the Database','')
  
    }
    next();
})

export const AcademicDepartment=model<TAcademicDepartment>('AcademicDepartment',TAcademicDepartmentSchema);