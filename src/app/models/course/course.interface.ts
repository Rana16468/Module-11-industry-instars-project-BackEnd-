import { Types } from "mongoose";


export type TPreRequisiteCourses={
    course:Types.ObjectId;
    isDeleted:boolean;
}
export type TCourse={


    title:string;
    prefix:string;
    code:number;
    credits:number;
    preRequisiteCourses:Array<TPreRequisiteCourses>;
    isDeleted:boolean;
}

export type TCourseFaculty={

    course:Types.ObjectId;
    facultys:Array<Types.ObjectId>

}