
import { TSchedule } from "./offeredCourse.interface"



export const hasTimeConflict=( assignedSchedules:TSchedule[],newSchedules:TSchedule)=>{


    //10.30-12.30
    //11.30-01.30
  for( const schedule of assignedSchedules)
  {
    const existingStratingTime= new Date(`1970-01-01 ${schedule.startTime}`);
        const existingEndingTime=new Date(`1970-01-01 ${schedule.endTime}`);
        const  newStartingTime= new  Date(`1970-01-01 ${newSchedules.startTime}`);
        const  newEndingTime= new  Date(`1970-01-01 ${newSchedules.endTime}`);
    
    
        if(newStartingTime< existingEndingTime &&  newEndingTime> existingStratingTime)
        {
            return true
        }
  }
    return false



}