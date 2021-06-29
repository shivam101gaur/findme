export interface User{
   _id?:number;
   _name:string;
   _password?:string;
   _vehicle_id?:string;
   _location_id?:string;
}

export class User implements User {

}
