export interface World {
    _id?: string;
    name: string;
    password: string;
    created_by: string;
    members: string[]
}


export class World implements World {
    constructor() { };
}


export interface Message {

    from:string;
    type:'text'|'image'|'video'|'pdf'

}

export class Message implements Message {
    constructor() { }
}