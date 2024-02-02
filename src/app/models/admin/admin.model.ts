import { Schema, model } from "mongoose";
import { TAdmin, TAdminUserName } from "./admin.interface";



const TUserNameSchema= new Schema<TAdminUserName>({
    firstName:{
        type:String,
        trim:true,
        required:[true,'First Name is Required']
    },
    middleName:{
        type:String,
        trim:true,
        required:[true,'Middle Name is Required']

    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'Last Name is Not Required']
    },

})


const TAdminSchema= new Schema<TAdmin>({

    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
      },
    name:{
        type:TUserNameSchema,
        trim:true,
        required:[true,'Name is Required']
    },
    designation:{
        type:String,
        trim:true,
        required:[true,'Designation is Required']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Email is Required']
    },
    gender:{
        type:String,
        enum:{
            values:['Male' , 'Female'],
            message:'{VALUE} is Not Required'
        },
        trim:true,
        required:[true,'Gender is Required']
    },
    bloogGroup:{
        type:String,
        enum:{
            values:['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']
        },
        trim:true,
        required:[true,'Blood Group is Required']

    },
    dateOfBirth:{
        type:String,
        trim:true,
        required:[true,'Date Of Birth is Required']
    },
    contractNo:{
        type:String,
        trim:true,
        required:[true,'Contract No is Required']
    },
    emergencyContractNo:{
        type:String,
        trim:true,
        required:[true,'Emergency Contract is Required']
    },
    presentAddress:{
        type:String,
        trim:true,
        required:[true,'Present Address is Required']
    },
    permanentAddress:{
        type:String,
        trim:true,
        required:[true,'Permanent Address is Required']
    },
    profileImg:{
        type:String,
        required:[false,'Profile Image is Required'],
        default:''
    },
    isDeleted:{
        type:Boolean,
        required:[false,'Is Deleted Not  is Required'],
        default:false
    }

     
},{
    timestamps:true
});

export const Admin=model<TAdmin>('Admin',TAdminSchema);