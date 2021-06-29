import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  current_user = this.socket.fromEvent<any>('user');
 
  users = this.socket.fromEvent<User[]>('users');

  constructor(private socket:Socket) { }

  getUsers(){
    this.socket.emit('getAllUsers');  
  }

}
