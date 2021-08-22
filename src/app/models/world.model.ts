export interface World {
    _id?: string;
    name: string;
    password: string;
    created_by: string;
    members: string[];
    chat: Message[]
}


export class World implements World {
    constructor() { };
}


export interface Message {

    _id?: string;
    from?: string;
    type?: 'text' | 'image' | 'video' | 'pdf';
    timeStamp?: string
    content?: string;

}

export class Message implements Message {
    constructor() { }
}