import { Types } from "mongoose"

export type TSemesterRegistration={
    academicSemester:Types.ObjectId;
    status: 'UPCOMMING' | 'ONGOING' | 'ENDED';
    startDate:Date;
    endDate:Date;
    maxCredite:number;
    minCredite:number;
}