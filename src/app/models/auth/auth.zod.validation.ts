import {z} from 'zod';


const loginValidationSchema=z.object({
    body:z.object({
        id:z.string({required_error:'Id is Required'}),
        password:z.string({required_error:'Password is Required'})
    })
});

const changePasswordValidationSchema=z.object({
    body:z.object({
        oldPassword:z.string({required_error:'Old Password is Required'}),
        newPassword:z.string()
    })
});
const requestTokenValidationSchema=z.object({
    cookies:z.object({
        refreshToken:z.string({required_error:'Refresh Token is Required'})

    })
});

const forgetPasswordValidationSchema=z.object({
    body:z.object({
        id:z.string({required_error:'Id is Required'})
    })
});

const resetPasswordValidationSchema=z.object({
    body:z.object({
        id:z.string({required_error:'Id is Required'}),
        newPassword:z.string({required_error:'New Password is Required'})
    })
})

export const AuthValidation={
    loginValidationSchema,
    changePasswordValidationSchema,
    requestTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
}