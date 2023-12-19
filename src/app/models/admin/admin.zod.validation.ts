import { z } from "zod";

// Zod validation schema for TUserName
const TUserNameSchema = z.object({
  firstName: z.string().min(1).max(50),
  middleName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});



// Zod validation schema for TAdmin
const createTAdminSchema = z.object({
 body:z.object({
    password:z.string(),
    admin:z.object({
        id: z.string().optional(),
      user: z.string().optional(),
      name: TUserNameSchema,
      designation: z.string().min(1).optional(),
      gmail: z.string().email().optional(),
      gender: z.enum(["Male", "Female"]).optional(),
      bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      dateOfBirth: z.string().min(1).optional(),
      contractNo: z.string().min(1).optional(),
      emergencyContractNo: z.string().min(1).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      profileImg: z.string().min(1).optional(),
      isDeleted: z.boolean().optional(),
      })
 })
});


//update
const updateTUserNameSchema = z.object({
    firstName: z.string().min(1).max(50).optional(),
    middleName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
  }).optional();

// update
const updateTAdminSchema = z.object({
    body:z.object({
        admin:z.object({
            id: z.string().optional(),
          user: z.string().optional(),
          name:  updateTUserNameSchema,
          designation: z.string().min(1).optional(),
          gmail: z.string().email().optional(),
          gender: z.enum(["Male", "Female"]).optional(),
          bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
          dateOfBirth: z.string().min(1).optional(),
          contractNo: z.string().min(1).optional(),
          emergencyContractNo: z.string().min(1).optional(),
          presentAddress: z.string().min(1).optional(),
          permanentAddress: z.string().min(1).optional(),
          profileImg: z.string().min(1).optional(),
          isDeleted: z.boolean().optional(),
          })
    })
  });

export const AdminValidation={
    createTAdminSchema,
    updateTAdminSchema
}