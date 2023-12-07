import { z } from 'zod';

// Zod validation schema for TPreRequisiteCourses
const TPreRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
}).optional();

// Zod validation schema for TCourse
const createTCourseValidationSchema = z.object({
  body:z.object({
    title: z.string().min(1),
  prefix: z.string().min(1),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z.array(TPreRequisiteCoursesSchema).optional(),
  isDeleted: z.boolean().optional()
  })
});

// update validations
 const updateTCourseValidationSchema=createTCourseValidationSchema.partial();

 // validaion of Course Faculty
 const createTCourseFacultyValidationSchema = z.object({
    body:z.object({
        facultys: z.array(z.string().refine(data => data.trim() !== "", { message: 'Faculty is Required' }))
         
    })
    });

export const  CourseValidation={
    createTCourseValidationSchema,
    updateTCourseValidationSchema,
    createTCourseFacultyValidationSchema

    
}
