import { z } from 'zod';

// Zod validation schema for TFacultyName
const TFacultyNameSchema = z.object({
  firstName: z.string().min(1).max(50),
  middleName: z.string().min(1).max(20).optional(),
  lastName: z.string().min(1).max(50),
});

// Zod validation schema for TFacultyGuirdian
const TFacultyGuirdianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Zod validation schema for TFaculty
const createTFacultySchema = z.object({
  body:z.object({
    faculty:z.object({
        name: TFacultyNameSchema,
        designation: z.string().min(1),
        email:z.string(),
        gender: z.enum(['Male', 'Female']),
        bloogGroup:z.enum(['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']),
        dateOfBirth: z.string().min(1),
        contractNo: z.string().min(1),
        emergencyContractNo: z.string().min(1),
        presentAddress: z.string().min(1),
        permanentAddress: z.string().min(1),
        guirdian: TFacultyGuirdianSchema,
        academicDepartment: z.string().min(1),
       profileImg: z.string().min(1)
    })
  })
});

//update Faculty Validations
// Zod validation schema for TFacultyName
const updateTFacultyNameSchema = z.object({
    firstName: z.string().min(1).max(50).optional(),
    middleName: z.string().min(1).max(20).optional(),
    lastName: z.string().min(1).max(50).optional(),
  }).optional();
  
  // Zod validation schema for TFacultyGuirdian
  const updateTFacultyGuirdianSchema = z.object({
    fatherName: z.string().min(1).optional(),
    fatherOccupation: z.string().min(1).optional(),
    fatherContactNo: z.string().min(1).optional(),
    motherName: z.string().min(1).optional(),
    motherOccupation: z.string().min(1).optional(),
    motherContactNo: z.string().min(1).optional(),
  }).optional();

const updateFacultyValidationSchema=z.object({
    body:z.object({
      faculty:z.object({
        
          name: updateTFacultyNameSchema,
          designation: z.string().min(1).optional(),
          gmail:z.string().optional(),
          gender: z.enum(['Male', 'Female']).optional(),
          bloogGroup:z.enum(['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']).optional(),
          dateOfBirth: z.string().min(1).optional(),
          contractNo: z.string().min(1).optional(),
          emergencyContractNo: z.string().min(1).optional(),
          presentAddress: z.string().min(1).optional(),
          permanentAddress: z.string().min(1).optional(),
          guirdian: updateTFacultyGuirdianSchema,
          academicDepartment: z.string().min(1).optional(),
         profileImg: z.string().min(1).optional()
      })
    })
  });


export const FacultyValidation={
    createTFacultySchema,
    updateFacultyValidationSchema
}
