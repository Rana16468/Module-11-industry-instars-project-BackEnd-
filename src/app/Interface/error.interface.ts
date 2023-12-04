export type TErrorSources={
    path:number | string,
    message:string;
  
  }

  export type  TGenerateError={
    statusCode:number;
    message:string;
    errorSources:Array<TErrorSources>

  }