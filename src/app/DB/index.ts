import config from "../config";
import { USER_ROLE } from "../models/user/user.constant";
import { USER } from "../models/user/user.model";

const superAdmin={
    id:"0001",
    password:config.super_admin_password,
    email:"amsohelrana.me@gmail.com",
    needsPasswordChange:false,
    role: USER_ROLE.superAdmin,
    status:'is-Progress',
    isDeleted:false
}



const seedSuperAdmin=async()=>{
    

    const isSuperAdminExist=await USER.findOne({role:USER_ROLE.superAdmin});
   
   
    if(!isSuperAdminExist)
    {
       
      
        try{
            await USER.create(superAdmin);
        }
        catch(error)
        {
            console.log(error)
        }
    }



}

export default seedSuperAdmin;