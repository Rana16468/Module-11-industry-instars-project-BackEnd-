import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDb=async(payload:TAcademicDepartment)=>{


    const buildInAcademicDepartment=new AcademicDepartment(payload);
    const result=await buildInAcademicDepartment.save();
    return result;
}

const getAllAcademicDepartmentIntoDb=async()=>{
    const result=await AcademicDepartment.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartmentIntoDb=async(_id:string)=>{

    const result=await AcademicDepartment.findOne({_id}).populate('academicFaculty');
    return result;


}

const updateAcademicDepartmentIntoDb=async(_id:string,payload:TAcademicDepartment)=>{


    const result=await AcademicDepartment.findOneAndUpdate({_id},payload,{upsert:true});
    return result
}

export const AcademicDepartmentService={
    createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentIntoDb,
    getSingleAcademicDepartmentIntoDb,
    updateAcademicDepartmentIntoDb
}