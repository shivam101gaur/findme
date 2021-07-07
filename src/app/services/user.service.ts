import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


 
  users = this.socket.fromEvent<User[]>('users');

  constructor(private socket:Socket,private http:HttpClient) { }

 

}


