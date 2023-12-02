import { TAcademicFaculty } from "./academicFcaulty.interface";
import { AcademicFaculty } from "./acdemicFaculty.model";



const createAcademicFacultyIntoDb=async(payload:TAcademicFaculty)=>{

    
const buildInAcademicFaculty=new AcademicFaculty(payload);
const result=await buildInAcademicFaculty.save();
return result;

};

const getAllAcdemicFaculyIntoDb=async()=>{

    const result=await AcademicFaculty.find()
    return result;
}

const getSingleAcademicFacultyIntoDb=async(_id:string)=>{

    const result=await AcademicFaculty.findOne({_id});
    return result;

}

const updateAcademicFacultyIntoDb=async(_id:string,payload:TAcademicFaculty)=>{

    const result=await AcademicFaculty.findByIdAndUpdate({_id},payload,{upsert:true,runValidators:true});
    return result;
}

export const AcademicFacultyService={
    createAcademicFacultyIntoDb,
    getAllAcdemicFaculyIntoDb,
    getSingleAcademicFacultyIntoDb,
    updateAcademicFacultyIntoDb
}