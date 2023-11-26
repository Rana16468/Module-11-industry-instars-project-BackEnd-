import { NextFunction, Request, Response } from "express";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandelar=(err:any,req:Request,res:Response,next:NextFunction)=>{

    return res.status(500).json({success:false,message:'some thing went wrong',err});
    next();
  }

  export default globalErrorHandelar