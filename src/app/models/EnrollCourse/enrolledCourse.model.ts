import { model } from "mongoose";
import { TEnrolledCourse, TEnrolledCourseMarks } from "./enrolledCourse.interface";
import { Grade } from "./enrolledCourse.constant";
import { Schema } from "mongoose";

const TcourseMarksSchema = new Schema<TEnrolledCourseMarks>(
    {
      classTest1: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
      midTerm: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
      },
      classTest2: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
      finalTerm: {
        type: Number,
        min: 0,
        max: 50,
        default: 0,
      },
    },
    {
      _id: false,
    },
  );
const TEnrolledCourseSchema= new Schema<TEnrolledCourse>({

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
        ref:' AcademicFaculty',
        trim:true,
        required:[true,'Academic Faculty is Required']
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:'AcademicDepartment',
        trim:true,
        required:[true,' Academic Department is Required']
    },
    course:{
            type:Schema.Types.ObjectId,
            ref:'Course',
            trim:true,
            required:[true,' Course is Required']
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        trim:true,
        required:[true,' Course is Required']

    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:'Faculty',
        trim:true,
        required:[true,'Faculty is Required']
    },
    offeredCourse:{
        type:Schema.Types.ObjectId,
        ref:'OfferedCourse',
        trim:true,
        required:[true,'Offered  is RequiredCourse']
    },
    isEnrolled:{
        type:Boolean,
        required:[true,'Is Enrolled is Required'],
        default:false
    },
    courseMarks:{
        type:TcourseMarksSchema,
        default: {},
    },
    grade:{
        type:String,
        enum:{
            values:Grade,
            message:'{VALUE} is Not Required'
        },
        required:[true, 'Grades is Required'],
        default: 'NA',

    },
    gradePoints:{
      type:Number,
      min: 0,
      max: 4,
      default: 0,
      required:[false,'Grade Point is Required'],
      
    },
    isCompleted:{
      type:Boolean,
      required:[false,'IS Completed']
    }


},{
    timestamps:true
});

const EnrolledCourse = model<TEnrolledCourse>('EnrolledCourse', TEnrolledCourseSchema);
export default EnrolledCourse;