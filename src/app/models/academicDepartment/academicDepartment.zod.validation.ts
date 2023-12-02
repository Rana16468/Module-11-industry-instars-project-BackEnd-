
import {z}  from 'zod';


const createAcademicDepartmentValidation=z.object({

    body:z.object({
        name:z.string({required_error:'Acadenic Department name is Required',
       invalid_type_error:'Invalide Academic Department Name '}).min(1).max(50),
       academicFaculty:z.string(),


    })
});

const updateAcademicDepartmentValidation=z.object({

    body:z.object({
        name:z.string({required_error:'Acadenic Department name is Required',
       invalid_type_error:'Invalide Academic Department Name '}).min(1).max(50).optional(),
       academicFaculty:z.string().optional(),


    })
});

export const AcademicDepartmentValidation={
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}