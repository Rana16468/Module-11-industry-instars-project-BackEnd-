import { z } from 'zod';

// Zod validation schema for TSemesterRegistration
const createTSemesterRegistrationValidationSchema = z.object({
  body:z.object({
  academicSemester: z.string(),
  status: z.enum(['UPCOMMING', 'ONGOING', 'ENDED']),
  startDate: z.string(),
  endDate: z.string(),
  minCredite: z.number(),
  maxCredite: z.number()
  })
});


const updateTSemesterRegistrationValidationSchema=z.object({
    body:z.object({
      academicSemester: z.string().optional(),
      status: z.enum(['UPCOMMING', 'ONGOING', 'ENDED']),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      minCredite: z.number().optional(),
      maxCredite: z.number().optional()
      })
})
export const SemesterRegistrationValidation={
    createTSemesterRegistrationValidationSchema,
    updateTSemesterRegistrationValidationSchema
}