import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt  from 'bcrypt';
import config from "../../config";





const TUserSchema=new Schema<TUser,UserModel>({
    id:{type:String,required:[true,'User ID is Required'],unique:true},
    password:{type:String,required:[true,'Password is Required']},
    needPasswordChange:{type:Boolean,required:[true,'Need Password Change is Required'],default:true},
    passwordChangedAt:{type:Date,required:[false,'Password Chnage At is Required']},
    role:{
        type:String,
        enum:{
            values:['user', 'admin' ,'faculty'],
            message:'{VALUE} is Not Required'
        },
        required:[true,'Role is Required']
    },
    status:{
        type:String,
        enum:{
            values:['is-Progress' , 'Blocked'],
            message:'{VALUE} is not required'
        },
        required:[true,'Status is Required'],
        default:'is-Progress'
    },
    isDeleted:{type:Boolean,required:[true,'isDeleted is Required'],default:false}
},{
    timestamps:true  //createAt  and updateAt
     
});

TUserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
  });

// mongoose middlewere 
TUserSchema.pre('save',async function(next){

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user=this;
    user.password=await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));

    next();


});
//post save middleware hook
TUserSchema.post('save',function(doc,next){
    doc.password='';
    // after the save the password is empy becouse of security issues
    next();
  });


TUserSchema.statics.isUserExistByCustomId=async function(id:string)
{
    return await USER.findOne({id});
}
TUserSchema.statics.isPasswordMatched=async function(plainTextPassword:string,hashPassword:string)
{

    const password =await bcrypt.compare(plainTextPassword,hashPassword);
    return password;
}
TUserSchema.statics.isJWTIssuesBeforePasswordChange=async function(passwordChangeTimestamp:Date,jwtIssuesTime:number){
    const passwordChangeTime= new Date(passwordChangeTimestamp).getTime()/1000
    return passwordChangeTime>jwtIssuesTime

}

export const USER=model<TUser,UserModel>('user',TUserSchema);