import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TUserName } from "./student.interface";

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
      type: String,
      required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
      type: String,
      required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
      type: String,
      required: [true, 'Father Contact No is required'],
    },
    motherName: {
      type: String,
      required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
      type: String,
      required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
      type: String,
      required: [true, 'Mother Contact No is required'],
    },
  });
  
  const localGuradianSchema = new Schema<TLocalGuardian>({
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  });
  

const TFullNameSchema= new Schema<TUserName>({
    firstName:{type:'String',required:[true,'First Name is Required']},
    middleName:{type:'String',required:[false,'Middle Name is Required']},
    lastName:{type:'String',required:[true,'Last Name is Required']}
})
 const TStudentSchema= new Schema<TStudent>({

    // ref: refrancing the model 
    id:{type:String,required:[true,'ID is Required'],unique:true},
    user:{type:Schema.Types.ObjectId,required:[true,'User Id is Required'],unique:true,ref:'USER'},
    name:{type:TFullNameSchema,required:[true,'Name is Required']},
    gender:{type:String,enum:{
        values:[ 'male', 'female' , 'other'],
        message:'{VALUE} is Not Required'
    },required:[true,'Gender is Required']},
    dateOfBirth:{type:String,required:[false,'Date OF Birth is Required']},
    email:{type:String,required:[true,'Email is Required'],unique:true},
    contactNo:{type:String,required:[true,'Contract No is Required']},
    emergencyContactNo:{type:String,required:[true,'Emergency Contrcat No is Required']},
    bloogGroup:{type:String,
    enum:{values:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],message:'{VALUE} is Not Required'},
     required:[true,'Blood Group is Required']},
     permanentAddress:{type:String,required:[true,'Permanent Address is Required']},
     presentAddress:{type:String,required:[true,'Present Address is Required']},
     profileImg:{type:String,required:[false,'Profile Image is Required'],default:''},
     guardian:{type:guardianSchema,required:[true,'Guardian is Required']},
     localGuardian:{type:localGuradianSchema,required:[true,'Local Guardian is Required']},
     admissionSemester:{type:Schema.Types.ObjectId,
      ref:'AcademicSemester',
      required:[true,'Addmission Semester ID Is Required']},
      academicDepartment:{type:Schema.Types.ObjectId,
        required:[true,'Academic Department is Required'],
        ref:'AcademicDepartment'
      },
      academicFaculty:{type:Schema.Types.ObjectId,required:[true,'Academic Faculty is Required'],ref:""},

     isDeleted:{type:Boolean,required:[false,'Is Deleted is Optional But Important'],default:false}

 });



 // student model 
 export const Student=model<TStudent>('student',TStudentSchema);