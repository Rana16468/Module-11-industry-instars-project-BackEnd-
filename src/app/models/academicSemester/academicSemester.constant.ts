import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSystemCodeMapper, TMonth } from "./academicSemester.interface";

export const months:TMonth[]=['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
export const AcademicSemesterName:TAcademicSemesterName[]=['Autuman' , 'Summer' , 'Fall'];
export const AcademicSemesterCode:TAcademicSemesterCode[]=['01' , '02' , '03'];

export const academicSemesterCodeMapper:TAcademicSystemCodeMapper={
    Autuman:'01',
    Summer:'02',
    Fall:'03'
}
