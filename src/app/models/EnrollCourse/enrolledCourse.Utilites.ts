export const calculateGradeEndPoints=(totalMarks:number)=>{

    


    let result:{
        grade:string;
        gradePoint:number;

    }={
        grade:'NA',
        gradePoint:0
    }
    if(totalMarks>=0 && totalMarks<=19)
    {
       
        result={
            grade:"F",
            gradePoint:0.00
        }
    }
    else if(totalMarks>=20 && totalMarks<=39)
    {
       

        result={
            grade:"D",
            gradePoint:2.00
        }
    }
    else if(totalMarks>=40 && totalMarks<=59)
    {
        result={
            grade:"C",
            gradePoint:3.00
        }
       
    }
    else if(totalMarks>=60 && totalMarks<=79)
    {
        result={
            grade:"A-",
            gradePoint:3.50
        }
    }
    else if(totalMarks>=80 && totalMarks<=100)
    {
        result={
            grade:"A",
            gradePoint:4.00
        }
    }
    else{
        result={
            grade:"F",
            gradePoint:0.00
        }
    }
   return result
}