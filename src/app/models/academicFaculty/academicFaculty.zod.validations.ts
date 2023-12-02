import {z} from 'zod';

const createAcademicFacultyValidauion=z.object({

    body:z.object({
        name:z.string({ required_error:'Academic Faculty is Required',
        invalid_type_error:'Academic Faculty Nameing error'}).min(1).max(30)
    })
});

const updateAcademicFaculyValidation=z.object({
    body:z.object({
        name:z.string({ required_error:'Academic Faculty is Required',
        invalid_type_error:'Academic Faculty Nameing error'}).min(1).max(30)
    }).optional()
})

export const AcademicFacultyValidation={
    createAcademicFacultyValidauion,
    updateAcademicFaculyValidation
}