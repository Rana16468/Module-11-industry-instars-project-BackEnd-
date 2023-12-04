import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../Interface/error.interface";
import handelZodError from "../AppError/handelZodError";
import handelValidationError from "../AppError/handelValidationError";
import handeCastError from "../AppError/handeCastError";
import config from "../config";
import handelDuplicateError from "../AppError/handelDuplicateError";
import AppError from "../AppError/AppError";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandelar:ErrorRequestHandler=(err,req,res,next)=>{




let statusCode=500;
let message=err?.message;
let errorSources:Array<TErrorSources>=[
  {path:'',message:''}

]

if(err instanceof ZodError)
{

  const simpleError=handelZodError(err);
  statusCode=simpleError.statusCode;
  message=simpleError.message;
  errorSources=simpleError.errorSources
}
else if(err?.name==='ValidationError')
{
  const simpleError=handelValidationError(err);
  statusCode=simpleError.statusCode;
  message=simpleError.message;
  errorSources=simpleError.errorSources
}

else if(err?.name==='CastError')
{
  const simpleError=handeCastError(err);
  statusCode=simpleError.statusCode;
  message=simpleError.message;
  errorSources=simpleError.errorSources
}
else if(err?.code===11000)
{
  const simpleError=handelDuplicateError(err);
  statusCode=simpleError.statusCode;
  message=simpleError.message;
  errorSources=simpleError.errorSources
}
else if(err instanceof AppError)
{
  statusCode=err?.statusCode;
  message=err?.message;
  errorSources=[
    {path:'',message:err?.message}
  ];
}

else if(err instanceof Error)
{
  
  message=err?.message;
  errorSources=[
    {path:'',message:err?.message}
  ];
}

    return res.status(statusCode).json({success:false,message,errorSources,stack:config?.NODE_ENV==='development'?err?.stack:null});
    next();
  }

  export default globalErrorHandelar