import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenerateError } from "../Interface/error.interface";



const handelZodError=(err:ZodError):TGenerateError=>{


    const errorSources=err?.issues?.map((issu:ZodIssue):TErrorSources=>{
        return {
            path:issu?.path[issu?.path?.length -1],
            message:issu?.message
        }
    });
    const statusCode=400
    return {
        statusCode,message:'Zod Validation Error',errorSources
    }



}

export default handelZodError;