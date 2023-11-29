import { Model,Types } from "mongoose";

export type TMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';


export type TAcademicSemesterName='Autuman' | 'Summer' | 'Fall';
export type TAcademicSemesterCode='01' | '02' | '03';

export type  TAcademicSemester={
    name:TAcademicSemesterName;
    code: TAcademicSemesterCode;
    year:string,
    startMonth:TMonth;
    endMonth:TMonth;
}

export  type TAcademicSystemCodeMapper={
    [key:string]:string
   }

   export  interface AcademicSemesterModule extends Model<TAcademicSemester>{

    // eslint-disable-next-line no-unused-vars
    isFindByID(id:Types.ObjectId):Promise<TAcademicSemester | null> 
  }