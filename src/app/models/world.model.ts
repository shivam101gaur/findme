export interface World {
    _id?: string;
    name: string;
    password: string;
    created_by: string;
    members: string[]
}


export class World implements World {
    constructor(){};
}
