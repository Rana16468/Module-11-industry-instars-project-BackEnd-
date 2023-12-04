import mongoose from "mongoose";
import { TErrorSources, TGenerateError } from "../Interface/error.interface";


const handelValidationError=(err:mongoose.Error.ValidationError):TGenerateError=>{


    const errorSources=Object.values(err.errors).map((val:mongoose.Error.ValidatorError | mongoose.Error.CastError):TErrorSources=>{

        return{
            path:val.path,
            message:val.message
        }   
    });

    const statusCode=400;
    return{
        statusCode,
        message:'Validation Error',
        errorSources
    }


}

export default handelValidationError;