import { z } from "zod";

const TUserValidationSchema = z.object({
  password: z.string({invalid_type_error:'Password must be String'}).min(1).max(20).optional(),
 
  
});


const chnageStatusValidationSchema=z.object({

    body:z.object({
      status:z.enum(['in-progress' , 'blocked'])
    })
  })

  export const UserValidation={
    TUserValidationSchema,
    chnageStatusValidationSchema
}