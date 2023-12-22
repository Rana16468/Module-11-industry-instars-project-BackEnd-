import { z } from 'zod';

// Zod validation schema for TFullName
const TFullNameSchema = z.object({
  firstName: z.string().min(1).max(30),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

// Zod validation schema for TGuardian
const TGuardianSchema = z.object({
  fatherName: z.string({invalid_type_error:'Father Name error'}).min(1).max(50),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Zod validation schema for TLocalGuardian
const TLocalGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Zod validation schema for TStudent
const TStudentValidaionSchema = z.object({


  body:z.object({
  password:z.string().min(6).max(20).optional(),
  student:z.object({
  name: TFullNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  permanentAddress: z.string(),
  presentAddress: z.string(),
  //profileImg: z.string().url(),
  guardian: TGuardianSchema,
  localGuardian: TLocalGuardianSchema,
  admissionSemester:z.string(),
  academicDepartment:z.string(),

   })
  })
});

//update 

// Zod validation schema for TFullName
const updateTFullNameSchema = z.object({
  firstName: z.string().min(1).max(30).optional(),
  middleName: z.string().optional().optional(),
  lastName: z.string().min(1).optional(),
}).optional();

// Zod validation schema for TGuardian
const updateTGuardianSchema = z.object({
  fatherName: z.string({invalid_type_error:'Father Name error'}).min(1).max(50).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNo: z.string().min(1).optional(),
}).optional();

// Zod validation schema for TLocalGuardian
const updateTLocalGuardianSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
}).optional();

const UpdateStudentValidation=z.object({
  body:z.object({
  student:z.object({
  name: updateTFullNameSchema,
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  permanentAddress: z.string().optional(),
  presentAddress: z.string().optional(),
  profileImg: z.string().url().optional(),
  guardian:updateTGuardianSchema,
  localGuardian: updateTLocalGuardianSchema,
  admissionSemester:z.string().optional(),
  academicDepartment:z.string().optional(),

   })
  })
});

export const TSudentZodValidion={
    TStudentValidaionSchema ,
    UpdateStudentValidation

}