

export type TUser={
    id:string;
    role:'user' | 'admin' | 'faculty';
    password:string;
    needPasswordChange:boolean;
    status:'is-Progress' | 'Blocked',
    isDeleted:boolean

}