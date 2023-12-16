import { z } from 'zod';

const createTOfferedCourseValidation= z.object({
   body:z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
    startTime: z.string().refine((time)=>{
        const regex=/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM|am|pm)$/
        return regex.test(time);

    },{
        message:'Invalide time formate,expected "hh:mm" in 24 hours format '
    }),
    endTime: z.string().refine((time)=>{
        const regex=/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM|am|pm)$/
        return regex.test(time);
    })
   }).refine((body)=>{
    const parsedStartTime = new Date(`1970-01-01 ${body.startTime.toUpperCase()}`);
    const parsedEndTime = new Date(`1970-01-01 ${body.endTime.toUpperCase()}`);
    return parsedEndTime>parsedStartTime

  },{
    message:'Start time should be before end Time'
  })
  })

 const updateTOfferedCourseValidation=z.object({
body:z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
    startTime: z.string().refine((time)=>{
        const regex=/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM|am|pm)$/
        return regex.test(time);

    },{
        message:'Invalide time formate,expected "hh:mm" in 24 hours format '
    }),
    endTime: z.string().refine((time)=>{
        const regex=/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM|am|pm)$/
        return regex.test(time);
    })

}).refine((body)=>{
    const parsedStartTime = new Date(`1970-01-01 ${body.startTime.toUpperCase()}`);
    const parsedEndTime = new Date(`1970-01-01 ${body.endTime.toUpperCase()}`);
    return parsedEndTime>parsedStartTime

  },{
    message:'Start time should be before end Time'
  })

 });

  export const OfferedCourseValidation={
    createTOfferedCourseValidation,
    updateTOfferedCourseValidation
  }