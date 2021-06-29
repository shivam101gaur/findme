export interface Room {
    _id?:number;
    _name:string;
    _status?:'active'|'inactive';
    _creator?:string;
    _password?:string;
}


export class Room  implements Room{
}
