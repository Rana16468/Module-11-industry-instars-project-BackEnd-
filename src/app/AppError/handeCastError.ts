import mongoose from "mongoose";
import { TErrorSources, TGenerateError } from "../Interface/error.interface";

const handeCastError=(err:mongoose.Error.CastError):TGenerateError=>{


    const errorSources:Array<TErrorSources>=[
        {path:err?.path,message:err?.message}
    ];
    const statusCode=404;
    return {
        statusCode,
        message:'InValide Id',
        errorSources
    }
}

export default handeCastError;