
import QueryBuilder from "../../builder/QueryBuilder";
import { Admin } from "./admin.model";





const getAllAdminsFromDB = async (query: Record<string, unknown>) => {

    const searchingQuery= new QueryBuilder(Admin.find(),query);
    searchingQuery.filter().sort().pagination().fields();
    const result=await searchingQuery.modelQuery;
    return result;

  };
  
  const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
  };

  export const AdminService={
    getAllAdminsFromDB,
    getSingleAdminFromDB
  }