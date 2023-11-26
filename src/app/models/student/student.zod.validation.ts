import { z } from 'zod';

// Zod validation schema for TFullName
const TFullNameSchema = z.object({
  firstName: z.string().min(1).max(30),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

// Zod validation schema for TGuardian
const TGuardianSchema = z.object({
  fatherName: z.string({invalid_type_error:'sohel Rana '}).min(1).max(50),
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
  id: z.string(),
  name: TFullNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  permanentAddress: z.string(),
  presentAddress: z.string(),
  profileImg: z.string().url(),
  guardian: TGuardianSchema,
  localGuardian: TLocalGuardianSchema,
  isDeleted: z.boolean().optional(),
});

export const TSudentZodValidion={
    TStudentValidaionSchema 

}